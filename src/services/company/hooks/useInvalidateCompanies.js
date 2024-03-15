import { useQueryClient } from "@tanstack/react-query";

export function useInvalidateCompanies() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(["companies"]);
}
