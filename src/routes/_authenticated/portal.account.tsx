import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { PortalShell } from "@/components/portal/PortalShell";
import { getDashboard } from "@/lib/portal.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/portal/account")({
  head: () => ({ meta: [{ title: "Account — Top Trackers" }] }),
  component: Account,
});

function Account() {
  const fn = useServerFn(getDashboard);
  const { data, refetch } = useQuery({ queryKey: ["dashboard"], queryFn: () => fn() });
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (data?.profile) {
      setName(data.profile.display_name ?? "");
      setCountry(data.profile.country ?? "");
    }
  }, [data?.profile]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const { error } = await supabase.from("profiles").update({ display_name: name, country }).eq("id", data!.profile!.id);
    if (error) setMsg(error.message);
    else { setMsg("Saved."); refetch(); }
  }

  return (
    <PortalShell title="Account">
      <form onSubmit={save} className="max-w-xl bg-[#2d2d2d] border border-[#3d3d3d] p-8 space-y-5">
        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Display name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100}
            className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3" />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Country</label>
          <input value={country} onChange={(e) => setCountry(e.target.value)} maxLength={80}
            className="w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[#c9a84c] focus:outline-none px-4 py-3" />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase text-[#a8a8a0] mb-2">Tier</label>
          <div className="font-mono text-[#c9a84c]">{data?.roles?.[0]?.role ?? "observer"}</div>
        </div>
        {msg && <p className="text-xs text-[#c9a84c]">{msg}</p>}
        <button className="px-6 py-3 bg-[#c9a84c] text-[#1a1a1a] text-[10px] tracking-[0.3em] uppercase">Save</button>
      </form>
    </PortalShell>
  );
}
