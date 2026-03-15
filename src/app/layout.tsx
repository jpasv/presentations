import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASSESSOR.IA | Infraestrutura de Automação",
  description: "Pitch Comercial B2B - ASSESSOR.IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased bg-[#080808]">
        {children}
      </body>
    </html>
  );
}
