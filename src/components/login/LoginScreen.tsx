"use client";

import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { LoginView } from "./LoginView";
import { LoginFormValues, VerifyFormValues } from "./schema";

interface LoginScreenProps {}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const router = useRouter();
  const [step, setStep] = useState<"login" | "verify">("login");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | undefined>("");

  const handleLogin = useCallback(async (login: LoginFormValues) => {
    setError(undefined);
    setLoading(true);
    const supabase = createClientComponentClient();
    const { error: loginError } = await supabase.auth.signInWithOtp({
      phone: `+1${login.phone}`,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      setPhone("");
    } else {
      setLoading(false);
      setPhone(login.phone);
      setStep("verify");
    }
  }, []);

  const handleVerify = useCallback(
    async (verify: VerifyFormValues) => {
      setError(undefined);
      setVerifying(true);
      const supabase = createClientComponentClient<Database>();
      const { error: verifyError } = await supabase.auth.verifyOtp({
        phone: `+1${phone}`,
        token: verify.token,
        type: "sms",
      });
      setVerifying(false);
      if (verifyError) {
        setError(verifyError.message);
      } else {
        // Handle successful verification
        router.push("/dashboard");
      }
    },
    [phone, router],
  );

  const handlGoBackToPhone = useCallback(() => {
    setStep("login");
    setPhone("");
    setError(undefined);
  }, []);

  return (
    <LoginView
      step={step}
      onLogin={handleLogin}
      onVerify={handleVerify}
      isLoading={loading}
      isVerifying={verifying}
      isError={error}
      onBackToPhone={handlGoBackToPhone}
    />
  );
};
