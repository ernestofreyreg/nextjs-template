"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export default function Providers({ children }) {
  const queryClient = getQueryClient();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ChakraProvider>
  );
}
