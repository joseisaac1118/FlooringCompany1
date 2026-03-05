import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactFooter = () => (
  <footer id="contact" className="bg-dark-wood text-warm-cream">
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-display text-2xl font-bold mb-4">
            Prestige<span className="text-warm-gold">Floors</span>
          </h3>
          <p className="text-light-wood text-sm leading-relaxed mb-6">
            Bringing beauty and durability to every room. Trusted by homeowners and businesses for over 15 years.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
          <div className="space-y-3">
            <a href="tel:+15551234567" className="flex items-center gap-3 text-light-wood text-sm hover:text-warm-gold transition-colors">
              <Phone className="w-4 h-4 text-warm-gold" /> (555) 123-4567
            </a>
            <a href="mailto:info@prestigefloors.com" className="flex items-center gap-3 text-light-wood text-sm hover:text-warm-gold transition-colors">
              <Mail className="w-4 h-4 text-warm-gold" /> info@prestigefloors.com
            </a>
            <p className="flex items-center gap-3 text-light-wood text-sm">
              <MapPin className="w-4 h-4 text-warm-gold" /> 123 Oak Street, Suite 100
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Hours</h4>
          <div className="space-y-2 text-sm text-light-wood">
            <p className="flex items-center gap-3"><Clock className="w-4 h-4 text-warm-gold" /> Mon–Fri: 8AM – 6PM</p>
            <p className="pl-7">Saturday: 9AM – 3PM</p>
            <p className="pl-7">Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-medium-wood/30">
      <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between text-xs text-light-wood/60">
        <p>© 2026 PrestigeFloors. All rights reserved.</p>
        <p>Crafted with care</p>
      </div>
    </div>
  </footer>
);

export default ContactFooter;
