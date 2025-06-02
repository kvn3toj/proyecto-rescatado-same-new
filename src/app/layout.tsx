import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import { sfProDisplay } from "./fonts";

export const metadata: Metadata = {
  title: "Te Vas A Morir - Diego Dreyfus",
  description: "Soy Diego Dreyfus y no estoy aquí para cambiar tu vida. Me dedico a crecer y si quieres usar mi proceso para inspirarte, qué chingón.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sfProDisplay.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
