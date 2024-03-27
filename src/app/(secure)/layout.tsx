import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Navigation } from "@/components/Navigation";
import Providers from "../../services/providers";
import "@/styles/globals.css";

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
          {session && <Navigation session={session} />}
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
