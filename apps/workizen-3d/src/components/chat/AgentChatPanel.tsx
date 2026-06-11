"use client";

import { useEffect, useRef, useState } from "react";
import { createChatProvider } from "@/services/chat/ChatProvider";
import type { ChatMessage as ChatMessageType } from "@/services/chat/types";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { WorkizenGuideAvatar } from "./WorkizenGuideAvatar";

const provider = createChatProvider();

function makeInitialMessages(): ChatMessageType[] {
  return [
    {
      id: "init-1",
      role: "assistant",
      text: "Hi, I'm Workizen Guide.\nHow can I help you today?",
      timestamp: new Date(),
    },
  ];
}

interface Props {
  onClose: () => void;
}

export function AgentChatPanel({ onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessageType[]>(makeInitialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    // Small delay so the panel transition finishes first
    const t = setTimeout(() => inputRef.current?.focus(), 320);
    return () => clearTimeout(t);
  }, []);

  async function handleSend() {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await provider.sendMessage(text, [...messages, userMsg]);
      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, role: "assistant", text: reply, timestamp: new Date() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "Sorry, I'm having trouble connecting right now. Please try again!",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  return (
    <div className="glass-panel flex h-full flex-col overflow-hidden rounded-2xl shadow-2xl shadow-blue-200/40">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-sky-100 px-4 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-blue-500 to-blue-700">
          <WorkizenGuideAvatar
            size={38}
            expression={isTyping ? "thinking" : "happy"}
            animation={isTyping ? "thinking" : "idle"}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-slate-900">AgentChat</p>
          <p className="text-[10px] font-semibold text-green-600">● Online</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Minimize chat"
        >
          <MinusIcon />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close chat"
        >
          <XIcon />
        </button>
      </div>

      {/* Messages */}
      <div className="scroll-thin flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isTyping && (
          <div className="flex items-end gap-2">
            <div className="shrink-0">
              <WorkizenGuideAvatar size={30} expression="thinking" animation="thinking" />
            </div>
            <div className="rounded-2xl rounded-bl-sm border border-sky-100 bg-white px-3.5 py-2.5 shadow-sm">
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-sky-100 p-3">
        <div className="flex items-center gap-2 rounded-xl border border-sky-100 bg-white/90 px-3 py-2 transition focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isTyping}
            className="flex-1 bg-transparent text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => void handleSend()}
            disabled={!input.trim() || isTyping}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M13.3 6.6L1.3 1 3.6 7 1.3 13l12-6.4z" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
