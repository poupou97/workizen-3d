import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Contact — Workizen",
  description: "How to reach the Workizen team for support, privacy, and general inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <LegalLayout title="Contact Us">
      <p>
        We&rsquo;d like to hear from you. Workizen is a software product operated by the
        Workizen team. Please use the appropriate address below and we will respond as soon
        as we can.
      </p>
      <div className="mt-2 grid gap-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">General</p>
          <a className="font-semibold text-blue-700 hover:text-blue-900" href="mailto:hello@workizen.net">
            hello@workizen.net
          </a>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Privacy</p>
          <a className="font-semibold text-blue-700 hover:text-blue-900" href="mailto:privacy@workizen.net">
            privacy@workizen.net
          </a>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Security</p>
          <a className="font-semibold text-blue-700 hover:text-blue-900" href="mailto:security@workizen.net">
            security@workizen.net
          </a>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500">
        Workizen operates online. A registered business mailing address will be published here
        as the company is formally incorporated.
      </p>
    </LegalLayout>
  );
}
