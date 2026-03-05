import { motion } from "framer-motion";
import { ClipboardList, Palette, HardHat, Sparkles } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Consultation", desc: "We visit your space, discuss your vision, and take precise measurements." },
  { icon: Palette, title: "Selection", desc: "Browse our showroom or samples to find the perfect flooring for your style." },
  { icon: HardHat, title: "Installation", desc: "Our expert team handles every detail for a seamless, on-time installation." },
  { icon: Sparkles, title: "Final Walk-through", desc: "We inspect every inch together to make sure you're 100% satisfied." },
];

const ProcessSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <p className="text-accent text-sm tracking-[0.2em] uppercase font-semibold mb-2">How It Works</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Our Process</h2>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-8 relative">
        {/* Connector line */}
        <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-border" />

        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center relative"
          >
            <div className="w-20 h-20 mx-auto bg-accent/10 text-accent rounded-full flex items-center justify-center mb-5 relative z-10 border-4 border-background">
              <s.icon className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-accent mb-2 block">Step {i + 1}</span>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
