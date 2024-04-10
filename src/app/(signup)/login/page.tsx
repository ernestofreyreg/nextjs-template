"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import {
  LoginFormValues,
  VerifyFormValues,
} from "@/app/(signup)/login/components/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { LoginView } from "@/app/(signup)/login/components/LoginView";

function cleanPhoneNumber(phone: string) {
  const cleaned = phone.replace(/[^\d]/g, "");
  if (cleaned.startsWith("1")) {
    return cleaned.substring(1);
  }
  return cleaned;
}

export default function Login() {
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
    const pNumber = cleanPhoneNumber(login.phone);

    const { error: loginError } = await supabase.auth.signInWithOtp({
      phone: `+1${pNumber}`,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      setPhone("");
    } else {
      setLoading(false);
      setPhone(pNumber);
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
        router.push("/");
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
      onBackToPhone={handlGoBackToPhone}
      isLoading={loading}
      isVerifying={verifying}
      isError={error}
    />
  );
}
