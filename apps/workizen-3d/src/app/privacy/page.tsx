import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Workizen",
  description: "How Workizen collects, uses, and protects information on workizen.net.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="July 9, 2026">
      <p>
        This Privacy Policy explains how Workizen (&ldquo;Workizen,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us&rdquo;) handles information in connection with the workizen.net website and
        related preview products (the &ldquo;Services&rdquo;). This is an initial policy for a
        product in active development and will be updated as features mature.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">
        AI features and third-party AI providers (Workizen Hub app)
      </h2>
      <p>
        The Workizen Hub mobile app is <strong>BYOK (bring your own key)</strong> and has{" "}
        <strong>no Workizen server of its own</strong>. When you use an AI feature, the content
        you choose to process — your message, text extracted from a document, or an image you
        select — is sent <strong>directly from your device</strong> to the third-party AI
        provider you have connected (for example Google Gemini, OpenAI, Anthropic, OpenRouter,
        Cerebras, or a local/LAN model), authenticated with <strong>your own API key</strong>.
        Workizen does not receive, store, or proxy this content.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li><strong>What is sent</strong> — only the specific content you choose to process for that request (a message, document text, or a selected image).</li>
        <li><strong>Who it is sent to</strong> — the AI provider you selected and configured with your own key. Each provider processes your content under <strong>its own privacy policy and terms</strong>; please review the policy of the provider(s) you use.</li>
        <li><strong>Your permission</strong> — the app asks for your explicit consent before any content is sent to a provider. You can decline and continue using the app fully offline (scanning, on-device OCR, and PDF export never leave your device).</li>
        <li><strong>Your API key</strong> — stored only in your device&rsquo;s secure storage; it leaves the device only inside the authorization header of a direct request to your chosen provider, never to Workizen.</li>
      </ul>

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
        <a className="font-semibold text-blue-700 hover:text-blue-900" href="mailto:workizen.labs@gmail.com">
          workizen.labs@gmail.com
        </a>
        .
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <a className="font-semibold text-blue-700 hover:text-blue-900" href="mailto:workizen.labs@gmail.com">
          workizen.labs@gmail.com
        </a>
        .
      </p>
    </LegalLayout>
  );
}
