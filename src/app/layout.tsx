import "@/styles/globals.css";
import Providers from "@/services/providers";

export const metadata = {
  title: "crewrein",
  description: "by codexsw inc",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
