"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { InfoPanel } from "@/features/plaza/InfoPanel";
import { PlazaHud } from "@/features/plaza/PlazaHud";

const CitizenPlazaScene = dynamic(
  () => import("@/features/plaza/CitizenPlazaScene").then((module) => module.CitizenPlazaScene),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-[#F8FBFF]" />
  }
);

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <main className="relative h-screen min-h-[620px] w-full overflow-hidden bg-[#F8FBFF]">
      <CitizenPlazaScene />
      <PlazaHud entered={entered} onEnter={() => setEntered(true)} />
      {entered ? <InfoPanel /> : null}
    </main>
  );
}
