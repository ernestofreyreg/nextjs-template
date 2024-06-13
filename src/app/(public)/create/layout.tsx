import { ScreenFrame } from "@/app/(public)/create/components/ScreenFrame";
import { Roboto_Serif } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Providers from "../../../services/providers";

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata = {
  title: "crewrein",
  description: "Shift Management Made Easy",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          robotoSerif.className,
        )}
      >
        <Providers>
          <ScreenFrame>{children}</ScreenFrame>
        </Providers>
      </body>
    </html>
  );
}
