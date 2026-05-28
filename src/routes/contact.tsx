import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import camp from "@/assets/camp.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Book a Safari with Top Trackers" },
      { name: "description", content: "Begin your African hunting expedition. Contact Top Trackers in Esilalei, Tanzania to plan a private safari or apply for membership." },
      { property: "og:title", content: "Book your Safari — Top Trackers" },
      { property: "og:description", content: "Plan your African hunting expedition with Top Trackers." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="relative h-[55svh] bg-ink overflow-hidden">
        <img src={camp} alt="" width={1600} height={1100} className="absolute inset-0 w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-bone">
          <Eyebrow light>Plan your expedition</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl max-w-4xl leading-[0.95]">
            Book your <span className="italic font-serif text-accent">safari.</span>
          </h1>
        </div>
      </section>

      <section className="paper-bg py-24">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2 space-y-8">
            <Reveal>
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-ember mb-3">The Camp</div>
                <h2 className="font-display text-3xl text-forest leading-tight">Esilalei, Monduli<br /><span className="font-serif italic text-ember">Tanzania.</span></h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-4 font-serif text-lg">
                <li className="flex gap-3"><MapPin className="h-5 w-5 text-ember mt-1 shrink-0" /> Losirva, Tenki la Maji No. 18, Esilalei, Monduli — Tanzania</li>
                <li className="flex gap-3"><Phone className="h-5 w-5 text-ember mt-1 shrink-0" /> +255 763 075 130</li>
                <li className="flex gap-3"><Mail className="h-5 w-5 text-ember mt-1 shrink-0" /> info@top-trackers.com</li>
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-serif italic text-foreground/70 border-l-2 border-accent pl-4">
                We respond to every inquiry within two business days, from camp directly.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="md:col-span-3">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="bg-card border border-border p-8 md:p-10 shadow-[var(--shadow-vintage)]"
            >
              <div className="text-[10px] tracking-[0.4em] uppercase text-accent mb-2">Inquiry</div>
              <h3 className="font-display text-2xl text-forest mb-8">Tell us what you seek.</h3>

              {sent ? (
                <div className="py-16 text-center">
                  <div className="font-display text-3xl text-ember">Karibu.</div>
                  <p className="mt-3 font-serif text-lg text-foreground/75">Your message is on its way to camp. We'll be in touch shortly.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Name" name="name" required />
                    <Field label="Email" name="email" type="email" required />
                  </div>
                  <Field label="Country" name="country" />
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Interest</label>
                    <select className="w-full bg-transparent border border-input px-4 py-3 font-serif text-lg focus:outline-none focus:border-ember">
                      <option>The Selous Classic</option>
                      <option>Maasai Steppe Plains</option>
                      <option>Iringa Highlands</option>
                      <option>Club Membership</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Tell us more</label>
                    <textarea rows={5} className="w-full bg-transparent border border-input px-4 py-3 font-serif text-lg focus:outline-none focus:border-ember" placeholder="Dates, quarry, party size, anything we should know…" />
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 px-8 py-4 bg-forest text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-ember transition">
                    Send inquiry <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{label}</label>
      <input name={name} type={type} required={required} className="w-full bg-transparent border border-input px-4 py-3 font-serif text-lg focus:outline-none focus:border-ember" />
    </div>
  );
}
