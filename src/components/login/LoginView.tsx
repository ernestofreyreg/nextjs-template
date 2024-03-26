import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginFormSchema,
  LoginFormValues,
  VerifyFormSchema,
  VerifyFormValues,
} from "./schema";

interface LogindivProps {
  step: "login" | "verify";
  onLogin: (data: LoginFormValues) => void;
  onVerify: (data: VerifyFormValues) => void;
  onBackToPhone: () => void;
  isLoading?: boolean;
  isVerifying?: boolean;
  isError?: string;
}

export const LoginView: FC<LogindivProps> = ({
  step,
  onLogin,
  onVerify,
  onBackToPhone,
  isLoading,
  isVerifying,
  isError,
}) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      phone: "",
    },
  });

  const verifyForm = useForm<VerifyFormValues>({
    resolver: zodResolver(VerifyFormSchema),
  });

  return (
    <div>
      <div>
        <div>
          {step === "login" && "Enter your phone number"}
          {step === "verify" && "Enter the code sent to your phone"}
        </div>

        {step === "login" && (
          <div className="div items-start mx-8">
            <div className="mb-2">Phone number</div>
            <Controller
              control={form.control}
              name="phone"
              render={({ field }) => (
                <input
                  className="border px-2 py-1 rounded"
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />

            <button type="button" onClick={form.handleSubmit(onLogin)}>
              {isLoading ? "Loading" : "Start"}
            </button>

            {isError && (
              <div className="w-full">
                <div className="div-red-500 div-center">{isError}</div>
              </div>
            )}
          </div>
        )}
        {step === "verify" && (
          <div className="div items-start mx-8">
            <div className="mb-2">Security code</div>
            <Controller
              control={verifyForm.control}
              name="token"
              render={({ field }) => (
                <input onChange={field.onChange} value={field.value} />
              )}
            />

            <button onClick={verifyForm.handleSubmit(onVerify)} type="button">
              {isVerifying ? "Loading" : "Verify"}
            </button>

            {isError && (
              <div className="w-full">
                <div className="div-red-500 div-center">{isError}</div>
              </div>
            )}

            <button type="button" onClick={onBackToPhone}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
