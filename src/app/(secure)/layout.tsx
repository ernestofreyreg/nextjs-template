import { Frame } from "@/components/frame/Frame";
import { protectPage } from "@/services/protectPage";
import Providers from "../../services/providers";
import "@/styles/globals.css";

export const metadata = {
  title: "My Nextjs App",
  description: "by Ernesto F.",
};

export default async function RootLayout({ children }) {
  const session = await protectPage();

  return (
    <html lang="en">
      <body>
        <Providers>
          <Frame session={session}>{children}</Frame>
        </Providers>
      </body>
    </html>
  );
}
