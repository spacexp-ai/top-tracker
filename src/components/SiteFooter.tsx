import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";
import { NewsletterForm } from "@/components/NewsletterForm";

export function SiteFooter() {
  return (
    <footer className="relative bg-ink text-bone overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_30%_20%,var(--color-accent),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img src={logo} alt="" className="h-16 w-16 object-contain" />
              <div>
                <div className="font-display text-2xl tracking-[0.2em]">TOP TRACKERS</div>
                <div className="text-[10px] tracking-[0.4em] text-accent uppercase">Premium Hunting Club · Africa</div>
              </div>
            </div>
            <p className="font-serif text-lg text-bone/70 max-w-md leading-relaxed">
              The ancient art of the African chase, met with the quiet confidence of a private membership.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="https://www.instagram.com/top_trackers/" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2.5 border border-accent/40 hover:bg-accent hover:text-accent-foreground transition">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61589404406645" target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2.5 border border-accent/40 hover:bg-accent hover:text-accent-foreground transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.youtube.com/@TopTrackers" target="_blank" rel="noreferrer" aria-label="YouTube" className="p-2.5 border border-accent/40 hover:bg-accent hover:text-accent-foreground transition">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-accent mb-5">Camp</h4>
            <ul className="space-y-3 text-sm text-bone/75">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" /> Esilalei, Monduli — Tanzania</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> +255 763 075 130</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> info@top-trackers.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-accent mb-5">Compass</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/our-story" className="hover:text-accent">Our Story</Link></li>
              <li><Link to="/experience" className="hover:text-accent">The Experience</Link></li>
              <li><Link to="/hunting-services" className="hover:text-accent">Hunting Services</Link></li>
              <li><Link to="/conservation" className="hover:text-accent">Conservation</Link></li>
              <li><Link to="/journal" className="hover:text-accent">Journal</Link></li>
              <li><Link to="/membership" className="hover:text-accent">Membership</Link></li>
              <li><Link to="/partners" className="hover:text-accent">Partners</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-accent mb-5">Field Dispatch</h4>
            <NewsletterForm compact />
            <ul className="mt-6 space-y-2 text-xs text-bone/60">
              <li><Link to="/faqs" className="hover:text-accent">FAQs</Link></li>
              <li><Link to="/terms" className="hover:text-accent">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-bone/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-bone/50">
          <p>© {new Date().getFullYear()} Top Trackers. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Ethical Hunting · Conservation Heritage</p>
        </div>
      </div>
    </footer>
  );
}
