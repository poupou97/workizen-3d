"use client";

import { demoSteps } from "./data";
import { useCampusStore } from "./store";

export function DemoGuide() {
  const demoMode = useCampusStore((state) => state.demoMode);
  const demoStepIndex = useCampusStore((state) => state.demoStepIndex);
  const nextDemoStep = useCampusStore((state) => state.nextDemoStep);
  const previousDemoStep = useCampusStore((state) => state.previousDemoStep);
  const goToDemoStep = useCampusStore((state) => state.goToDemoStep);

  if (!demoMode) {
    return null;
  }

  const step = demoSteps[demoStepIndex];

  return (
    <section className="glass-panel absolute bottom-20 inset-x-4 z-20 rounded-lg p-4 md:bottom-4 md:left-4 md:right-auto md:w-[min(560px,calc(100vw-2rem))]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Founder Demo Mode</p>
          <h2 className="mt-1 text-lg font-black text-slate-950 md:text-xl">{step.title}</h2>
          <p className="mt-1 text-xs font-semibold text-slate-700 md:text-sm">{step.summary}</p>
        </div>
        <p className="shrink-0 rounded-md bg-blue-600 px-2 py-1 text-xs font-bold text-white shadow-sm shadow-blue-200">
          {demoStepIndex + 1}/{demoSteps.length}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {demoSteps.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`h-2.5 rounded-full transition ${
              index === demoStepIndex ? "w-9 bg-blue-600" : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to ${item.title}`}
            onClick={() => goToDemoStep(index)}
          />
        ))}
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            className="rounded-md border border-sky-100 bg-white px-3 py-2 text-xs font-bold text-slate-800 transition hover:bg-sky-50 disabled:opacity-40"
            disabled={demoStepIndex === 0}
            onClick={previousDemoStep}
          >
            Back
          </button>
          <button
            type="button"
            className="rounded-md bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-40"
            disabled={demoStepIndex === demoSteps.length - 1}
            onClick={nextDemoStep}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
