import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Companies } from "@/components/Companies";
import { getCompanies } from "@/services/company/api/getCompanies";

export default async function Page() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  await queryClient.prefetchQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanies(supabase),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>Companies</h1>
        <Companies />
      </div>
    </HydrationBoundary>
  );
}
