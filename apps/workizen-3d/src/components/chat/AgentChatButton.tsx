"use client";

import { WorkizenGuideAvatar } from "./WorkizenGuideAvatar";

interface Props {
  onClick: () => void;
}

export function AgentChatButton({ onClick }: Props) {
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
        className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-blue-600 shadow-xl shadow-blue-200/60 transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
        aria-label="Open Workizen Guide chat"
      >
        <WorkizenGuideAvatar size={62} expression="happy" />
        {/* Online indicator */}
        <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-green-400 ring-2 ring-white" />
      </button>
    </div>
  );
}
