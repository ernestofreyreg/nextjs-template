"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";

export function LoginForm({ session }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${global.location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  if (session) {
    return null;
  }

  return (
    <>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </FormControl>
      <Button type="button" onClick={handleSignUp}>
        Sign up
      </Button>
      <Button type="button" onClick={handleSignIn}>
        Sign in
      </Button>
    </>
  );
}
