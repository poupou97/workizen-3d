"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

type Phase = "visible" | "fading" | "hidden";

export function LoadingScreen() {
  const { progress } = useProgress();
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    if (progress >= 100 && phase === "visible") {
      // 350ms: let WebGL shaders compile + first frame paint before fading
      const fadeTimer = setTimeout(() => setPhase("fading"), 350);
      return () => clearTimeout(fadeTimer);
    }
  }, [progress, phase]);

  useEffect(() => {
    if (phase === "fading") {
      // Must match the CSS transition duration below
      const hideTimer = setTimeout(() => setPhase("hidden"), 650);
      return () => clearTimeout(hideTimer);
    }
  }, [phase]);

  if (phase === "hidden") return null;

  const pct = Math.round(progress);

  return (
    <div
      role="status"
      aria-label="Loading 3D world"
      className={`loading-screen${phase === "fading" ? " loading-screen--fading" : ""}`}
    >
      {/* Island silhouette */}
      <IslandIcon />

      {/* Logo */}
      <div className="loading-logo">
        <span className="loading-logo__name">WORKIZEN</span>
        <span className="loading-logo__tagline">Digital Citizen City</span>
      </div>

      {/* Progress bar */}
      <div className="loading-bar-wrap">
        <div className="loading-bar-track">
          <div
            className="loading-bar-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="loading-bar-meta">
          <span className="loading-bar-meta__label">
            {pct < 100 ? "Building your world…" : "Almost ready…"}
          </span>
          <span className="loading-bar-meta__pct">{pct}%</span>
        </div>
      </div>
    </div>
  );
}

function IslandIcon() {
  return (
    <svg
      width="72"
      height="40"
      viewBox="0 0 72 40"
      fill="none"
      aria-hidden="true"
      className="loading-island"
    >
      {/* Water */}
      <ellipse cx="36" cy="31" rx="34" ry="9" fill="#59D8FF" opacity="0.35" />
      {/* Island base */}
      <ellipse cx="36" cy="28" rx="26" ry="7" fill="#A4EB8D" />
      <ellipse cx="36" cy="26" rx="20" ry="5.5" fill="#8FE07B" />
      {/* Founder tower */}
      <rect x="33" y="8" width="6" height="18" rx="2" fill="#2F80ED" opacity="0.8" />
      <rect x="35" y="5" width="2" height="4" rx="1" fill="#2F80ED" opacity="0.5" />
      {/* Left building */}
      <rect x="20" y="15" width="7" height="11" rx="1.5" fill="#18C58F" opacity="0.7" />
      {/* Right building */}
      <rect x="45" y="17" width="6" height="9" rx="1.5" fill="#F5B82E" opacity="0.7" />
      {/* Trees */}
      <ellipse cx="15" cy="21" rx="3" ry="4" fill="#8FE07B" opacity="0.9" />
      <ellipse cx="57" cy="22" rx="2.5" ry="3.5" fill="#A4EB8D" opacity="0.9" />
    </svg>
  );
}
