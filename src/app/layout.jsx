import "@/styles/globals.css";
import { Container } from "react-bootstrap";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Providers from "./providers";
import { Navigation } from "@/components/Navigation";

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
