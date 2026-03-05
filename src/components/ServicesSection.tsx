import { motion } from "framer-motion";
import { Hammer, RefreshCw, Paintbrush, Shield, Layers, Ruler } from "lucide-react";

const services = [
  { icon: Hammer, title: "Installation", desc: "Expert installation of hardwood, laminate, vinyl, tile, and carpet for residential and commercial projects." },
  { icon: RefreshCw, title: "Refinishing", desc: "Restore the beauty of your existing floors with professional sanding, staining, and sealing." },
  { icon: Paintbrush, title: "Custom Staining", desc: "Choose from hundreds of stain colors to match your vision and décor perfectly." },
  { icon: Shield, title: "Floor Protection", desc: "High-grade sealants and coatings to protect your investment for decades to come." },
  { icon: Layers, title: "Subfloor Prep", desc: "Proper subfloor leveling and moisture barriers for a flawless, long-lasting installation." },
  { icon: Ruler, title: "Free Estimates", desc: "Accurate on-site measurements and transparent pricing — no hidden fees, ever." },
];

const ServicesSection = () => (
  <section id="services" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <p className="text-accent text-sm tracking-[0.2em] uppercase font-semibold mb-2">What We Do</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Our Services</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group bg-card rounded-lg p-8 border border-border hover:border-accent/40 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <s.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
