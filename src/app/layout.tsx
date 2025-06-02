import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import { sfProDisplay } from "./fonts";

export const metadata: Metadata = {
  title: "HUMBLE BEAST - Sebastian García",
  description: "Una membresía diseñada para empujarte y crecer como trader y ser humano. Aquí no solo operamos, nos transformamos. Soy Sebastian García y me dedico a crecer.",
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
