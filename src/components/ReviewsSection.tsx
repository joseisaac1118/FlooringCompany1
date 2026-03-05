import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  created_at: string;
}

const StarRating = ({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <button key={s} onClick={() => interactive && onRate?.(s)} disabled={!interactive} className="disabled:cursor-default">
        <Star className={`w-4 h-4 ${s <= rating ? "fill-warm-gold text-warm-gold" : "text-border"}`} />
      </button>
    ))}
  </div>
);

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      toast.error("Please fill in your name and review.");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase
      .from("reviews")
      .insert({ name: name.trim(), rating, text: text.trim() })
      .select()
      .single();
    setSubmitting(false);
    if (error) {
      toast.error("Failed to submit review. Please try again.");
      return;
    }
    setReviews([data, ...reviews]);
    setName("");
    setText("");
    setRating(5);
    toast.success("Thank you for your review!");
  };

  return (
    <section id="reviews" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.2em] uppercase font-semibold mb-2">Testimonials</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">What Our Clients Say</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : reviews.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">No reviews yet. Be the first!</p>
            ) : (
              reviews.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-lg p-6 border border-border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(r.created_at)}</p>
                    </div>
                    <StarRating rating={r.rating} />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{r.text}</p>
                </motion.div>
              ))
            )}
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="bg-card rounded-lg p-8 border border-border sticky top-24">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">Leave a Review</h3>
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Your Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="John D." maxLength={50} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Rating</label>
                  <StarRating rating={rating} onRate={setRating} interactive />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Your Review</label>
                  <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Tell us about your experience..." maxLength={500} />
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
