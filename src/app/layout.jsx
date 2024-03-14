import "bootstrap/dist/css/bootstrap.min.css";
import Providers from "./providers";
import { Container } from "react-bootstrap";
import { Navigation } from "@/components/Navigation";

export const metadata = {
  title: "My Nextjs App",
  description: "by Ernesto F.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navigation />
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
