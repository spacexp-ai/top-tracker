import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [{ data: profile }, { data: roles }, { data: bookings }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase.from("bookings").select("*, species(name,emoji), professional_hunters(name)").eq("user_id", userId).order("updated_at", { ascending: false }).limit(10),
    ]);
    return { profile, roles: roles ?? [], bookings: bookings ?? [] };
  });

export const getCatalog = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const [{ data: species }, { data: phs }] = await Promise.all([
      supabase.from("species").select("*").order("base_price_usd", { ascending: false }),
      supabase.from("professional_hunters").select("*").eq("active", true),
    ]);
    return { species: species ?? [], phs: phs ?? [] };
  });

const bookingSchema = z.object({
  id: z.string().uuid().optional(),
  species_id: z.string().uuid().nullable().optional(),
  ph_id: z.string().uuid().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  party_size: z.number().int().min(1).max(8).optional(),
  camp_tier: z.string().max(40).nullable().optional(),
  kit: z.any().optional(),
  notes: z.string().max(2000).nullable().optional(),
  total_estimate_usd: z.number().int().nullable().optional(),
  current_step: z.number().int().min(1).max(6).optional(),
  status: z.enum(["draft", "submitted"]).optional(),
});

export const saveBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const payload = { ...data, user_id: userId };
    if (data.id) {
      const { data: row, error } = await supabase.from("bookings").update(payload).eq("id", data.id).eq("user_id", userId).select().single();
      if (error) throw new Error(error.message);
      return row;
    }
    const { data: row, error } = await supabase.from("bookings").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return row;
  });
