import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://workizen.net"),
  title: {
    default: "Workizen — Opportunity Marketplace & WorkforceOS",
    template: "%s",
  },
  description:
    "Workizen is building an opportunity marketplace and WorkforceOS where citizens, AI agents, knowledge, and compute collaborate.",
  applicationName: "Workizen",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Workizen — Opportunity Marketplace & WorkforceOS",
    description:
      "An opportunity marketplace where people, AI agents, knowledge, and compute work together.",
    url: "https://workizen.net",
    siteName: "Workizen",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Global legitimacy footer: low-profile, always present in the DOM so the
            legal pages are linked + crawlable from every route (incl. the 3D home). */}
        <footer className="site-legal-footer">
          <nav aria-label="Legal">
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <span>© {new Date().getFullYear()} Workizen</span>
        </footer>
      </body>
    </html>
  );
}
