import { Star, Quote } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Company Secretary",
    company: "Tata Consultancy Services",
    content: "Vote India Secure has completely streamlined our AGM e-voting process. The automated scrutinizer reports and SEBI-compliant audit trails saved us weeks of manual work. The platform's intuitive interface meant even our senior shareholders had zero issues casting their votes.",
    rating: 5,
  },
  {
    name: "Rajesh Iyer",
    role: "Chief Financial Officer",
    company: "Infosys Limited",
    content: "As CFO, data security is non-negotiable. The AES-256 encryption and immutable ledger gave our board complete confidence in the integrity of every vote. We processed over 50,000 shareholder votes in our last AGM without a single technical issue.",
    rating: 5,
  },
  {
    name: "Ananya Krishnan",
    role: "Compliance Head",
    company: "HDFC Securities",
    content: "Staying ahead of SEBI regulations is critical in our industry. This platform doesn't just meet Regulation 44 requirements — it exceeds them. The real-time compliance dashboard and automated reporting have made our governance framework genuinely robust.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-[#020817]/60 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 shadow-sm">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Trusted by Industry Leaders</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-400">
            Hear from Company Secretaries, CFOs, and Compliance Heads who have transformed their corporate governance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0d1b2a]/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative hover:border-primary/30 transition-colors group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-primary/10 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed mb-8 relative z-10 italic text-sm">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-white font-bold text-lg border border-primary/30">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                  <p className="text-xs text-primary/80 font-medium">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
