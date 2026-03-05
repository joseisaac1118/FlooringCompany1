import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const flooringTypes = ["Hardwood", "Laminate", "Vinyl/LVP", "Tile", "Carpet", "Stone", "Other"];

const QuoteSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", sqft: "", message: "" });

  const update = (key: string, val: string) => setForm({ ...form, [key]: val });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("quote_requests").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      flooring_type: form.type || null,
      sqft: form.sqft || null,
      message: form.message.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Failed to submit. Please try again.");
      return;
    }
    setSubmitted(true);
    toast.success("Quote request submitted! We'll be in touch soon.");
  };

  if (submitted) {
    return (
      <section id="quote" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center py-20">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Thank You!</h2>
            <p className="text-muted-foreground">We've received your quote request. A member of our team will reach out within 24 hours.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.2em] uppercase font-semibold mb-2">Free Estimate</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Request a Quote</h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">Tell us about your project and we'll provide a detailed, no-obligation estimate.</p>
        </motion.div>

        <motion.form onSubmit={submit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto bg-card rounded-lg p-8 md:p-10 border border-border space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="John Doe" maxLength={100} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
              <input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="john@example.com" maxLength={255} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Phone *</label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} type="tel" className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="(555) 123-4567" maxLength={20} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Approx. Sq Ft</label>
              <input value={form.sqft} onChange={(e) => update("sqft", e.target.value)} type="number" className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="500" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Flooring Type</label>
            <select value={form.type} onChange={(e) => update("type", e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">Select a type...</option>
              {flooringTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Project Details</label>
            <textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={4} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Describe your project, room dimensions, any preferences..." maxLength={1000} />
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-accent text-accent-foreground py-3 rounded-md font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} {submitting ? "Submitting..." : "Submit Quote Request"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default QuoteSection;
