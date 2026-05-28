import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="relative bg-ink text-bone overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_30%_20%,var(--color-accent),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img src={logo} alt="" className="h-16 w-16 object-contain" />
              <div>
                <div className="font-display text-2xl tracking-[0.2em]">TOP TRACKERS</div>
                <div className="text-[10px] tracking-[0.4em] text-accent uppercase">Premium Hunting Club · Africa</div>
              </div>
            </div>
            <p className="font-serif text-xl text-bone/70 max-w-md leading-relaxed">
              The ancient art of the African chase, met with the quiet confidence of a private membership.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-accent mb-5">Camp</h4>
            <ul className="space-y-3 text-sm text-bone/75">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-accent" /> Losirva, Tenki la Maji No. 18, Esilalei, Monduli — Tanzania</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> +255 763 075 130</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> info@top-trackers.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-accent mb-5">Compass</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/our-story" className="hover:text-accent">Our Story</Link></li>
              <li><Link to="/experience" className="hover:text-accent">The Experience</Link></li>
              <li><Link to="/membership" className="hover:text-accent">Membership</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Book a Safari</Link></li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a href="#" aria-label="Instagram" className="h-9 w-9 grid place-items-center border border-accent/40 hover:bg-accent hover:text-accent-foreground transition"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="h-9 w-9 grid place-items-center border border-accent/40 hover:bg-accent hover:text-accent-foreground transition"><Facebook className="h-4 w-4" /></a>
            </div>
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
