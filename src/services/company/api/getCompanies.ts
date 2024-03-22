import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getCompanies(_supabase) {
  const supabase = _supabase || createClientComponentClient();
  const { data: companies, error } = await supabase
    .from("companies")
    .select("*");

  if (error) {
    throw error;
  }

  return companies;
}
