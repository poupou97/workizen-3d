import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workizen 3D World",
  description: "The cute digital city for Digital Citizens"
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
