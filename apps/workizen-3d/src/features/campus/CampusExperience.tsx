"use client";

import { useEffect } from "react";
import { AgentChatOverlay } from "@/components/chat/AgentChatOverlay";
import { LoadingScreen } from "@/ui/LoadingScreen";
import { CampusScene } from "./CampusScene";
import { DemoGuide } from "./DemoGuide";
import { SelectionPanel } from "./SelectionPanel";
import { TopHud } from "./TopHud";
import { useCampusStore } from "./store";

interface CampusExperienceProps {
  initialDemoMode: boolean;
}

export function CampusExperience({ initialDemoMode }: CampusExperienceProps) {
  const setDemoMode = useCampusStore((state) => state.setDemoMode);

  useEffect(() => {
    if (initialDemoMode) {
      setDemoMode(true);
    }
  }, [initialDemoMode, setDemoMode]);

  return (
    <main className="campus-shell relative h-screen w-screen">
      <CampusScene />
      <TopHud />
      <DemoGuide />
      <SelectionPanel />
      <AgentChatOverlay />
      <LoadingScreen />
    </main>
  );
}
