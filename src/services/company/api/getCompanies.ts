import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getCompanies(_supabase?: SupabaseClient<Database>) {
  const supabase = _supabase || createClientComponentClient<Database>();
  const { data: companies, error } = await supabase
    .from("companies")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return companies;
}
