import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulso",
  description: "Desempeño comercial y motivación de equipos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
