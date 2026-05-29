import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Top Trackers" },
      { name: "description", content: "Frequently asked questions about safari planning, hunts, ethics, travel, and membership at Top Trackers." },
    ],
  }),
  component: FAQs,
});

const faqs = [
  { q: "When is the best time to hunt in Tanzania?", a: "Our season runs July through November, with cooler, drier weather and concentrated game around the remaining water." },
  { q: "Do I need to bring my own rifle?", a: "You may bring your own under a Tanzanian import permit, or use one of our camp rifles. We chamber .375 H&H, .416 Rigby, and .300 Win Mag among others." },
  { q: "What does the daily rate include?", a: "Camp accommodation, all meals and drinks, PH and trackers, vehicles, fuel, field preparation of trophies, and government conservation levies. It excludes trophy fees, dip-pack, shipping, gratuities, and charter flights." },
  { q: "How long is a typical safari?", a: "Plains game runs 7–10 days; dangerous game safaris run 14–21 days for proper tracking and fair chase." },
  { q: "Is hunting really conservation?", a: "Properly regulated hunting funds the bulk of African anti-poaching and habitat work. We publish our quota outcomes and conservation spend annually in the field journal." },
  { q: "How do I apply for membership?", a: "Submit an application through the membership page. Each application is reviewed by the founding circle; we deliberately keep numbers small." },
  { q: "Can I cancel or postpone?", a: "Cancellation terms scale with proximity to your booking. Postponement within the same season is generally free; full terms are shared at deposit." },
];

function FAQs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="paper-bg pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal><Eyebrow>Answers from camp</Eyebrow></Reveal>
          <h1 className="mt-6 font-display text-5xl md:text-6xl text-forest">
            Frequently <span className="italic font-serif text-ember">asked.</span>
          </h1>

          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className="border border-border bg-card">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex justify-between items-center p-5 text-left"
                  >
                    <span className="font-display text-lg text-forest pr-4">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 text-ember shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="p-5 pt-0 font-serif text-lg text-foreground/75 leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
