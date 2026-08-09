import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Chính sách quyền riêng tư — Tổng Tài | Privacy Policy",
  description:
    "Privacy Policy for the Tổng Tài mobile app (com.workizen.tongtai): local-first business data, BYOK AI, operational telemetry only, no ads or profiling.",
  alternates: { canonical: "/privacy/tongtai" },
};

/**
 * Privacy Policy for the **Tổng Tài** mobile app (`com.workizen.tongtai`).
 *
 * Deliberately separate from `/privacy`, which covers workizen.net and the
 * Workizen Hub app. The two apps behave differently in ways a privacy policy
 * must not blur: Tổng Tài has **no account at all**, and it **does** send
 * Firebase Analytics + Crashlytics events that the Hub policy never mentions.
 * Pointing Play Console at a policy that understates collection is the one
 * direction of error that actually gets enforced.
 *
 * Source of truth: `workizen-tongtai-mobile/docs/05-OPERATIONS/PRIVACY-POLICY.md`
 * (WTM-37) — every sentence there is checked against real code behaviour, and a
 * test forbids the phrase "we don't collect data".
 */
export default function TongtaiPrivacyPage() {
  return (
    <LegalLayout
      title="Chính sách quyền riêng tư — Tổng Tài"
      updated="7 tháng 8, 2026"
    >
      <p className="rounded-lg bg-slate-100 p-4 text-sm text-slate-700">
        <strong>Scope / Phạm vi.</strong> This policy covers the{" "}
        <strong>Tổng Tài</strong> mobile app (<code>com.workizen.tongtai</code>)
        only. The Workizen website and the Workizen Hub app are covered by the{" "}
        <a href="/privacy" className="font-semibold text-blue-700 underline">
          general Workizen Privacy Policy
        </a>
        . Tổng Tài has <strong>no user account</strong> and stores business data{" "}
        <strong>on the device</strong>.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">
        1. Dữ liệu kinh doanh của bạn nằm trên máy bạn
      </h2>
      <p>
        Khách hàng, sản phẩm, đơn hàng, mục tiêu, giao dịch — tất cả lưu trong
        một cơ sở dữ liệu SQLite <strong>trên thiết bị</strong>. Không có tài
        khoản, không có máy chủ Tổng Tài, không có đồng bộ. Chúng tôi{" "}
        <strong>không nhận được</strong> dữ liệu kinh doanh của bạn.
      </p>
      <p className="text-sm italic text-slate-600">
        Your customers, products, orders, goals and transactions live in an
        SQLite database <strong>on your device</strong>. There is no account, no
        Tổng Tài server and no sync. We never receive your business data.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">
        2. Workizen AI dùng khoá của chính bạn (BYOK)
      </h2>
      <p>
        Khi bạn hỏi Workizen AI, <strong>nội dung câu hỏi đó</strong> được gửi{" "}
        <strong>thẳng từ máy bạn</strong> tới nhà cung cấp AI mà bạn đã chọn
        (Gemini · xAI · Claude · OpenRouter · Cerebras), kèm khoá API của{" "}
        <strong>bạn</strong> trong header <code>Authorization</code>. Chúng tôi{" "}
        <strong>không trung chuyển, không sao chép, không thấy</strong> nội dung
        đó.
      </p>
      <p>
        Chính sách của nhà cung cấp đó áp dụng cho phần dữ liệu họ nhận — hãy đọc
        chính sách của họ. Nếu bạn dùng chế độ <strong>Local (Ollama)</strong>,
        không có gì rời khỏi máy. Khoá API lưu trong kho bảo mật của hệ điều hành
        (Android Keystore), <strong>không</strong> nằm trong cơ sở dữ liệu và{" "}
        <strong>không</strong> nằm trong bản sao lưu.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">
        3. Số liệu vận hành mà chúng tôi có nhận
      </h2>
      <p>
        Đây là phần <strong>duy nhất</strong> rời khỏi máy về phía chúng tôi, và
        nó là số liệu vận hành — <strong>không bao giờ</strong> là nội dung kinh
        doanh:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <code>app_open</code> — <em>không kèm tham số nào</em>, mỗi lần mở app.
        </li>
        <li>
          <code>screen_error</code> — <code>screen</code> (tên màn),{" "}
          <code>kind</code> (loại lỗi), <code>code</code> (mã cố định), khi một
          màn không đọc/ghi được dữ liệu.
        </li>
      </ul>
      <p>
        <strong>Không</strong> có tên khách hàng, số tiền, số lượng bản ghi, tên
        file hay đường dẫn trong bất kỳ sự kiện nào. Mô tả lỗi chi tiết chỉ hiển
        thị <strong>trên máy bạn</strong> và không bao giờ được gửi đi.
      </p>
      <p className="text-sm italic text-slate-600">
        This is the only thing that reaches us, and it is operational only —
        never business content. No customer names, amounts, record counts, file
        names or paths appear in any event.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">
        4. Báo cáo sự cố
      </h2>
      <p>
        Khi app gặp sự cố, <strong>Firebase Crashlytics</strong> nhận{" "}
        <strong>stack trace</strong>, model máy và phiên bản hệ điều hành — để
        chúng tôi sửa lỗi. Đối tượng lỗi của Tổng Tài được thiết kế để{" "}
        <code>toString()</code> <strong>cố ý bỏ</strong> phần mô tả chi tiết, nên
        một báo cáo sự cố có thể gọi tên loại lỗi mà <strong>không</strong> mang
        theo giá trị của một dòng dữ liệu, tên khách hàng hay con số doanh thu.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">
        5. Không quảng cáo, không hồ sơ người dùng — và điều đó kiểm chứng được
      </h2>
      <p>
        Không có SDK quảng cáo, không theo dõi tiếp thị, không lập hồ sơ, không
        quảng cáo cá nhân hoá. Quyền <strong>Advertising ID</strong> và ba quyền
        Ad Services của Android bị <strong>gỡ khỏi manifest</strong> bằng{" "}
        <code>tools:node=&quot;remove&quot;</code> — app đã phát hành không xin
        chúng, và điều này đọc được trong <code>AndroidManifest.xml</code>.
      </p>
      <p>
        Quyền duy nhất app xin là <strong>INTERNET</strong> (để gọi nhà cung cấp
        AI bạn chọn) và <strong>CAMERA</strong> (chỉ khi bạn quét mã QR để nhập
        khoá API).
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">
        6. Sao lưu (.ttbk)
      </h2>
      <p>
        Bản sao lưu được tạo <strong>trên máy bạn</strong> và chỉ rời khỏi máy
        nếu <strong>bạn</strong> chủ động chia sẻ nó. Bạn có thể đặt mật khẩu
        (AES-GCM). Mỗi bản sao lưu có SHA-256 để phát hiện file hỏng —{" "}
        <strong>đó là chống hỏng, không phải chống giả mạo</strong>: ai sửa nội
        dung cũng tính lại được hash. Chỉ bản <strong>có mật khẩu</strong> mới
        chứng thực được nguồn gốc.
      </p>
      <p>
        Bản sao lưu chứa dữ liệu kinh doanh của bạn. <strong>Không</strong> chứa
        khoá API.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">7. Dữ liệu mẫu</h2>
      <p>
        &ldquo;Xem thử Demo&rdquo; ghi dữ liệu mẫu vào <strong>chính</strong> kho
        dữ liệu thật, với tiền tố <code>sample-</code>, và &ldquo;Xóa dữ liệu
        mẫu&rdquo; gỡ đúng những bản ghi đó. Dữ liệu bạn tự nhập{" "}
        <strong>không bao giờ</strong> bị xoá bởi thao tác này.
      </p>

      <h2 id="xoa-du-lieu" className="pt-3 text-xl font-bold text-slate-900">
        8. Quyền của bạn &amp; cách xoá dữ liệu
      </h2>
      <p className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4">
        <strong>Yêu cầu xoá dữ liệu — Tổng Tài (com.workizen.tongtai).</strong>{" "}
        Vì dữ liệu kinh doanh nằm trên máy bạn và app không có tài khoản, bạn tự
        xoá được ngay, không cần chờ ai duyệt.
      </p>
      <h3 className="pt-2 text-base font-bold text-slate-900">
        Cách 1 — Xoá toàn bộ dữ liệu kinh doanh (tức thì)
      </h3>
      <ol className="list-decimal space-y-2 pl-6">
        <li>Gỡ cài đặt ứng dụng Tổng Tài khỏi điện thoại.</li>
        <li>
          Toàn bộ khách hàng, sản phẩm, đơn hàng, mục tiêu và giao dịch bị xoá
          cùng lúc — chúng chỉ tồn tại trong bộ nhớ ứng dụng, không có bản sao
          trên máy chủ nào.
        </li>
      </ol>
      <h3 className="pt-2 text-base font-bold text-slate-900">
        Cách 2 — Xoá dữ liệu chẩn đoán và báo cáo sự cố
      </h3>
      <ol className="list-decimal space-y-2 pl-6">
        <li>
          Gửi email tới{" "}
          <a
            href="mailto:workizen.labs@gmail.com?subject=Yeu%20cau%20xoa%20du%20lieu%20-%20Tong%20Tai"
            className="font-semibold text-blue-700 underline"
          >
            workizen.labs@gmail.com
          </a>{" "}
          với tiêu đề &ldquo;Yêu cầu xoá dữ liệu — Tổng Tài&rdquo;.
        </li>
        <li>Chúng tôi xử lý trong vòng 30 ngày và trả lời bằng email.</li>
      </ol>
      <h3 className="pt-2 text-base font-bold text-slate-900">
        Loại dữ liệu nào bị xoá, loại nào được giữ
      </h3>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Xoá ngay khi gỡ app:</strong> toàn bộ dữ liệu kinh doanh, khoá
          API, lịch sử trò chuyện, cài đặt. Không có bản sao ở nơi khác.
        </li>
        <li>
          <strong>Báo cáo sự cố (Crashlytics):</strong> Google tự động xoá sau{" "}
          <strong>90 ngày</strong>.
        </li>
        <li>
          <strong>Sự kiện chẩn đoán</strong> (<code>app_open</code>,{" "}
          <code>screen_error</code>): ẩn danh, <strong>không gắn</strong> với
          danh tính hay thiết bị nào của bạn, nên không thể truy ngược về một
          người dùng cụ thể.
        </li>
        <li>
          <strong>Không có gì được giữ lại</strong> sau khi bạn gỡ app — chúng
          tôi không có tài khoản, hồ sơ hay bản sao dữ liệu kinh doanh của bạn.
        </li>
      </ul>
      <p>
        Muốn giữ dữ liệu trước khi xoá: dùng <strong>Xuất sao lưu</strong> trong
        app để tạo file <code>.ttbk</code> mang sang máy khác.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">9. Trẻ em</h2>
      <p>
        Tổng Tài là công cụ quản lý kinh doanh, không hướng tới trẻ em và không
        chủ động thu thập dữ liệu của trẻ em.
      </p>

      <h2 className="pt-3 text-xl font-bold text-slate-900">
        10. Thay đổi &amp; liên hệ
      </h2>
      <p>
        Chính sách này thay đổi khi hành vi của app thay đổi —{" "}
        <strong>không thay đổi trước</strong>. Ngày cập nhật ở đầu trang.
      </p>
      <p>
        <strong>Liên hệ / Contact:</strong>{" "}
        <a
          href="mailto:workizen.labs@gmail.com"
          className="font-semibold text-blue-700 underline"
        >
          workizen.labs@gmail.com
        </a>
      </p>
    </LegalLayout>
  );
}
