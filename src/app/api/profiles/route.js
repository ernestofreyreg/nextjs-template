import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createServerComponentClient({ cookies });
  const { data: profiles } = await supabase.from("profiles").select("*");
  return Response.json(
    profiles.map((profile) => ({ id: profile.id, ...profile.data })),
  );
}
