import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero-flooring.jpg";

const HeroSection = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <img src={heroImg} alt="Luxury hardwood flooring in modern living room" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-dark-wood/70" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-warm-gold font-body text-sm tracking-[0.3em] uppercase mb-4"
        >
          Premium Flooring Solutions
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-warm-cream leading-tight mb-6"
        >
          Transform Your Space From the Ground Up
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-light-wood text-lg md:text-xl mb-10 max-w-xl mx-auto"
        >
          Expert installation, refinishing, and repair — delivering craftsmanship that lasts a lifetime.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={() => scrollTo("#quote")} className="bg-accent text-accent-foreground px-8 py-3 rounded-md font-semibold text-base hover:opacity-90 transition-opacity">
            Get a Free Quote
          </button>
          <button onClick={() => scrollTo("#portfolio")} className="border border-light-wood text-warm-cream px-8 py-3 rounded-md font-semibold text-base hover:bg-warm-cream/10 transition-colors">
            View Our Work
          </button>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("#services")}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-warm-cream/60"
        aria-label="Scroll down"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
};

export default HeroSection;
