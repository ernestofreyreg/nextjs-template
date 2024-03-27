"use client";

import { FC, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface NavigationProps {
  session: Session;
}
export const Navigation: FC<NavigationProps> = ({ session }) => {
  const router = useRouter();
  const handleSignOut = useCallback(async () => {
    const supabase = createClientComponentClient<Database>();
    await supabase.auth.signOut();
    router.refresh();
  }, [router]);

  return (
    <div>
      <span>Logged in as {session.user.email}</span>
      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
};
