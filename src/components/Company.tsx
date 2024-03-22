"use client";

import { useQuery } from "@tanstack/react-query";
import { getCompanyById } from "@/services/company/api/getCompanyById";

export function Company({ id }) {
  const company = useQuery({
    queryKey: ["company", id],
    queryFn: () => getCompanyById(id),
  });

  if (company.isLoading) {
    return <div>Loading...</div>;
  }

  if (company.isError) {
    return <div>Error: {company.error.message}</div>;
  }

  return (
    <div>
      <h1>Company {company.data.name}</h1>
    </div>
  );
}
