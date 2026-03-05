import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

export const categoryFolders = [
  {
    category: "Hardwood",
    slug: "hardwood",
    cover: portfolio1,
    images: [
      { src: portfolio1, title: "Herringbone Kitchen" },
      { src: portfolio6, title: "Farmhouse Entry" },
      { src: portfolio3, title: "Modern Hardwood Office" },
    ],
  },
  {
    category: "Tile",
    slug: "tile",
    cover: portfolio2,
    images: [
      { src: portfolio2, title: "Marble Bathroom" },
      { src: portfolio5, title: "Mosaic Tile Backsplash" },
      { src: portfolio4, title: "Subway Tile Shower" },
    ],
  },
  {
    category: "Commercial",
    slug: "commercial",
    cover: portfolio3,
    images: [
      { src: portfolio3, title: "Modern Office" },
      { src: portfolio1, title: "Corporate Lobby" },
      { src: portfolio5, title: "Retail Showroom" },
    ],
  },
  {
    category: "Carpet",
    slug: "carpet",
    cover: portfolio4,
    images: [
      { src: portfolio4, title: "Cozy Bedroom" },
      { src: portfolio6, title: "Family Room Carpet" },
      { src: portfolio2, title: "Plush Living Room" },
    ],
  },
  {
    category: "Stone",
    slug: "stone",
    cover: portfolio5,
    images: [
      { src: portfolio5, title: "Garden Patio" },
      { src: portfolio3, title: "Flagstone Walkway" },
      { src: portfolio1, title: "Stone Fireplace Surround" },
    ],
  },
];

const PortfolioSection = () => {
  const navigate = useNavigate();

  return (
    <section id="portfolio" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-accent text-sm tracking-[0.2em] uppercase font-semibold mb-2">Our Work</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Our Portfolio</h2>
          <p className="text-muted-foreground mt-3">Click a category to see more</p>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {categoryFolders.map((folder) => (
              <motion.div
                key={folder.category}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-lg overflow-hidden aspect-square cursor-pointer"
                onClick={() => navigate(`/portfolio/${folder.slug}`)}
              >
                <img src={folder.cover} alt={folder.category} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-[hsl(var(--dark-wood))]/0 group-hover:bg-[hsl(var(--dark-wood))]/60 transition-colors duration-300 flex items-end p-6">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-[hsl(var(--warm-gold))] text-xs tracking-widest uppercase mb-1">{folder.images.length} Projects</p>
                    <h3 className="font-display text-xl font-semibold text-[hsl(var(--warm-cream))]">{folder.category}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
