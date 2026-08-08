"use client";

import { districts } from "./data";
import { useCampusStore } from "./store";

export function TopHud() {
  const select = useCampusStore((state) => state.select);
  const setDemoMode = useCampusStore((state) => state.setDemoMode);
  const demoMode = useCampusStore((state) => state.demoMode);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 py-4 md:px-6">
      <section className="glass-panel pointer-events-auto max-w-[260px] rounded-lg px-3 py-2 sm:max-w-[340px] sm:px-4 sm:py-3">
        <p className="text-[10px] font-bold tracking-[0.18em] text-blue-700 sm:text-[11px]">
          Workizen HQ Campus Island
        </p>
        <h1 className="mt-0.5 text-lg font-black leading-tight text-slate-950 sm:mt-1 sm:text-2xl">
          Digital Citizen City
        </h1>
        <p className="mt-1 hidden text-xs font-semibold text-slate-700 sm:block">
          Opportunity Marketplace on an ocean campus for citizens, AI, knowledge, and compute.
        </p>
      </section>
      <nav className="scrollbar-none glass-panel pointer-events-auto fixed bottom-4 left-1/2 flex w-[min(940px,calc(100vw-2rem))] -translate-x-1/2 items-center gap-2 overflow-x-auto rounded-xl p-2">
        <button
          type="button"
          className="shrink-0 whitespace-nowrap rounded-md bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"
          onClick={() => setDemoMode(!demoMode)}
        >
          {demoMode ? "Exit Demo" : "Demo"}
        </button>
        {districts.filter((d) => d.id !== "citizen-plaza").map((district) => (
          <button
            type="button"
            key={district.id}
            className="shrink-0 whitespace-nowrap rounded-md border border-sky-100 bg-white/95 px-3 py-2 text-xs font-bold text-slate-800 transition hover:border-cyan-200 hover:bg-sky-50"
            onClick={() => select({ kind: "district", id: district.id })}
          >
            {district.name}
          </button>
        ))}
      </nav>
    </header>
  );
}
