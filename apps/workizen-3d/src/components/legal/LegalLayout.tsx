import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared shell for the legal / legitimacy pages (privacy, terms, about, contact).
 * Intentionally lightweight, static, and crawlable — these pages exist to provide
 * Google Safe Browsing / Google Play reviewers with clear business-identity signals.
 */
export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="legal-shell mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10 border-b border-slate-200 pb-6">
        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700 hover:text-blue-900"
        >
          ← Workizen
        </Link>
        <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
          {title}
        </h1>
        {updated ? (
          <p className="mt-2 text-sm font-semibold text-slate-500">
            Last updated: {updated}
          </p>
        ) : null}
      </header>

      <article className="legal-prose space-y-5 text-[15px] leading-7 text-slate-700">
        {children}
      </article>

      <footer className="mt-14 border-t border-slate-200 pt-6 text-sm text-slate-500">
        <nav className="flex flex-wrap gap-x-5 gap-y-2 font-semibold">
          <Link href="/about" className="hover:text-blue-700">About</Link>
          <Link href="/privacy" className="hover:text-blue-700">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-blue-700">Terms of Service</Link>
          <Link href="/contact" className="hover:text-blue-700">Contact</Link>
        </nav>
        <p className="mt-4">© {new Date().getFullYear()} Workizen. All rights reserved.</p>
      </footer>
    </main>
  );
}
