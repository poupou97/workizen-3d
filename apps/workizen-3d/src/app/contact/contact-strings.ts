/**
 * Bộ chữ trang liên hệ, 14 ngôn ngữ.
 *
 * ## Vì sao đa ngôn ngữ
 *
 * App Store bắt **mỗi locale** khai Support URL riêng. Cả 14 bản đều trỏ về
 * trang này. Người duyệt của Apple mở trang bằng ngôn ngữ của locale họ đang
 * xét — thấy toàn tiếng Anh thì đó là cái cớ có sẵn để bắt bẻ.
 *
 * ## Vì sao KHÔNG dùng thư viện i18n
 *
 * Site này không có hạ tầng i18n, và thêm `next-intl` chỉ vì một trang tĩnh là
 * kéo cả routing `[locale]`, middleware, sitemap vào. Trang liên hệ có đúng
 * bảy câu — một từ điển và một ô chọn là đủ, không thêm phụ thuộc nào.
 *
 * Ngôn ngữ khớp với 14 locale đã khai trên App Store và Google Play.
 */

export type Strings = {
  /** Tên ngôn ngữ VIẾT BẰNG CHÍNH NÓ — người không đọc được tiếng Anh vẫn tìm ra dòng của mình. */
  label: string;
  rtl?: boolean;
  title: string;
  intro: string;
  emailLabel: string;
  supportLabel: string;
  supportHint: string;
  privacyLabel: string;
  privacyHint: string;
  securityLabel: string;
  securityHint: string;
  responseTime: string;
  privacyLink: string;
  company: string;
};

export const LOCALES = [
  "en", "vi", "zh-Hans", "zh-Hant", "ja", "ko",
  "de", "fr", "es", "pt", "ru", "ar", "hi", "id",
] as const;

export type Locale = (typeof LOCALES)[number];

