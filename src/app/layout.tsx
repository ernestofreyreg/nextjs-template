import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Providers from "./providers";

export const metadata = {
  title: "My Nextjs App",
  description: "by Ernesto F.",
};

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <Providers>
          {session && (
            <div>
              <span>Logged in as {session.user.email}</span>
              <button type="button" onClick={() => supabase.auth.signOut()}>
                Sign out
              </button>
            </div>
          )}
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
