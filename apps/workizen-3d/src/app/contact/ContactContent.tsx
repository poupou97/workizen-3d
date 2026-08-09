"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LOCALES, STRINGS, resolveLocale, type Locale } from "./contact-strings";

/**
 * MỘT địa chỉ duy nhất, và nó phải là hộp thư THẬT.
 *
 * Trước đây trang này liệt kê `hello@` / `privacy@` / `security@ workizen.net`
 * — những địa chỉ chưa từng nhận thư. Người duyệt của Apple hoặc Google gửi vào
 * đó sẽ nhận thư trả lại, và một trang hỗ trợ có email chết là lý do từ chối
 * chắc chắn hơn cả việc không có trang hỗ trợ.
 *
 * Nếu đổi địa chỉ này, phải đổi cả trên App Store Connect và Play Console.
 */
const EMAIL = "workizen.labs@gmail.com";

export function ContactContent() {
  // Luôn dựng lần đầu bằng tiếng Anh để HTML của server khớp với client
  // (đoán theo trình duyệt ngay từ đầu sẽ gây hydration mismatch).
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(resolveLocale(navigator.language));
  }, []);

  const t = STRINGS[locale];

  return (
    <div dir={t.rtl ? "rtl" : "ltr"}>
      <div className="mb-6 flex items-center gap-2" dir="ltr">
        <label
          htmlFor="contact-lang"
          className="text-xs font-bold uppercase tracking-wide text-slate-500"
        >
          Language
        </label>
        <select
          id="contact-lang"
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm font-semibold text-slate-700"
        >
          {LOCALES.map((code) => (
            <option key={code} value={code}>
              {STRINGS[code].label}
            </option>
          ))}
        </select>
      </div>

      <h2 className="mb-4 text-2xl font-black text-slate-950">{t.title}</h2>

      <p>{t.intro}</p>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4">
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">
          {t.emailLabel}
        </p>
        <a
          className="text-lg font-bold text-blue-700 hover:text-blue-900"
          href={`mailto:${EMAIL}`}
          dir="ltr"
        >
          {EMAIL}
        </a>
        <p className="mt-2 text-sm text-slate-500">{t.responseTime}</p>
      </div>

      <ul className="mt-5 space-y-3">
        {[
          [t.supportLabel, t.supportHint],
          [t.privacyLabel, t.privacyHint],
          [t.securityLabel, t.securityHint],
        ].map(([label, hint]) => (
          <li key={label} className="text-[15px] leading-6">
            <span className="font-bold text-slate-900">{label}</span>
            <span className="text-slate-400"> — </span>
            <span className="text-slate-600">{hint}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6">
        <Link href="/privacy" className="font-semibold text-blue-700 hover:text-blue-900">
          {t.privacyLink}
        </Link>
      </p>

      <p className="mt-6 text-sm text-slate-500">{t.company}</p>
    </div>
  );
}
