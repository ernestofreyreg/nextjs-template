import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  LoginFormSchema,
  LoginFormValues,
  VerifyFormSchema,
  VerifyFormValues,
} from "@/app/(signup)/login/components/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface LoginViewProps {
  step: "login" | "verify";
  onLogin: (data: LoginFormValues) => void;
  onVerify: (data: VerifyFormValues) => void;
  onBackToPhone: () => void;
  isLoading?: boolean;
  isVerifying?: boolean;
  isError?: string;
}

export const LoginView: FC<LoginViewProps> = ({
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
    <div className="w-full h-[100vh] lg:grid  lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid max-w-[350px] w-[90%] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              {step === "login" &&
                "Enter your phone below to login to your account"}
              {step === "verify" &&
                "Enter the OTP sent to your phone to verify your account"}
            </p>
          </div>
          <div className="grid gap-4">
            {step === "login" && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onLogin)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        {isError && (
                          <FormDescription>{isError}</FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={form.handleSubmit(onLogin)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Start"
                    )}
                  </Button>
                </form>
              </Form>
            )}
            {step === "verify" && (
              <Form {...form}>
                <form
                  onSubmit={verifyForm.handleSubmit(onVerify)}
                  className="space-y-8"
                >
                  <FormField
                    control={verifyForm.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One time Token</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        {isError && (
                          <FormDescription>{isError}</FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row items-center gap-2">
                    <Button
                      onClick={verifyForm.handleSubmit(onVerify)}
                      type="button"
                      disabled={isVerifying}
                    >
                      {isVerifying ? (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Verify"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onBackToPhone}
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block bg-gray-100 relative" />
    </div>
  );
};
