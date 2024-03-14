import { Message } from "@/components/Message";
import { getMessage } from "@/services/getMessage";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["message"],
    queryFn: getMessage,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <Message />
        <Link href="/about">About</Link>
      </div>
    </HydrationBoundary>
  );
}
