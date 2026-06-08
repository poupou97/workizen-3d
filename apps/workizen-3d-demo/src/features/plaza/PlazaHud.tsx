"use client";

type PlazaHudProps = {
  entered: boolean;
  onEnter: () => void;
};

export function PlazaHud({ entered, onEnter }: PlazaHudProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 md:p-6">
      <section className="max-w-[560px] text-ink">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#586174]">
          WorkforceOS / Workizen.vn
        </p>
        <h1 className="max-w-[12ch] text-5xl font-black leading-[0.95] md:text-7xl">
          Workizen 3D World
        </h1>
        <p className="mt-4 max-w-[34rem] text-lg font-medium leading-7 text-[#475467] md:text-xl">
          The cute digital city for Digital Citizens
        </p>
        {!entered ? (
          <button
            type="button"
            onClick={onEnter}
            className="pointer-events-auto mt-6 rounded-md bg-ink px-5 py-3 text-sm font-bold text-white shadow-panel transition hover:-translate-y-0.5 hover:bg-[#243447]"
          >
            Enter Citizen Plaza
          </button>
        ) : null}
      </section>

      <div className="flex flex-wrap gap-2 self-start text-xs font-semibold text-[#344054]">
        {["Citizen Plaza", "AI Agent Lab", "Knowledge Library", "Compute Center", "Team Office"].map(
          (label) => (
            <span
              key={label}
              className="rounded-md border border-white/80 bg-white/70 px-3 py-2 shadow-sm backdrop-blur"
            >
              {label}
            </span>
          )
        )}
      </div>
    </div>
  );
}
