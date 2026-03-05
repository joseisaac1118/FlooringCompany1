import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { categoryFolders } from "@/components/PortfolioSection";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

const PortfolioCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const folder = categoryFolders.find((f) => f.slug === slug);

  if (!folder) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Category not found</h1>
            <button onClick={() => navigate("/")} className="text-primary underline">
              Go back home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <section className="pt-28 pb-24 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <button
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Portfolio</span>
            </button>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-accent text-sm tracking-[0.2em] uppercase font-semibold mb-2">Portfolio</p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">{folder.category}</h1>
              <p className="text-muted-foreground mt-3">{folder.images.length} projects in this category</p>
            </motion.div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {folder.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-lg overflow-hidden aspect-square cursor-pointer"
                onClick={() => setLightbox(idx)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end p-6">
                  <p className="text-background font-medium opacity-0 group-hover:opacity-100 transition-opacity">{img.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-background hover:text-background/70 transition-colors">
            <X className="w-8 h-8" />
          </button>
          <img
            src={folder.images[lightbox].src}
            alt={folder.images[lightbox].title}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-8 text-background text-lg font-medium">{folder.images[lightbox].title}</p>
        </div>
      )}

      <ContactFooter />
    </main>
  );
};

export default PortfolioCategory;
