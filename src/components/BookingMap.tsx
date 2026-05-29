import { MapPin, Plane } from "lucide-react";

// Lightweight interactive map via OpenStreetMap embed — no API key needed.
// Esilalei, Monduli, Tanzania
const bbox = "35.78,-3.55,36.22,-3.30";
const marker = "-3.43,36.00";
const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;

export function BookingMap() {
  return (
    <div className="bg-card border border-border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-accent">Base Camp</div>
          <div className="font-display text-lg text-forest">Esilalei · Monduli</div>
        </div>
        <a
          href="https://www.openstreetmap.org/?mlat=-3.43&mlon=36.00#map=10/-3.43/36.00"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] tracking-[0.3em] uppercase text-ember hover:text-forest transition flex items-center gap-1"
        >
          <MapPin className="h-3.5 w-3.5" /> Open in maps
        </a>
      </div>
      <iframe
        title="Top Trackers base camp"
        src={src}
        className="w-full h-64 md:h-80 grayscale-[0.4] contrast-[1.05]"
        loading="lazy"
      />
      <div className="flex items-center justify-between gap-3 p-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><Plane className="h-3.5 w-3.5 text-ember" /> Arusha (JRO) — 90 min transfer</span>
        <span className="font-serif italic">3°25′S, 36°00′E</span>
      </div>
    </div>
  );
}
