"use client";

import type { ChatMessage as ChatMessageType } from "@/services/chat/types";
import { WorkizenGuideAvatar } from "./WorkizenGuideAvatar";

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isBot = message.role === "assistant";

  if (isBot) {
    return (
      <div className="flex items-end gap-2">
        <div className="shrink-0">
          <WorkizenGuideAvatar size={30} expression="happy" animation="none" />
        </div>
        <div className="max-w-[78%]">
          <div className="rounded-2xl rounded-bl-sm border border-sky-100 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm">
            {message.text.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </div>
          <p className="ml-1 mt-1 text-[10px] text-slate-400">{formatTime(message.timestamp)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <div className="max-w-[78%]">
        <div className="rounded-2xl rounded-br-sm bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm">
          {message.text}
        </div>
        <p className="mr-1 mt-1 text-right text-[10px] text-slate-400">
          {formatTime(message.timestamp)} ✓✓
        </p>
      </div>
    </div>
  );
}
