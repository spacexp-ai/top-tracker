import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Eyebrow } from "@/components/Eyebrow";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Top Trackers" },
      { name: "description", content: "How Top Trackers collects, uses, and protects your personal data." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="paper-bg pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <Eyebrow>Discretion as a discipline</Eyebrow>
          <h1 className="mt-6 font-display text-5xl text-forest">Privacy Policy</h1>
          <p className="mt-4 font-serif text-sm text-muted-foreground">Last updated: 1 May 2026</p>

          <article className="mt-10 font-serif text-lg text-foreground/80 space-y-6 leading-relaxed">
            <p>Top Trackers Ltd. respects your privacy. This policy explains what we collect, why, and what we will never do with your information.</p>

            <h2 className="font-display text-2xl text-forest pt-4">What we collect</h2>
            <p>Booking and membership applications: name, contact details, travel documents, dietary and medical notes relevant to the safari. Website analytics: pages visited and aggregate device data, only with your cookie consent.</p>

            <h2 className="font-display text-2xl text-forest pt-4">How we use it</h2>
            <p>To operate your safari and membership, to communicate with you, and to maintain conservation records as required by Tanzanian authorities. Member and guest identities are never sold, shared, or published.</p>

            <h2 className="font-display text-2xl text-forest pt-4">Cookies</h2>
            <p>We use cookies to remember your preferences and to measure site performance. You can decline non-essential cookies at any time via the banner at the foot of the page.</p>

            <h2 className="font-display text-2xl text-forest pt-4">Your rights</h2>
            <p>You may request a copy of, correction to, or deletion of your personal data at any time by writing to info@top-trackers.com. We will respond within 30 days.</p>

            <h2 className="font-display text-2xl text-forest pt-4">Retention</h2>
            <p>Booking records are retained for seven years for tax and conservation-record purposes; marketing data is retained only while your subscription is active.</p>
          </article>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
