"use client";

import { getMessage } from "@/services/getMessage";
import { useQuery } from "@tanstack/react-query";

export const Message = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["message"],
    queryFn: getMessage,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>{data.message}</div>;
};
