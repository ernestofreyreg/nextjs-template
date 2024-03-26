import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export async function createCompany({ name }) {
  const supabase = createClientComponentClient<Database>();
  await supabase.from("companies").insert([{ name }]).select();
}
