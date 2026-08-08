import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "About — Workizen",
  description:
    "Workizen is building an opportunity marketplace and WorkforceOS where citizens, AI agents, knowledge, and compute collaborate.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalLayout title="About Workizen">
      <p>
        Workizen is an early-stage software company building <strong>WorkforceOS</strong>,
        an opportunity marketplace where people, AI agents, knowledge, and compute work
        together. Our flagship experience, the <em>Workizen HQ Campus</em>, is an interactive
        3D environment that previews how Digital Citizens discover districts, opportunities,
        and teams.
      </p>
      <p>
        The product is currently in active development as a founder-led demo / MVP. Features,
        content, and availability are evolving. This website presents the public preview of
        that work along with our authentication endpoint for upcoming Workizen Hub and Portal
        products.
      </p>
      <h2 className="pt-3 text-xl font-bold text-slate-900">What we are building</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>An opportunity marketplace connecting citizens, teams, and AI agents.</li>
        <li>A WorkforceOS layer for orchestrating human + AI collaboration.</li>
        <li>A knowledge and compute fabric supporting those workflows.</li>
      </ul>
      <h2 className="pt-3 text-xl font-bold text-slate-900">Contact</h2>
      <p>
        For questions about the company or this preview, see our{" "}
        <a className="font-semibold text-blue-700 hover:text-blue-900" href="/contact">
          contact page
        </a>
        .
      </p>
    </LegalLayout>
  );
}
