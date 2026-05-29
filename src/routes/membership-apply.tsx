import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/membership-apply")({
  head: () => ({
    meta: [
      { title: "Apply for Membership — Top Trackers" },
      { name: "description", content: "Apply for membership in Top Trackers — Tanzania's invitation-only safari and hunting club." },
    ],
  }),
  component: Apply,
});

const tiers = ["Tracker — $2,400 / yr", "Professional Hunter — $7,800 / yr", "Legacy — by invitation"];

function Apply() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", country: "", referred: "", tier: tiers[0],
    experience: "", quarry: "", motivation: "", agreed: false,
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  const total = 3;
  const progress = ((step + 1) / total) * 100;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (step < total - 1) {
      setStep((s) => s + 1);
      return;
    }
    if (!form.agreed) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-background">
        <SiteNav />
        <section className="paper-bg pt-32 pb-24 min-h-[80svh] flex items-center">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <Eyebrow>Application received</Eyebrow>
            <h1 className="mt-6 font-display text-5xl text-forest">Karibu, {form.name.split(" ")[0] || "Tracker"}.</h1>
            <p className="mt-6 font-serif text-xl text-foreground/75">
              Your application is in the founding circle's hands. We review every submission personally and respond within ten business days.
            </p>
            <Link to="/" className="inline-flex mt-10 items-center gap-2 px-8 py-4 bg-forest text-bone tracking-[0.3em] text-[11px] uppercase hover:bg-ember transition">
              Return home <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <section className="paper-bg pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <Eyebrow>Apply for membership</Eyebrow>
            <h1 className="mt-4 font-display text-4xl md:text-5xl text-forest">A short, considered application.</h1>
            <p className="mt-4 font-serif text-lg text-foreground/70">
              Three steps. Reviewed personally by our founding circle. We keep numbers small on purpose.
            </p>
          </Reveal>

          <div className="mt-10">
            <div className="flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              <span>Step {step + 1} of {total}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-border overflow-hidden">
              <motion.div animate={{ width: `${progress}%` }} className="h-full bg-ember" transition={{ duration: 0.4 }} />
            </div>
          </div>

          <form onSubmit={submit} className="mt-10 bg-card border border-border p-8 md:p-10 shadow-[var(--shadow-vintage)] space-y-6">
            {step === 0 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h2 className="font-display text-2xl text-forest">About you</h2>
                <Input label="Full name" value={form.name} onChange={(v) => set("name", v)} required />
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} required />
                  <Input label="Country of residence" value={form.country} onChange={(v) => set("country", v)} />
                </div>
                <Input label="Referred by (optional)" value={form.referred} onChange={(v) => set("referred", v)} />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h2 className="font-display text-2xl text-forest">Tier & experience</h2>
                <div>
                  <Label>Preferred tier</Label>
                  <select value={form.tier} onChange={(e) => set("tier", e.target.value)} className="w-full bg-transparent border border-input px-4 py-3 font-serif text-lg focus:outline-none focus:border-ember">
                    {tiers.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <TextArea label="Hunting experience" rows={4} value={form.experience} onChange={(v) => set("experience", v)} placeholder="Years hunting, geographies, dangerous game experience…" />
                <Input label="Quarry of interest" value={form.quarry} onChange={(v) => set("quarry", v)} placeholder="Buffalo, leopard, kudu…" />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h2 className="font-display text-2xl text-forest">Why Top Trackers</h2>
                <TextArea label="A short note to the founding circle" rows={6} value={form.motivation} onChange={(v) => set("motivation", v)} placeholder="In a few lines, tell us why this club, and what you'd bring to it." required />
                <label className="flex items-start gap-3 pt-2">
                  <input type="checkbox" checked={form.agreed} onChange={(e) => set("agreed", e.target.checked)} className="mt-1 accent-ember h-4 w-4" required />
                  <span className="text-sm font-serif text-foreground/80">
                    I have read and accept the <Link to="/terms" className="text-ember underline underline-offset-4">Terms of Service</Link> and <Link to="/privacy" className="text-ember underline underline-offset-4">Privacy Policy</Link>.
                  </span>
                </label>
              </motion.div>
            )}

            <div className="flex justify-between gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="px-6 py-3 border border-forest text-forest tracking-[0.3em] text-[10px] uppercase disabled:opacity-30 hover:bg-forest hover:text-bone transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 bg-forest text-bone tracking-[0.3em] text-[10px] uppercase hover:bg-ember transition"
              >
                {step === total - 1 ? <>Submit application <Check className="h-4 w-4" /></> : <>Continue <ArrowRight className="h-4 w-4" /></>}
              </button>
            </div>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{children}</label>;
}
function Input({ label, value, onChange, type = "text", required, placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={200} className="w-full bg-transparent border border-input px-4 py-3 font-serif text-lg focus:outline-none focus:border-ember" />
    </div>
  );
}
function TextArea({ label, value, onChange, rows = 4, required, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <textarea required={required} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={2000} className="w-full bg-transparent border border-input px-4 py-3 font-serif text-lg focus:outline-none focus:border-ember" />
    </div>
  );
}
