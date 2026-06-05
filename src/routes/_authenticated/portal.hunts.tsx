import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { PortalShell } from "@/components/portal/PortalShell";
import { getDashboard } from "@/lib/portal.functions";
import { format } from "date-fns";

export const Route = createFileRoute("/_authenticated/portal/hunts")({
  head: () => ({ meta: [{ title: "My Hunts — Top Trackers" }] }),
  component: Hunts,
});

function Hunts() {
  const fn = useServerFn(getDashboard);
  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: () => fn() });
  const bookings = data?.bookings ?? [];

  return (
    <PortalShell title="My Hunts">
      {bookings.length === 0 ? (
        <div className="bg-[#2d2d2d] border border-[#3d3d3d] p-10 text-center">
          <p className="text-[#a8a8a0]">No expeditions yet.</p>
          <Link to="/portal/book" className="mt-4 inline-block px-5 py-2.5 bg-[#c9a84c] text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase">Plan your first hunt</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-[#2d2d2d] border border-[#3d3d3d] p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-display text-xl text-[#c9a84c]">{b.species?.emoji} {b.species?.name ?? "Draft expedition"}</div>
                <div className="text-xs text-[#a8a8a0] mt-1 font-mono">
                  {b.start_date ? format(new Date(b.start_date), "PP") : "Dates TBD"}
                  {b.end_date && ` → ${format(new Date(b.end_date), "PP")}`}
                  {" · "}PH: {b.professional_hunters?.name ?? "—"}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 text-[10px] tracking-[0.3em] uppercase border border-[#3d3d3d] text-[#c9a84c]">{b.status}</span>
                {b.status === "draft" && (
                  <Link to="/portal/book" search={{ id: b.id }} className="text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] hover:text-[#c9a84c]">Resume →</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
