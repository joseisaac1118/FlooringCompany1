import { motion } from "framer-motion";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "2,500+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Flooring Options" },
];

const StatsSection = () => (
  <section className="py-16 bg-primary">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-1">{s.value}</p>
            <p className="text-primary-foreground/70 text-sm font-medium">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
