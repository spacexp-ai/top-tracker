import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Welcome" },
  { to: "/our-story", label: "Our Story" },
  { to: "/experience", label: "The Experience" },
  { to: "/membership", label: "Membership" },
  { to: "/journal", label: "Journal" },
  { to: "/estimator", label: "Estimator" },
  { to: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-accent/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Top Trackers crest"
            className="h-12 w-12 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:rotate-[8deg]"
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-bone text-sm tracking-[0.25em]">TOP TRACKERS</span>
            <span className="text-[10px] tracking-[0.4em] text-accent uppercase">Est. 2023 · Africa</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative px-4 py-2 text-[12px] tracking-[0.25em] uppercase text-bone/85 hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground text-[11px] tracking-[0.3em] uppercase font-medium border border-accent hover:bg-transparent hover:text-accent transition-all duration-300"
        >
          Book Safari
        </Link>

        <button
          className="md:hidden text-bone p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ink/95 border-t border-accent/20 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-bone tracking-[0.2em] uppercase text-sm"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
