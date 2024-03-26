import { z } from "zod";

export const LoginFormSchema = z.object({
  phone: z.string({ required_error: "Phone required" }),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;

export const VerifyFormSchema = z.object({
  token: z.string({ required_error: "Token required" }),
});

export type VerifyFormValues = z.infer<typeof VerifyFormSchema>;
