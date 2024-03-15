"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCompany } from "@/services/company/api/createCompany";
import { useInvalidateCompanies } from "@/services/company/hooks/useInvalidateCompanies";

const CompanySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export function NewCompanyForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(CompanySchema),
  });
  const refreshCompanies = useInvalidateCompanies();

  const mutation = useMutation({ mutationFn: createCompany });

  const handleCreateCompany = async (data) => {
    try {
      await mutation.mutateAsync(data);
      reset();
      refreshCompanies();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error); // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreateCompany)}>
      <input type="text" {...register("name")} />
      {errors.name && <span>This field is required</span>}

      <button type="submit">Create Company</button>
    </form>
  );
}
