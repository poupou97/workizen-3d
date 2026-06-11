"use client";

export type GuideExpression = "idle" | "happy" | "thinking" | "helping" | "surprised" | "waving";

interface Props {
  size?: number;
  expression?: GuideExpression;
}

export function WorkizenGuideAvatar({ size = 80, expression = "happy" }: Props) {
  const thinking = expression === "thinking";
  const surprised = expression === "surprised";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Headset band */}
      <path d="M 13 40 Q 50 7 87 40" stroke="#1d4ed8" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* Left earpiece */}
      <ellipse cx="9" cy="51" rx="8" ry="10" fill="#1d4ed8" />
      <ellipse cx="9" cy="51" rx="4.5" ry="6" fill="#3b82f6" />

      {/* Right earpiece */}
      <ellipse cx="91" cy="51" rx="8" ry="10" fill="#1d4ed8" />
      <ellipse cx="91" cy="51" rx="4.5" ry="6" fill="#3b82f6" />

      {/* Head / helmet */}
      <circle cx="50" cy="50" r="40" fill="#2563eb" />

      {/* Helmet top band */}
      <ellipse cx="50" cy="14" rx="28" ry="7" fill="#1d4ed8" />

      {/* W logo */}
      <text
        x="50"
        y="20"
        fontSize="14"
        fontWeight="800"
        fill="white"
        fontFamily="Arial, Helvetica, sans-serif"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        W
      </text>

      {/* Face */}
      <ellipse cx="50" cy="58" rx="27" ry="28" fill="#ffffff" />

      {/* Eyes */}
      {surprised ? (
        <>
          <ellipse cx="39" cy="52" rx="6" ry="8" fill="#1e293b" />
          <ellipse cx="61" cy="52" rx="6" ry="8" fill="#1e293b" />
        </>
      ) : thinking ? (
        <>
          <ellipse cx="39" cy="54" rx="5.5" ry="4" fill="#1e293b" />
          <ellipse cx="61" cy="54" rx="5.5" ry="4" fill="#1e293b" />
        </>
      ) : (
        <>
          <ellipse cx="39" cy="52" rx="5" ry="6.5" fill="#1e293b" />
          <ellipse cx="61" cy="52" rx="5" ry="6.5" fill="#1e293b" />
        </>
      )}

      {/* Eye shine */}
      <circle cx="41.5" cy="49" r="2" fill="white" />
      <circle cx="63.5" cy="49" r="2" fill="white" />

      {/* Rosy cheeks */}
      <ellipse cx="28" cy="63" rx="7" ry="4.5" fill="#fda4af" opacity="0.45" />
      <ellipse cx="72" cy="63" rx="7" ry="4.5" fill="#fda4af" opacity="0.45" />

      {/* Mouth */}
      {surprised ? (
        <ellipse cx="50" cy="70" rx="5" ry="6" fill="#1e293b" />
      ) : thinking ? (
        <path d="M 41 68 Q 50 66 59 68" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M 40 66 Q 50 75 60 66" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
    </svg>
  );
}
