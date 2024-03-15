import "@/styles/globals.css";
import Providers from "./providers";
import { Container } from "react-bootstrap";
import { Navigation } from "@/components/Navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

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
          <Navigation session={session} />
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