export const STRINGS: Record<Locale, Strings> = {
  en: {
    label: "English",
    title: "Contact & Support",
    intro:
      "Need help with Workizen, or want to reach us about anything else? Write to us — one address for everything, and a real person reads every message.",
    emailLabel: "Email us",
    supportLabel: "App support",
    supportHint: "Questions, problems, feature requests, billing.",
    privacyLabel: "Privacy",
    privacyHint: "Data questions, or asking us to delete your data.",
    securityLabel: "Security",
    securityHint: "Report a vulnerability. We take these seriously.",
    responseTime: "We normally reply within 2 business days.",
    privacyLink: "Read our Privacy Policy",
    company:
      "Workizen is an independent software product. We operate online and support is handled by email.",
  },

  vi: {
    label: "Tiếng Việt",
    title: "Liên hệ & Hỗ trợ",
    intro:
      "Bạn cần trợ giúp với Workizen, hay muốn liên hệ về việc khác? Hãy gửi thư cho chúng tôi — một địa chỉ cho mọi việc, và có người thật đọc từng thư.",
    emailLabel: "Gửi email cho chúng tôi",
    supportLabel: "Hỗ trợ ứng dụng",
    supportHint: "Thắc mắc, lỗi, đề xuất tính năng, thanh toán.",
    privacyLabel: "Quyền riêng tư",
    privacyHint: "Hỏi về dữ liệu, hoặc yêu cầu chúng tôi xoá dữ liệu của bạn.",
    securityLabel: "Bảo mật",
    securityHint: "Báo lỗ hổng bảo mật. Chúng tôi xử lý nghiêm túc.",
    responseTime: "Chúng tôi thường trả lời trong vòng 2 ngày làm việc.",
    privacyLink: "Đọc Chính sách quyền riêng tư",
    company:
      "Workizen là một sản phẩm phần mềm độc lập. Chúng tôi hoạt động trực tuyến và hỗ trợ qua email.",
  },

  "zh-Hans": {
    label: "简体中文",
    title: "联系与支持",
    intro:
      "使用 Workizen 遇到问题，或想因其他事情联系我们？请写信给我们 —— 所有事情都用同一个邮箱，每一封都有真人阅读。",
    emailLabel: "给我们发邮件",
    supportLabel: "应用支持",
    supportHint: "疑问、故障、功能建议、付费问题。",
    privacyLabel: "隐私",
    privacyHint: "数据相关问题，或要求我们删除你的数据。",
    securityLabel: "安全",
    securityHint: "报告安全漏洞。我们会认真对待。",
    responseTime: "我们通常在 2 个工作日内回复。",
    privacyLink: "阅读隐私政策",
    company: "Workizen 是一款独立软件产品。我们在线运营，支持通过电子邮件提供。",
  },

  "zh-Hant": {
    label: "繁體中文",
    title: "聯絡與支援",
    intro:
      "使用 Workizen 遇到問題，或想因其他事情聯絡我們？請寫信給我們 —— 所有事情都用同一個信箱，每一封都有真人閱讀。",
    emailLabel: "寄信給我們",
    supportLabel: "應用程式支援",
    supportHint: "疑問、故障、功能建議、付費問題。",
    privacyLabel: "隱私",
    privacyHint: "資料相關問題，或要求我們刪除你的資料。",
    securityLabel: "安全",
    securityHint: "回報安全漏洞。我們會認真處理。",
    responseTime: "我們通常在 2 個工作天內回覆。",
    privacyLink: "閱讀隱私權政策",
    company: "Workizen 是一款獨立軟體產品。我們線上營運，支援透過電子郵件提供。",
  },

  ja: {
    label: "日本語",
    title: "お問い合わせ・サポート",
    intro:
      "Workizen でお困りですか。その他のご用件でも構いません。ご連絡先は一つだけです。すべて担当者が目を通します。",
    emailLabel: "メールでのご連絡",
    supportLabel: "アプリのサポート",
    supportHint: "ご質問、不具合、機能のご要望、お支払いについて。",
    privacyLabel: "プライバシー",
    privacyHint: "データに関するご質問、またはデータ削除のご依頼。",
    securityLabel: "セキュリティ",
    securityHint: "脆弱性のご報告。真摯に対応します。",
    responseTime: "通常、2 営業日以内にご返信します。",
    privacyLink: "プライバシーポリシーを読む",
    company:
      "Workizen は独立したソフトウェア製品です。オンラインで運営し、サポートはメールで承ります。",
  },

  ko: {
    label: "한국어",
    title: "문의 및 지원",
    intro:
      "Workizen 사용 중 도움이 필요하시거나 다른 용건이 있으신가요? 아래 주소로 보내주세요. 모든 용건을 하나의 주소로 받으며, 사람이 직접 읽습니다.",
    emailLabel: "이메일로 문의하기",
    supportLabel: "앱 지원",
    supportHint: "문의, 오류, 기능 제안, 결제 관련.",
    privacyLabel: "개인정보",
    privacyHint: "데이터 관련 문의 또는 데이터 삭제 요청.",
    securityLabel: "보안",
    securityHint: "취약점 제보. 진지하게 처리합니다.",
    responseTime: "보통 영업일 기준 2일 이내에 답변드립니다.",
    privacyLink: "개인정보 처리방침 보기",
    company:
      "Workizen은 독립 소프트웨어 제품입니다. 온라인으로 운영하며 지원은 이메일로 제공합니다.",
  },

  de: {
    label: "Deutsch",
    title: "Kontakt & Support",
    intro:
      "Brauchst du Hilfe mit Workizen oder möchtest du uns aus einem anderen Grund erreichen? Schreib uns — eine Adresse für alles, und jede Nachricht wird von einem Menschen gelesen.",
    emailLabel: "Schreib uns",
    supportLabel: "App-Support",
    supportHint: "Fragen, Probleme, Funktionswünsche, Abrechnung.",
    privacyLabel: "Datenschutz",
    privacyHint: "Fragen zu Daten oder Löschung deiner Daten.",
    securityLabel: "Sicherheit",
    securityHint: "Sicherheitslücken melden. Wir nehmen das ernst.",
    responseTime: "Wir antworten in der Regel innerhalb von 2 Werktagen.",
    privacyLink: "Datenschutzerklärung lesen",
    company:
      "Workizen ist ein unabhängiges Softwareprodukt. Wir arbeiten online, der Support läuft per E-Mail.",
  },

  fr: {
    label: "Français",
    title: "Contact et assistance",
    intro:
      "Besoin d'aide avec Workizen, ou envie de nous joindre pour autre chose ? Écrivez-nous — une seule adresse pour tout, et une vraie personne lit chaque message.",
    emailLabel: "Écrivez-nous",
    supportLabel: "Assistance",
    supportHint: "Questions, problèmes, suggestions, facturation.",
    privacyLabel: "Confidentialité",
    privacyHint: "Questions sur vos données, ou demande de suppression.",
    securityLabel: "Sécurité",
    securityHint: "Signaler une faille. Nous les traitons sérieusement.",
    responseTime: "Nous répondons généralement sous 2 jours ouvrés.",
    privacyLink: "Lire la politique de confidentialité",
    company:
      "Workizen est un produit logiciel indépendant. Nous opérons en ligne et l'assistance se fait par e-mail.",
  },

  es: {
    label: "Español",
    title: "Contacto y soporte",
    intro:
      "¿Necesitas ayuda con Workizen o quieres escribirnos por otra cosa? Escríbenos: una sola dirección para todo, y una persona real lee cada mensaje.",
    emailLabel: "Escríbenos",
    supportLabel: "Soporte de la app",
    supportHint: "Dudas, fallos, sugerencias, facturación.",
    privacyLabel: "Privacidad",
    privacyHint: "Preguntas sobre tus datos o solicitud de borrado.",
    securityLabel: "Seguridad",
    securityHint: "Informar de una vulnerabilidad. Nos las tomamos en serio.",
    responseTime: "Solemos responder en un plazo de 2 días laborables.",
    privacyLink: "Leer la política de privacidad",
    company:
      "Workizen es un producto de software independiente. Operamos en línea y el soporte es por correo.",
  },

  pt: {
    label: "Português",
    title: "Contato e suporte",
    intro:
      "Precisa de ajuda com o Workizen ou quer falar com a gente sobre outra coisa? Escreva para nós — um único endereço para tudo, e uma pessoa de verdade lê cada mensagem.",
    emailLabel: "Escreva para nós",
    supportLabel: "Suporte do app",
    supportHint: "Dúvidas, problemas, sugestões, cobrança.",
    privacyLabel: "Privacidade",
    privacyHint: "Dúvidas sobre seus dados ou pedido de exclusão.",
    securityLabel: "Segurança",
    securityHint: "Relatar uma vulnerabilidade. Levamos isso a sério.",
    responseTime: "Normalmente respondemos em até 2 dias úteis.",
    privacyLink: "Ler a Política de Privacidade",
    company:
      "O Workizen é um produto de software independente. Operamos online e o suporte é por e-mail.",
  },

  ru: {
    label: "Русский",
    title: "Контакты и поддержка",
    intro:
      "Нужна помощь с Workizen или хотите написать по другому поводу? Напишите нам — один адрес для всего, и каждое письмо читает живой человек.",
    emailLabel: "Напишите нам",
    supportLabel: "Поддержка приложения",
    supportHint: "Вопросы, сбои, пожелания, оплата.",
    privacyLabel: "Приватность",
    privacyHint: "Вопросы о данных или запрос на их удаление.",
    securityLabel: "Безопасность",
    securityHint: "Сообщить об уязвимости. Относимся к этому серьёзно.",
    responseTime: "Обычно отвечаем в течение 2 рабочих дней.",
    privacyLink: "Политика конфиденциальности",
    company:
      "Workizen — независимый программный продукт. Мы работаем онлайн, поддержка — по электронной почте.",
  },

  ar: {
    label: "العربية",
    rtl: true,
    title: "التواصل والدعم",
    intro:
      "هل تحتاج مساعدة في Workizen، أو تودّ مراسلتنا لأمر آخر؟ راسلنا — عنوان واحد لكل شيء، وكل رسالة يقرأها شخص حقيقي.",
    emailLabel: "راسلنا",
    supportLabel: "دعم التطبيق",
    supportHint: "الأسئلة والأعطال واقتراح الميزات والفوترة.",
    privacyLabel: "الخصوصية",
    privacyHint: "أسئلة عن بياناتك، أو طلب حذفها.",
    securityLabel: "الأمان",
    securityHint: "الإبلاغ عن ثغرة أمنية. نتعامل معها بجدية.",
    responseTime: "نردّ عادةً خلال يومَي عمل.",
    privacyLink: "اقرأ سياسة الخصوصية",
    company:
      "Workizen منتج برمجي مستقل. نعمل عبر الإنترنت والدعم يتم عبر البريد الإلكتروني.",
  },

  hi: {
    label: "हिन्दी",
    title: "संपर्क और सहायता",
    intro:
      "Workizen में मदद चाहिए, या किसी और वजह से लिखना है? हमें लिखिए — हर बात के लिए एक ही पता, और हर संदेश को एक असली इंसान पढ़ता है।",
    emailLabel: "हमें ईमेल करें",
    supportLabel: "ऐप सहायता",
    supportHint: "सवाल, गड़बड़ी, नई सुविधा के सुझाव, भुगतान।",
    privacyLabel: "निजता",
    privacyHint: "डेटा से जुड़े सवाल, या डेटा हटाने का अनुरोध।",
    securityLabel: "सुरक्षा",
    securityHint: "सुरक्षा खामी की रिपोर्ट करें। हम इसे गंभीरता से लेते हैं।",
    responseTime: "हम आम तौर पर 2 कार्यदिवसों में जवाब देते हैं।",
    privacyLink: "निजता नीति पढ़ें",
    company:
      "Workizen एक स्वतंत्र सॉफ़्टवेयर उत्पाद है। हम ऑनलाइन काम करते हैं और सहायता ईमेल से मिलती है।",
  },

  id: {
    label: "Bahasa Indonesia",
    title: "Kontak & Dukungan",
    intro:
      "Butuh bantuan soal Workizen, atau mau menghubungi kami untuk hal lain? Kirim email ke kami — satu alamat untuk semua, dan setiap pesan dibaca orang sungguhan.",
    emailLabel: "Kirim email ke kami",
    supportLabel: "Dukungan aplikasi",
    supportHint: "Pertanyaan, kendala, usulan fitur, pembayaran.",
    privacyLabel: "Privasi",
    privacyHint: "Pertanyaan soal data, atau permintaan penghapusan data.",
    securityLabel: "Keamanan",
    securityHint: "Laporkan celah keamanan. Kami menanganinya serius.",
    responseTime: "Kami biasanya membalas dalam 2 hari kerja.",
    privacyLink: "Baca Kebijakan Privasi",
    company:
      "Workizen adalah produk perangkat lunak independen. Kami beroperasi daring dan dukungan lewat email.",
  },
};

/** Ánh xạ mã ngôn ngữ của trình duyệt (`navigator.language`) về locale ta có. */
export function resolveLocale(raw: string | undefined): Locale {
  if (!raw) return "en";
  const tag = raw.toLowerCase();

  // Tiếng Trung phải xét trước: `zh-TW`/`zh-HK`/`zh-Hant` là phồn thể, còn lại giản thể.
  if (tag.startsWith("zh")) {
    return /hant|tw|hk|mo/.test(tag) ? "zh-Hant" : "zh-Hans";
  }
  const base = tag.split("-")[0];
  return (LOCALES as readonly string[]).includes(base) ? (base as Locale) : "en";
}
