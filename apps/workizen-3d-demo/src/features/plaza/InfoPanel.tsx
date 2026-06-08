"use client";

import { usePlazaStore } from "./store";

const typeLabels = {
  building: "Building",
  citizen: "Citizen",
  district: "District",
  opportunity: "Opportunity"
};

export function InfoPanel() {
  const selected = usePlazaStore((state) => state.selected);
  const clearSelection = usePlazaStore((state) => state.clearSelection);

  return (
    <aside className="absolute right-4 top-4 z-20 flex w-[min(380px,calc(100vw-2rem))] flex-col gap-4 rounded-lg border border-white/80 bg-white/88 p-5 text-ink shadow-panel backdrop-blur-md">
      {selected ? (
        <>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#667085]">
                {typeLabels[selected.type]}
              </p>
              <h2 className="mt-1 text-2xl font-bold leading-tight">{selected.name}</h2>
            </div>
            <button
              type="button"
              onClick={clearSelection}
              className="grid h-9 w-9 place-items-center rounded-md border border-[#E5E7EB] bg-white text-lg leading-none text-[#667085] transition hover:border-[#C9CDD4] hover:text-ink"
              aria-label="Close info panel"
            >
              ×
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#344054]">Description</p>
            <p className="mt-1 text-sm leading-6 text-[#475467]">{selected.description}</p>
          </div>
          <div className="rounded-md border border-[#E6EEF7] bg-[#F7FAFC] p-4">
            <p className="text-sm font-semibold text-[#344054]">Future capability</p>
            <p className="mt-1 text-sm leading-6 text-[#475467]">{selected.futureCapability}</p>
          </div>
        </>
      ) : (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#667085]">
            Citizen Plaza
          </p>
          <h2 className="text-2xl font-bold leading-tight">Select a citizen or building</h2>
          <p className="text-sm leading-6 text-[#475467]">
            Click a plaza building, citizen, or opportunity marker to inspect its purpose and future capability.
          </p>
        </>
      )}
    </aside>
  );
}
