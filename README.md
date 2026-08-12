<div align="center">
  <img src="https://images.unsplash.com/photo-1555849898-f29b053c52a0?auto=format&fit=crop&q=80&w=1200" alt="Vote India Secure Banner" width="100%" />
  
  <br />
  <br />

  # 🗳️ Vote India Secure

  **Enterprise E-Voting Platform for Indian Listed Companies**

  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-technology-stack">Tech Stack</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-deployment">Deployment</a> •
    <a href="#-license">License</a>
  </p>
</div>

---

**Vote India Secure** is a state-of-the-art, secure, and regulatory-compliant e-voting platform tailored for Indian companies. Designed to facilitate digital corporate governance, it implements blockchain-inspired concepts (such as cryptographic vote hashing and verification) and adheres strictly to the **Companies Act, 2013 (Section 108)** and SEBI guidelines regarding remote e-voting.

---

## ✨ Key Features

### 🏢 Corporate & Marketing Frontend
* **Dynamic Homepage:** Modern, responsive landing page with trust signals, feature highlights, and animated interfaces (Framer Motion).
* **Enterprise Services:** Detailed breakdown of e-voting solutions tailored for shareholders, RTAs, and CFOs.
* **SEBI Compliance Center:** Dedicated documentation for regulatory adherence and data security standards.
* **Lead Generation:** Integrated Contact form mapped directly to Supabase Edge Functions.

### 💼 Company & Administrative Portal (CompanyLogin)
* **Verified Registration:** Automated CIN (Corporate Identification Number) and PAN validations for registering companies.
* **Voting Event Management:** Create and schedule voting sessions with custom record dates, start/end timelines, and multiple resolutions.
* **Document Management:** Upload PDFs, agendas, and detail specific voting choices.
* **Scrutinizer Analytics:** Real-time Recharts dashboards showing voting progress, participation rates, and aggregate results (For, Against, Abstain).
* **Compliance Exports:** Export complete, verifiable reports for corporate filing and audit logs via `jspdf` and Excel formats.

### 👥 Shareholder Portal (ShareholderLogin)
* **Secure Access & 2FA:** Direct login utilizing unique, system-generated credentials and OTP verification via email/SMS.
* **Interactive Ballot Card:** Clear, responsive interface to cast votes on active resolutions securely.
* **Personalized Analytics:** View personalized shareholding stakes, voting history, and distribution breakdowns in beautiful visual charts.

### 🧠 Intelligent AI Add-ons (Powered by Groq & Gemini)
* **Document Summarizer:** Instantly summarizes long corporate resolutions into easy-to-read bullet points using Llama-3.3-70b-versatile.
* **Sentiment Analysis:** Analyzes shareholder feedback to group responses by emotional tone (Positive, Neutral, Negative).
* **Vote Assistant:** A floating AI chatbot helper that answers shareholder queries on timelines and procedures via natural language or speech recognition.

### 🌐 Translation & Localization
* Fully internationalized interface using **i18next** supporting both **English** and regional Indian languages (Hindi, Tamil, etc.) for diverse shareholder demographics.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite |
| **Styling & UI** | Tailwind CSS, Shadcn UI (Radix Primitives), Framer Motion |
| **Icons & Assets** | Lucide React, React Three Fiber (3D Elements) |
| **Charts & Visualizations** | Recharts |
| **Database & Auth** | Supabase (PostgreSQL, Row-Level Security, Real-Time) |
| **Edge Functions** | Deno (Supabase Edge Functions) for AI ops & Mailers |
| **AI Models** | Groq Cloud (Llama 3), Google Gemini SDK |
| **Email Service** | Resend API |
| **Localization** | i18next, react-i18next |

---

## 📁 Project Directory Structure

```text
vote-india-secure/
├── .env                    # Environment variables (Supabase, Groq, Resend keys)
├── package.json            # Project dependencies & scripts
├── tailwind.config.ts      # Tailwind configuration and design tokens
├── tsconfig.json           # TypeScript strict compilation config
├── supabase/               # Backend Database and Serverless APIs
│   ├── functions/          # Deno-based Supabase Edge Functions
│   │   ├── ai-ops/                 # Groq sentiment, chat, and summarization
│   │   ├── send-welcome-email/     # Resend welcome mailer
│   │   ├── send-email-otp/         # 2FA OTP verification
│   │   └── ...                     
│   └── migrations/         # PostgreSQL schema version histories
└── src/                    # React Source Code
    ├── App.tsx             # Route registry and lazy-loaded Pages
    ├── components/         # Reusable UI Components
    │   ├── ui/             # Core shadcn design primitives (buttons, inputs)
    │   ├── layout/         # Header, Footer, and Navbar wrappers
    │   ├── auth/           # Login guards and role validators
    │   ├── ai/             # VoteAssistant chatbot and AI summarizing widgets
    │   └── company/        # Scrutinizer graphs and admin dashboard tables
    ├── hooks/              # Custom React hooks
    ├── i18n/               # Localization files (en.json, hi.json)
    ├── integrations/       # Supabase client instantiation
    ├── pages/              # Routed Views (Index, About, Services, Contact, etc.)
    └── types/              # TypeScript typings and interfaces
```

---

## 🛢️ Database Architecture

The PostgreSQL database is heavily secured by **Row Level Security (RLS)** policies to ensure data isolation between different companies and shareholders.

1. **`companies`**: Holds company names, CIN numbers, authorized capital, and compliance contacts.
2. **`company_admins`**: RBAC accounts for company secretaries and admins.
3. **`shareholders`**: Stores demat/folio details, PAN, and the number of shares held per company.
4. **`voting_sessions`**: Session data representing a meeting (record date, timeline).
5. **`resolutions`**: Individual agenda items to be voted on.
6. **`votes`**: Voter choices cryptographically hashed (`vote_hash`) to ensure anonymity and auditability.
7. **`shareholder_feedback`**: Stores feedback content, themes, and calculated sentiment ratings.

---

## 🚀 Local Development Setup

### Prerequisites
* Node.js (v18+)
* npm (v9+)
* A Supabase project (for database and auth)

### 1. Clone and Install
```bash
git clone https://github.com/Arunkumar30102006/VOTING-2026.git
cd vote-india-secure-main
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_URL=https://your_project_id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_RESEND_API_KEY=your_resend_api_key
GROQ_API_KEY=your_groq_api_key
```

### 3. Run the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

---

## 🌍 Production Deployment (Vercel)

The frontend is optimized for seamless deployment on Vercel.

1. Create a [Vercel](https://vercel.com/) account and connect your GitHub.
2. Click **Add New...** -> **Project**.
3. Select your `VOTING-2026` repository.
4. Framework Preset will auto-detect as **Vite**.
5. Add all your `VITE_` prefixed variables from your `.env` to the **Environment Variables** section.
6. Click **Deploy**.

For the backend, ensure your Supabase Edge Functions are deployed:
```bash
supabase functions deploy
```
*(Ensure you have set the secrets via `supabase secrets set` in the Supabase Dashboard as well).*

---

## 📄 License
This project is proprietary and confidential.  
All rights reserved © 2026 Vote India Secure.
