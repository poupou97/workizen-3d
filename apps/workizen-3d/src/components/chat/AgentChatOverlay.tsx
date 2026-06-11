"use client";

import { useState } from "react";
import { AgentChatButton } from "./AgentChatButton";
import { AgentChatPanel } from "./AgentChatPanel";

export function AgentChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat panel — slides in above the button */}
      <div
        className={[
          "fixed z-[9999] transition-all duration-300",
          // Position: above the button (button bottom=96px + button height≈72px + gap)
          "bottom-[180px]",
          // Width: full minus margins on mobile, fixed on desktop
          "inset-x-4 sm:inset-x-auto sm:right-6 sm:w-[380px]",
          // Height: bounded to viewport
          "h-[min(560px,calc(100vh-210px))]",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none",
        ].join(" ")}
      >
        <AgentChatPanel onClose={() => setIsOpen(false)} />
      </div>

      {/* Floating button */}
      <div
        className={[
          "fixed bottom-24 right-6 z-[9999] transition-all duration-200",
          isOpen
            ? "pointer-events-none scale-90 opacity-0"
            : "scale-100 opacity-100",
        ].join(" ")}
      >
        <AgentChatButton onClick={() => setIsOpen(true)} />
      </div>
    </>
  );
}
