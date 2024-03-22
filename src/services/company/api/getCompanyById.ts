import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getCompanyById(id) {
  const supabase = createClientComponentClient();
  const { data: company, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return company;
}
