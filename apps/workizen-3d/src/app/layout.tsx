import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workizen HQ Campus",
  description: "Founder demo MVP for Workizen 3D Digital Citizen City."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
