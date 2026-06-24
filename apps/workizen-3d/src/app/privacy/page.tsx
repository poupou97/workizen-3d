import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Workizen",
  description: "How Workizen collects, uses, and protects information on workizen.net.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="June 18, 2026">
      <p>
        This Privacy Policy explains how Workizen (&ldquo;Workizen,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us&rdquo;) handles information in connection with the workizen.net website and
        related preview products (the &ldquo;Services&rdquo;). This is an initial policy for a
        product in active development and will be updated as features mature.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">Information we collect</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li><strong>Account &amp; authentication data</strong> — if you sign in via our identity service, we process identifiers such as your email and authentication tokens to operate the login.</li>
        <li><strong>Usage data</strong> — basic technical logs (IP address, browser type, pages requested) used to operate, secure, and improve the Services.</li>
        <li><strong>Content you provide</strong> — messages or inputs you submit to interactive features.</li>
      </ul>

      <h2 className="pt-3 text-xl font-bold text-slate-900">How we use information</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>To provide, maintain, and secure the Services.</li>
        <li>To authenticate users and prevent abuse or fraud.</li>
        <li>To diagnose problems and improve performance and features.</li>
      </ul>

      <h2 className="pt-3 text-xl font-bold text-slate-900">Sharing</h2>
      <p>
        We do not sell personal information. We share information only with service providers
        that help us operate the Services (such as hosting and authentication infrastructure),
        or where required by law.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">Data retention &amp; security</h2>
      <p>
        We retain information only as long as needed to operate the Services and meet legal
        obligations, and we apply reasonable technical and organizational safeguards to protect
        it. Authentication is handled by our dedicated identity service.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">Your rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, or delete your
        personal information. To make a request, contact{" "}
        <a className="font-semibold text-blue-700 hover:text-blue-900" href="mailto:privacy@workizen.net">
          privacy@workizen.net
        </a>
        .
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <a className="font-semibold text-blue-700 hover:text-blue-900" href="mailto:privacy@workizen.net">
          privacy@workizen.net
        </a>
        .
      </p>
    </LegalLayout>
  );
}
