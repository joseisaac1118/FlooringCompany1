import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import beforeKitchen from "@/assets/before-kitchen.jpg";
import afterKitchen from "@/assets/after-kitchen.jpg";
import beforeBathroom from "@/assets/before-bathroom.jpg";
import afterBathroom from "@/assets/after-bathroom.jpg";

const comparisons = [
  { before: beforeKitchen, after: afterKitchen, label: "Kitchen Hardwood Transformation" },
  { before: beforeBathroom, after: afterBathroom, label: "Bathroom Tile Renovation" },
];

const ComparisonSlider = ({ before, after, label }: { before: string; after: string; label: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-col-resize select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* After (full background) */}
        <img src={after} alt={`${label} after`} className="absolute inset-0 w-full h-full object-cover" />

        {/* Before (clipped) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={before} alt={`${label} before`} className="w-full h-full object-cover" />
        </div>

        {/* Slider line */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-background shadow-lg" style={{ left: `${position}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary">
              <path d="M5 3L2 8L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 3L14 8L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-foreground/70 text-background text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Before</div>
        <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">After</div>
      </div>
      <p className="text-center text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
};

const BeforeAfterSection = () => {
  return (
    <section id="before-after" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-accent text-sm tracking-[0.2em] uppercase font-semibold mb-2">The Difference</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Before & After</h2>
          <p className="text-muted-foreground mt-3">Drag the slider to see the transformation</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {comparisons.map((comp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <ComparisonSlider {...comp} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
