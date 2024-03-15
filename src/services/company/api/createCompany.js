import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function createCompany({ name }) {
  const supabase = createClientComponentClient();
  await supabase.from("companies").insert([{ name }]).select();
}
