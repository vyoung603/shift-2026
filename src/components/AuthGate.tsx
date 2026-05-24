"use client";

import { useState, useEffect } from "react";

export default function AuthGate({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    document.body.style.backgroundColor = "#004455";
    const t0 = setTimeout(() => setPhase(1), 100);
    const t1 = setTimeout(() => setPhase(2), 1100);
    const t2 = setTimeout(() => setPhase(3), 2100);
    return () => {
      [t0, t1, t2].forEach(clearTimeout);
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="min-h-dvh bg-lake pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center">
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}
        >
          <img
            src="/shift-2026/shift-logo-white.png"
            alt="SonderMind Shift"
            className="w-64 h-auto mx-auto mb-5"
          />
        </div>

        <div
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}
        >
          <p className="font-heading italic text-white text-center whitespace-nowrap text-[17px] mb-8">
            Where we pause, connect, and grow together
          </p>
        </div>

        <div
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}
        >
          <button
            onClick={onEnter}
            className="px-10 py-3 rounded-xl bg-bright-teal text-white font-semibold text-base active:opacity-80 transition-opacity"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}
