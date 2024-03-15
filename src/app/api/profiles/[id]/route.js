import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";
export async function GET(request, { params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.id)
    .single();
  return Response.json({ id: profile.id, ...profile.data });
}
