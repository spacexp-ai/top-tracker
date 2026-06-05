import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { PortalShell } from "@/components/portal/PortalShell";
import { getDashboard } from "@/lib/portal.functions";
import { Calendar, Compass, Trophy, BookOpen, ArrowRight, Wind, Thermometer, Moon, Activity } from "lucide-react";
import { format } from "date-fns";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => ({ meta: [{ title: "The Campfire — Top Trackers" }] }),
  component: Dashboard,
});

function Dashboard() {
  const fn = useServerFn(getDashboard);
  const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: () => fn() });

  const tier = data?.roles?.[0]?.role ?? "observer";
  const next = data?.bookings?.find((b) => b.status !== "cancelled" && b.start_date) ?? data?.bookings?.[0];
  const firstName = (data?.profile?.display_name ?? "Tracker").split(" ")[0];

  return (
    <PortalShell title={`Welcome back, ${firstName}.`}>
      {isLoading ? (
        <div className="text-[#a8a8a0]">Loading the camp…</div>
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-3">
            <Card title="My Next Hunt" icon={Calendar}>
              {next ? (
                <>
                  <div className="font-display text-2xl text-[#c9a84c]">
                    {next.species?.emoji} {next.species?.name ?? "Untitled hunt"}
                  </div>
                  <div className="mt-2 text-sm text-[#a8a8a0]">
                    {next.start_date ? format(new Date(next.start_date), "PP") : "Dates TBD"}
                    {next.end_date && ` → ${format(new Date(next.end_date), "PP")}`}
                  </div>
                  <div className="mt-1 text-xs text-[#a8a8a0]">PH: {next.professional_hunters?.name ?? "Unassigned"}</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-[10px] tracking-[0.3em] uppercase text-[#c9a84c]">
                    {next.status}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-[#a8a8a0]">No hunt on the calendar yet.</p>
                  <Link to="/portal/book" className="mt-4 inline-flex items-center gap-2 text-[#c9a84c] text-xs tracking-[0.3em] uppercase">
                    Plan a hunt <ArrowRight className="h-3 w-3" />
                  </Link>
                </>
              )}
            </Card>

            <LockedCard title="Trophy Room" icon={Trophy} tier={tier}>
              <div className="text-3xl font-display text-[#c9a84c]">—</div>
              <div className="text-xs text-[#a8a8a0]">Species recorded</div>
            </LockedCard>

            <LockedCard title="Field Journal" icon={BookOpen} tier={tier}>
              <div className="text-sm text-[#f5f5f0]">Q2 2026 — "The Buffalo of Maasai"</div>
              <div className="mt-2 text-xs text-[#a8a8a0]">Latest issue</div>
            </LockedCard>
          </div>

          {/* Quick actions */}
          <div className="mt-8">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#a8a8a0] mb-3">Quick actions</div>
            <div className="flex flex-wrap gap-3">
              <ActionLink to="/portal/book" icon={Compass}>Plan new hunt</ActionLink>
              <ActionLink to="/portal/hunts" icon={Calendar}>My hunts</ActionLink>
              <ActionLink to="/contact" icon={ArrowRight}>Contact camp</ActionLink>
            </div>
          </div>

          {/* Weather window */}
          <div className="mt-8 bg-[#2d2d2d] border border-[#3d3d3d] p-6">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] mb-3">Upcoming Weather Window — Iringa</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Stat icon={Thermometer} label="Temp" value="68–74°F" />
              <Stat icon={Wind} label="Wind" value="SE 8–15mph" />
              <Stat icon={Moon} label="Moon" value="Waxing gibbous" />
              <Stat icon={Activity} label="Hunt score" value="9.2 / 10" />
            </div>
          </div>

          {/* Activity */}
          <div className="mt-8">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#a8a8a0] mb-3">Recent activity</div>
            <ul className="bg-[#2d2d2d] border border-[#3d3d3d] divide-y divide-[#3d3d3d]">
              {(data?.bookings ?? []).slice(0, 5).map((b) => (
                <li key={b.id} className="px-5 py-3 flex items-center justify-between text-sm">
                  <span className="text-[#f5f5f0]">
                    {b.species?.emoji} {b.species?.name ?? "Draft"} — <span className="text-[#a8a8a0]">{b.status}</span>
                  </span>
                  <span className="text-xs text-[#a8a8a0] font-mono">{format(new Date(b.updated_at), "PP")}</span>
                </li>
              ))}
              {(data?.bookings ?? []).length === 0 && (
                <li className="px-5 py-6 text-sm text-[#a8a8a0]">No activity yet — your first booking will appear here.</li>
              )}
            </ul>
          </div>
        </>
      )}
    </PortalShell>
  );
}

function Card({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-6 hover:border-[#c9a84c]/60 transition">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]">{title}</span>
        <Icon className="h-4 w-4 text-[#c9a84c]" />
      </div>
      {children}
    </div>
  );
}

function LockedCard({ title, icon, tier, children }: { title: string; icon: React.ComponentType<{ className?: string }>; tier: string; children: React.ReactNode }) {
  const locked = tier === "observer";
  return (
    <div className="relative bg-[#2d2d2d] border border-[#3d3d3d] p-6">
      <Card title={title} icon={icon}>{children}</Card>
      {locked && (
        <div className="absolute inset-0 bg-[#1a1a1a]/85 flex flex-col items-center justify-center text-center px-4">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c]">Tracker tier+</div>
          <Link to="/membership-apply" className="mt-3 px-4 py-2 bg-[#c9a84c] text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase">Upgrade</Link>
        </div>
      )}
    </div>
  );
}

function ActionLink({ to, icon: Icon, children }: { to: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#3d3d3d] hover:border-[#c9a84c] hover:text-[#c9a84c] text-xs tracking-[0.2em] uppercase text-[#a8a8a0] transition">
      <Icon className="h-3.5 w-3.5" /> {children}
    </Link>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0]">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-1 font-mono text-[#f5f5f0]">{value}</div>
    </div>
  );
}
