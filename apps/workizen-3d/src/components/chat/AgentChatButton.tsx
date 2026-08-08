"use client";

import { useEffect, useState } from "react";
import type { GuideAnimation } from "./WorkizenGuideAvatar";
import { WorkizenGuideAvatar } from "./WorkizenGuideAvatar";

interface Props {
  onClick: () => void;
}

export function AgentChatButton({ onClick }: Props) {
  const [anim, setAnim] = useState<GuideAnimation>("waving");

  // Wave for ~2.7 s (3 cycles × 0.9 s) then switch to idle float
  useEffect(() => {
    const t = setTimeout(() => setAnim("idle"), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex items-end gap-3">
      {/* Speech bubble */}
      <div className="glass-panel max-w-[160px] rounded-2xl rounded-br-sm px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-lg">
        Hi! Need any help?
      </div>

      {/* Avatar button */}
      <button
        type="button"
        onClick={onClick}
        className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-blue-500 to-blue-700 shadow-xl shadow-blue-300/50 transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
        aria-label="Open Workizen Guide chat"
      >
        <WorkizenGuideAvatar size={72} expression="happy" animation={anim} />
        {/* Online indicator */}
        <span className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 rounded-full bg-green-400 ring-2 ring-white" />
      </button>
    </div>
  );
}
