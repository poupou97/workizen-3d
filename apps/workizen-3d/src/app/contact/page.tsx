import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact & Support — Workizen",
  description:
    "How to reach the Workizen team for app support, privacy requests, and security reports. Available in 14 languages.",
  alternates: { canonical: "/contact" },
};

/**
 * Trang hỗ trợ — địa chỉ này được khai làm **Support URL** cho cả 14 locale
 * trên App Store và Google Play. Nội dung nằm ở `ContactContent` (client) vì
 * nó tự chọn ngôn ngữ theo trình duyệt; phần vỏ giữ nguyên server component
 * để metadata vẫn được render tĩnh và crawl được.
 */
export default function ContactPage() {
  return (
    <LegalLayout title="Contact">
      <ContactContent />
    </LegalLayout>
  );
}
