"use client";

import { districts } from "./data";
import { useCampusStore } from "./store";

export function TopHud() {
  const select = useCampusStore((state) => state.select);
  const setDemoMode = useCampusStore((state) => state.setDemoMode);
  const demoMode = useCampusStore((state) => state.demoMode);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 py-4 md:px-6">
      <section className="glass-panel pointer-events-auto max-w-[340px] rounded-lg px-4 py-3">
        <p className="text-[11px] font-bold tracking-[0.18em] text-blue-700">Workizen HQ Campus Island</p>
        <h1 className="mt-1 text-2xl font-black leading-tight text-slate-950">Digital Citizen City</h1>
        <p className="mt-1 text-xs font-semibold text-slate-700">
          Opportunity Marketplace on an ocean campus for citizens, AI, knowledge, and compute.
        </p>
      </section>
      <nav className="glass-panel pointer-events-auto fixed bottom-4 left-1/2 flex w-[min(940px,calc(100vw-2rem))] -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-xl p-2">
        <button
          type="button"
          className="rounded-md bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"
          onClick={() => setDemoMode(!demoMode)}
        >
          {demoMode ? "Exit Demo" : "Demo"}
        </button>
        {districts.map((district) => (
          <button
            type="button"
            key={district.id}
            className="rounded-md border border-sky-100 bg-white/95 px-3 py-2 text-xs font-bold text-slate-800 transition hover:border-cyan-200 hover:bg-sky-50"
            onClick={() => select({ kind: "district", id: district.id })}
          >
            {district.name}
          </button>
        ))}
      </nav>
    </header>
  );
}
