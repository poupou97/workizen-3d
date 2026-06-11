"use client";

export type GuideExpression =
  | "idle"
  | "happy"
  | "thinking"
  | "excited"
  | "talking"
  | "waving"
  | "winking";

export type GuideAnimation =
  | "idle"
  | "waving"
  | "thinking"
  | "excited"
  | "talking"
  | "none";

interface Props {
  size?: number;
  expression?: GuideExpression;
  animation?: GuideAnimation;
  className?: string;
}

export function WorkizenGuideAvatar({
  size = 80,
  expression = "happy",
  animation = "idle",
  className = "",
}: Props) {
  const animClass = animation !== "none" ? `guide-anim-${animation}` : "";
  return (
    <div
      className={["inline-block", animClass, className].filter(Boolean).join(" ")}
      style={{ width: size, height: size, lineHeight: 0 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <Background />
        <HairAndBody />
        <Helmet />
        <Face expression={expression} />
      </svg>
    </div>
  );
}

/* ─────────────────────────── Background ───────────────────────────── */

function Background() {
  return (
    <>
      {/* Outer ring */}
      <circle cx="80" cy="80" r="79" fill="#0c1a50" />
      {/* Inner glow */}
      <circle cx="80" cy="80" r="76" fill="#0f2060" />
      {/* Radial center highlight */}
      <circle cx="80" cy="80" r="74" fill="#111e5c" />
    </>
  );
}

/* ─────────────────────────── Hair & Body ───────────────────────────── */

function HairAndBody() {
  return (
    <>
      {/* Back hair (dark navy, behind everything) */}
      <ellipse cx="80" cy="152" rx="44" ry="20" fill="#15215c" />
      {/* Side hair tufts */}
      <path d="M 36 106 Q 30 124 36 148 Q 50 143 55 128 Z" fill="#15215c" />
      <path d="M 124 106 Q 130 124 124 148 Q 110 143 105 128 Z" fill="#15215c" />

      {/* Neck */}
      <rect x="68" y="140" width="24" height="20" rx="7" fill="#f5c9a0" />
      {/* Suit top */}
      <ellipse cx="80" cy="165" rx="40" ry="14" fill="#1e3099" />
      <ellipse cx="42" cy="175" rx="34" ry="15" fill="#1e3099" />
      <ellipse cx="118" cy="175" rx="34" ry="15" fill="#1e3099" />
      {/* W emblem on suit */}
      <circle cx="80" cy="163" r="10" fill="#2563eb" />
      <text
        x="80" y="167"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="white"
        fontFamily="Arial, Helvetica, sans-serif"
        dominantBaseline="middle"
      >
        W
      </text>
    </>
  );
}

/* ─────────────────────────── Helmet ────────────────────────────────── */

function Helmet() {
  return (
    <>
      {/* Main dome */}
      <path
        d="M 36 106 C 34 72 54 46 80 44 C 106 46 126 72 124 106 Z"
        fill="#1a2b90"
      />
      {/* Dome left panel (darker) */}
      <path
        d="M 36 106 C 38 88 47 70 60 61 L 62 70 C 51 78 44 94 42 108 Z"
        fill="#13228a"
      />
      {/* Dome right panel */}
      <path
        d="M 124 106 C 122 88 113 70 100 61 L 98 70 C 109 78 116 94 118 108 Z"
        fill="#13228a"
      />
      {/* Center highlight strip */}
      <path
        d="M 62 48 Q 80 43 98 48 L 98 66 Q 80 62 62 66 Z"
        fill="#2538b0"
      />

      {/* Visor stripe */}
      <path
        d="M 40 102 C 42 98 80 96 80 96 C 80 96 118 98 120 102 L 120 111 C 80 113 40 111 40 111 Z"
        fill="#cce8ff"
      />
      {/* Visor inner shine */}
      <path
        d="M 44 102 C 56 99 104 99 116 102 L 114 106 C 80 108 46 106 44 106 Z"
        fill="white"
        opacity="0.4"
      />
      {/* Helmet lower edge trim */}
      <path
        d="M 40 111 C 42 115 80 118 80 118 C 80 118 118 115 120 111 L 120 114 C 80 118 40 114 40 114 Z"
        fill="#1a2b90"
      />

      {/* W Badge */}
      <rect x="63" y="50" width="34" height="30" rx="5" fill="#1741c8" />
      <rect x="65" y="52" width="30" height="26" rx="4" fill="#2563eb" />
      {/* Badge top shine */}
      <path d="M 67 54 L 90 54 L 88 60 L 67 60 Z" fill="white" opacity="0.18" />
      <text
        x="80" y="67"
        textAnchor="middle"
        fontSize="17"
        fontWeight="900"
        fill="white"
        fontFamily="Arial, Helvetica, sans-serif"
        dominantBaseline="middle"
      >
        W
      </text>

      {/* Left Headphone */}
      <ellipse cx="30" cy="109" rx="14" ry="17" fill="#152570" />
      <ellipse cx="30" cy="109" rx="10" ry="13" fill="#2050c0" />
      <ellipse cx="30" cy="109" rx="7" ry="9" fill="#1338a0" />
      <ellipse cx="30" cy="109" rx="4.5" ry="5.5" fill="#3b82f6" />
      <ellipse cx="30" cy="109" rx="2" ry="2.5" fill="#93c5fd" />

      {/* Right Headphone */}
      <ellipse cx="130" cy="109" rx="14" ry="17" fill="#152570" />
      <ellipse cx="130" cy="109" rx="10" ry="13" fill="#2050c0" />
      <ellipse cx="130" cy="109" rx="7" ry="9" fill="#1338a0" />
      <ellipse cx="130" cy="109" rx="4.5" ry="5.5" fill="#3b82f6" />
      <ellipse cx="130" cy="109" rx="2" ry="2.5" fill="#93c5fd" />
    </>
  );
}

/* ─────────────────────────── Face ──────────────────────────────────── */

function Face({ expression }: { expression: GuideExpression }) {
  return (
    <>
      {/* Face base */}
      <ellipse cx="80" cy="120" rx="43" ry="41" fill="#f5c9a0" />
      {/* Face top blend (slightly darker where helmet meets face) */}
      <ellipse cx="80" cy="99" rx="38" ry="12" fill="#f0bc90" opacity="0.5" />

      <Eyebrows expression={expression} />
      <Eyes expression={expression} />

      {/* Cheeks */}
      <ellipse cx="47" cy="130" rx="13" ry="8" fill="#f9a0a0" opacity="0.5" />
      <ellipse cx="113" cy="130" rx="13" ry="8" fill="#f9a0a0" opacity="0.5" />

      {/* Nose */}
      <ellipse cx="80" cy="128" rx="3.5" ry="2.5" fill="#dca080" />

      <Mouth expression={expression} />
    </>
  );
}

/* ─────────────────────────── Eyebrows ──────────────────────────────── */

function Eyebrows({ expression }: { expression: GuideExpression }) {
  const sw = "3.5";
  const lc = "round";

  if (expression === "thinking") {
    return (
      <>
        {/* Left brow furrowed (lower inner) */}
        <path d="M 50 100 Q 61 96 72 100" stroke="#1e2040" strokeWidth={sw} fill="none" strokeLinecap={lc} />
        {/* Right brow raised (thinking) */}
        <path d="M 88 97 Q 99 92 109 97" stroke="#1e2040" strokeWidth={sw} fill="none" strokeLinecap={lc} />
      </>
    );
  }
  if (expression === "excited" || expression === "waving") {
    return (
      <>
        <path d="M 50 96 Q 61 91 72 96" stroke="#1e2040" strokeWidth={sw} fill="none" strokeLinecap={lc} />
        <path d="M 88 96 Q 99 91 109 96" stroke="#1e2040" strokeWidth={sw} fill="none" strokeLinecap={lc} />
      </>
    );
  }
  if (expression === "winking") {
    return (
      <>
        <path d="M 50 101 Q 61 97 72 101" stroke="#1e2040" strokeWidth={sw} fill="none" strokeLinecap={lc} />
        {/* Right brow lowered for wink side */}
        <path d="M 88 103 Q 99 100 109 103" stroke="#1e2040" strokeWidth="3" fill="none" strokeLinecap={lc} />
      </>
    );
  }
  // Default: gentle arch
  return (
    <>
      <path d="M 50 101 Q 61 97 72 101" stroke="#1e2040" strokeWidth={sw} fill="none" strokeLinecap={lc} />
      <path d="M 88 101 Q 99 97 109 101" stroke="#1e2040" strokeWidth={sw} fill="none" strokeLinecap={lc} />
    </>
  );
}

/* ─────────────────────────── Eyes ──────────────────────────────────── */

function Eyes({ expression }: { expression: GuideExpression }) {
  const squintBoth = expression === "waving";
  const winkRight = expression === "winking";
  const eyeRy = expression === "excited" ? 15 : expression === "thinking" ? 11 : 13;

  // Squinting (joyful UU) eyes
  if (squintBoth) {
    return (
      <>
        <path d="M 49 114 Q 62 105 75 114" stroke="#1e2040" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M 85 114 Q 98 105 111 114" stroke="#1e2040" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Cheek lash lines under squint */}
        <path d="M 51 115 Q 62 121 74 115" stroke="#1e2040" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35" />
        <path d="M 86 115 Q 98 121 110 115" stroke="#1e2040" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35" />
      </>
    );
  }

  return (
    <>
      {/* Left eye */}
      <SingleEye cx={62} eyeRy={eyeRy} />
      {/* Right eye — winking = closed arc */}
      {winkRight ? (
        <>
          <path d="M 85 114 Q 98 106 111 114" stroke="#1e2040" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 87 115 Q 98 121 110 115" stroke="#1e2040" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35" />
        </>
      ) : (
        <SingleEye cx={98} eyeRy={eyeRy} />
      )}
    </>
  );
}

function SingleEye({ cx, eyeRy }: { cx: number; eyeRy: number }) {
  const cy = 114;
  const topEdge = cy - eyeRy;
  return (
    <>
      {/* Sclera */}
      <ellipse cx={cx} cy={cy} rx="13" ry={eyeRy} fill="white" />
      {/* Dark outer iris */}
      <ellipse cx={cx} cy={cy + 1} rx="9" ry={eyeRy * 0.79} fill="#1a2050" />
      {/* Colored iris */}
      <ellipse cx={cx} cy={cy + 1} rx="7" ry={eyeRy * 0.62} fill="#2155c0" />
      {/* Pupil */}
      <ellipse cx={cx} cy={cy + 1} rx="4.5" ry={eyeRy * 0.44} fill="#080c20" />
      {/* Main catchlight */}
      <circle cx={cx + 4} cy={topEdge + 4} r="2.8" fill="white" />
      {/* Secondary catchlight */}
      <circle cx={cx - 3} cy={cy - 2} r="1.5" fill="white" opacity="0.65" />
      {/* Eyelid top curve */}
      <path
        d={`M ${cx - 13} ${topEdge + 1} Q ${cx} ${topEdge - 5} ${cx + 13} ${topEdge + 1}`}
        stroke="#1e2040"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

/* ─────────────────────────── Mouth ─────────────────────────────────── */

function Mouth({ expression }: { expression: GuideExpression }) {
  switch (expression) {
    case "thinking":
      // Small contemplative smile, slightly asymmetric
      return (
        <path
          d="M 70 139 Q 80 145 90 140"
          stroke="#b84040"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      );

    case "excited":
    case "waving": {
      // Big open smile with teeth + tongue
      return (
        <>
          <path d="M 62 138 Q 80 157 98 138 Q 80 164 62 138 Z" fill="#b03030" />
          <path d="M 64 138 Q 80 155 96 138 Q 80 162 64 138 Z" fill="#c84040" />
          {/* Teeth */}
          <path d="M 66 138 Q 80 148 94 138" stroke="white" strokeWidth="5.5" fill="none" strokeLinecap="round" />
          {/* Tongue */}
          <ellipse cx="80" cy="154" rx="10" ry="6" fill="#f08080" />
        </>
      );
    }

    case "talking":
      return (
        <>
          <ellipse cx="80" cy="141" rx="11" ry="8" fill="#b03030" />
          <ellipse cx="80" cy="139" rx="9" ry="5" fill="#d05050" />
        </>
      );

    case "winking":
      // Playful smirk
      return (
        <path
          d="M 68 140 Q 82 147 93 139"
          stroke="#b84040"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      );

    case "happy": {
      // Open smile with teeth, slightly smaller than excited
      return (
        <>
          <path d="M 64 138 Q 80 154 96 138 Q 80 160 64 138 Z" fill="#b03030" />
          <path d="M 66 138 Q 80 150 94 138" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
          <ellipse cx="80" cy="152" rx="9" ry="5" fill="#f08080" />
        </>
      );
    }

    default: // idle — medium closed smile
      return (
        <path
          d="M 65 138 Q 80 150 95 138"
          stroke="#b84040"
          strokeWidth="2.5"
          fill="#f08080"
          strokeLinecap="round"
        />
      );
  }
}
