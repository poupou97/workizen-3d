import { create } from "zustand";
import type { SelectablePlazaObject } from "./types";

type PlazaState = {
  selected: SelectablePlazaObject | null;
  selectObject: (object: SelectablePlazaObject) => void;
  clearSelection: () => void;
};

export const usePlazaStore = create<PlazaState>((set) => ({
  selected: null,
  selectObject: (object) => set({ selected: object }),
  clearSelection: () => set({ selected: null })
}));
