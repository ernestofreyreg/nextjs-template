import "@/styles/globals.css";
import Providers from "@/services/providers";

export const metadata = {
  title: "CrewRein",
  description: "by Ernesto F.",
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
