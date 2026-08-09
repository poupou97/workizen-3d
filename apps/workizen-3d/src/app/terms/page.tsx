import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service — Workizen",
  description: "The terms that govern your use of workizen.net and related Workizen services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="June 18, 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the
        workizen.net website and related preview products (the &ldquo;Services&rdquo;) provided
        by Workizen (&ldquo;Workizen,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By using the
        Services you agree to these Terms. The Services are in active development and are
        offered on a preview basis.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">Use of the Services</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>You must use the Services lawfully and not attempt to disrupt, probe, or gain unauthorized access to our systems or other users&rsquo; data.</li>
        <li>You are responsible for any activity under your account and for keeping your credentials secure.</li>
        <li>We may modify, suspend, or discontinue any part of the Services at any time during this preview phase.</li>
      </ul>

      <h2 className="pt-3 text-xl font-bold text-slate-900">Accounts &amp; authentication</h2>
      <p>
        Some features require signing in through our identity service. You agree to provide
        accurate information and to comply with any additional product-specific rules presented
        at sign-up.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">Intellectual property</h2>
      <p>
        The Services, including software, designs, and content provided by Workizen, are owned
        by Workizen or its licensors and are protected by applicable laws. You retain rights to
        content you submit.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">Disclaimers &amp; limitation of liability</h2>
      <p>
        The Services are provided &ldquo;as is&rdquo; without warranties of any kind. To the
        maximum extent permitted by law, Workizen is not liable for indirect or consequential
        damages arising from your use of the preview Services.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">Changes</h2>
      <p>
        We may update these Terms as the product evolves. Continued use after changes take
        effect constitutes acceptance of the updated Terms.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">Contact</h2>
      <p>
        Questions about these Terms can be sent to{" "}
        <a className="font-semibold text-blue-700 hover:text-blue-900" href="mailto:workizen.labs@gmail.com">
          workizen.labs@gmail.com
        </a>
        .
      </p>
    </LegalLayout>
  );
}
