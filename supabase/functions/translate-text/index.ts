import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { text, targetLanguage, resolutionId } = await req.json();

        if (!text || !targetLanguage) {
            return new Response(JSON.stringify({ error: "Missing required parameters" }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!; // Using anon key for client-side calls
        const supabase = createClient(supabaseUrl, supabaseKey);

        // 1. Check Database Cache
        if (resolutionId) {
            console.log(`Checking cache for resolution ${resolutionId} in ${targetLanguage}`);
            const { data: cachedTranslation, error: cacheError } = await supabase
                .from('resolution_translations')
                .select('translated_title, translated_description')
                .eq('resolution_id', resolutionId)
                .eq('language_code', targetLanguage)
                .single();

            if (!cacheError && cachedTranslation) {
                console.log("Returning cached translation");
                return new Response(JSON.stringify({
                    translatedTitle: cachedTranslation.translated_title,
                    translatedDescription: cachedTranslation.translated_description,
                    source: 'cache'
                }), {
                    status: 200,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }
        }

        console.log(`No cache found. Calling Translation API for ${targetLanguage}...`);

        // 2. Call Translation API (Using Gemini as we don't have GCP keys in env by default, but mimicking the structure)
        const apiKey = Deno.env.get('GEMINI_API_KEY');
        if (!apiKey) {
            throw new Error("Missing Translation API Key");
        }

        // We are assuming the text input might be a JSON object with title and description
        let titleToTranslate = "";
        let descToTranslate = "";

        try {
            const parsed = JSON.parse(text);
            titleToTranslate = parsed.title || "";
            descToTranslate = parsed.description || "";
        } catch (e) {
            descToTranslate = text; // Fallback if plain string
        }

        const prompt = `Translate the following corporate resolution text from English to ${targetLanguage}. Return ONLY a strict JSON object with two keys: "translatedTitle" and "translatedDescription". Do not include markdown formatting or extra text.

Original Title: ${titleToTranslate}
Original Description: ${descToTranslate}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to call translation API: ${response.statusText}`);
        }

        const data = await response.json();
        const geminiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!geminiResponseText) {
            throw new Error("Invalid response from Translation API");
        }

        console.log("Raw Gemini Response:", geminiResponseText);

        // Clean up markdown block if present
        const cleanedJsonStr = geminiResponseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        let translatedResult;
        try {
            translatedResult = JSON.parse(cleanedJsonStr);
        } catch (e) {
            console.error("Failed to parse AI response as JSON:", cleanedJsonStr);
            throw new Error("Translation API did not return valid JSON");
        }

        // 3. Store in Database Cache
        if (resolutionId) {
            console.log("Caching new translation in database...");
            const { error: insertError } = await supabase
                .from('resolution_translations')
                .insert({
                    resolution_id: resolutionId,
                    language_code: targetLanguage,
                    translated_title: translatedResult.translatedTitle,
                    translated_description: translatedResult.translatedDescription,
                });

            if (insertError) {
                console.error("Failed to cache translation:", insertError);
                // We still return the translation even if caching fails
            }
        }

        return new Response(JSON.stringify({
            translatedTitle: translatedResult.translatedTitle,
            translatedDescription: translatedResult.translatedDescription,
            source: 'api'
        }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Translation Edge Function Error:", error);
        return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Internal Server Error" }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
