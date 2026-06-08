import { create } from "zustand";
import { demoSteps } from "./data";
import type { Selection } from "./types";

interface CampusState {
  selected: Selection;
  demoMode: boolean;
  demoStepIndex: number;
  select: (selection: Selection) => void;
  clearSelection: () => void;
  setDemoMode: (enabled: boolean) => void;
  nextDemoStep: () => void;
  previousDemoStep: () => void;
  goToDemoStep: (index: number) => void;
}

export const useCampusStore = create<CampusState>((set, get) => ({
  selected: { kind: "vision", id: "vision" },
  demoMode: false,
  demoStepIndex: 0,
  select: (selection) => set({ selected: selection }),
  clearSelection: () => set({ selected: { kind: "vision", id: "vision" } }),
  setDemoMode: (enabled) => {
    const currentStep = demoSteps[get().demoStepIndex] ?? demoSteps[0];
    set({
      demoMode: enabled,
      selected: enabled ? currentStep.selection : get().selected
    });
  },
  nextDemoStep: () => {
    const nextIndex = Math.min(get().demoStepIndex + 1, demoSteps.length - 1);
    set({
      demoMode: true,
      demoStepIndex: nextIndex,
      selected: demoSteps[nextIndex].selection
    });
  },
  previousDemoStep: () => {
    const previousIndex = Math.max(get().demoStepIndex - 1, 0);
    set({
      demoMode: true,
      demoStepIndex: previousIndex,
      selected: demoSteps[previousIndex].selection
    });
  },
  goToDemoStep: (index) => {
    const safeIndex = Math.max(0, Math.min(index, demoSteps.length - 1));
    set({
      demoMode: true,
      demoStepIndex: safeIndex,
      selected: demoSteps[safeIndex].selection
    });
  }
}));
