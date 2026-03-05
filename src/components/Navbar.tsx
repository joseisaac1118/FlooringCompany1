import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    const wasOpen = open;
    setOpen(false);
    const doScroll = () => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    };
    if (wasOpen) {
      setTimeout(doScroll, 350);
    } else {
      doScroll();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#home" onClick={() => scrollTo("#home")} className="font-display text-xl font-bold text-foreground tracking-wide">
          Prestige<span className="text-accent">Floors</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo("#quote")} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity">
            <Phone className="w-4 h-4" /> Get a Quote
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden overflow-hidden bg-background border-b border-border">
            <div className="flex flex-col gap-2 p-4">
              {navLinks.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="text-left py-2 text-foreground font-medium">
                  {l.label}
                </button>
              ))}
              <button onClick={() => scrollTo("#quote")} className="mt-2 bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-semibold">
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
