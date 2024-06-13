import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database, Tables } from "@/types/supabase";

export async function createPublicSchedule({
  values,
  roles,
}: {
  values: Omit<
    Tables<"public_schedules">,
    "id" | "archived" | "created_at" | "name"
  >;
  roles: Array<
    Omit<Tables<"public_roles">, "id" | "created_at" | "public_schedule_id">
  >;
}) {
  const supabase = createClientComponentClient<Database>();
  const { data, error } = await supabase
    .from("public_schedules")
    .insert([values])
    .select();
  if (error || !data || data.length === 0) {
    throw new Error(error.message);
  }
  const scheduleId = data[0].id;

  const rolesWithScheduleId = roles.map((role) => ({
    ...role,
    public_schedule_id: scheduleId,
  }));

  const { data: rolesData, error: rolesError } = await supabase
    .from("public_roles")
    .insert(rolesWithScheduleId)
    .select();

  if (rolesError || !rolesData || rolesData.length === 0) {
    throw new Error(rolesError.message);
  }

  return data;
}
