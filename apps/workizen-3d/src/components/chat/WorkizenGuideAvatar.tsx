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

// Portrait positions in the 1536×1024 sprite sheet.
// Each entry is the center (cx, cy) and half-width (r) of the circular portrait.
// Expression labels match the image: Happy, Thinking, Excited (row 0), Helping, Surprised, Winking (row 1).
const PORTRAITS: Record<GuideExpression, { cx: number; cy: number; r: number }> = {
  idle:     { cx: 699,  cy: 320, r: 165 }, // Happy
  happy:    { cx: 699,  cy: 320, r: 165 }, // Happy
  thinking: { cx: 1032, cy: 321, r: 167 }, // Thinking
  excited:  { cx: 1367, cy: 321, r: 167 }, // Excited
  talking:  { cx: 697,  cy: 699, r: 167 }, // Helping (finger raised)
  waving:   { cx: 1032, cy: 699, r: 167 }, // Surprised (open/enthusiastic)
  winking:  { cx: 1367, cy: 698, r: 167 }, // Winking
};

const IMG_W = 1536;
const IMG_H = 1024;

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
  const p = PORTRAITS[expression];

  // Scale so the portrait's diameter (2r) fills the avatar size
  const scale = size / (p.r * 2);
  const bgW = IMG_W * scale;
  const bgH = IMG_H * scale;
  // Center the portrait in the avatar div
  const posX = size / 2 - p.cx * scale;
  const posY = size / 2 - p.cy * scale;

  return (
    <div
      className={[
        "inline-block shrink-0 overflow-hidden rounded-full",
        animClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: size,
        height: size,
        backgroundImage: "url(/assets/guide/chat-agent.png)",
        backgroundSize: `${bgW.toFixed(1)}px ${bgH.toFixed(1)}px`,
        backgroundPosition: `${posX.toFixed(1)}px ${posY.toFixed(1)}px`,
        backgroundRepeat: "no-repeat",
      }}
      aria-hidden="true"
    />
  );
}
