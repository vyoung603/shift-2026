"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useData } from "@/lib/data-context";
import ShiftLogo from "./ShiftLogo";

const TAGLINE_WORDS = ["Where", "we", "pause,", "connect,", "and", "grow", "together"];

export default function AuthGate() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const { checkCode } = useAuth();
  const { config } = useData();

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = config.accessCode || "shift2026";
    if (!checkCode(code, correct)) {
      setError("Incorrect access code. Try again.");
      setCode("");
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-lake px-6 overflow-hidden">
      <div className="w-full max-w-sm text-center">
        {/* Animated logo */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <ShiftLogo className="w-64 h-auto mx-auto mb-6" />
        </div>

        {/* Word-by-word tagline */}
        <p className="flex flex-wrap justify-center gap-x-1.5 mb-3">
          {TAGLINE_WORDS.map((word, i) => (
            <span
              key={i}
              className="font-heading italic text-lg text-pale-teal transition-all duration-500 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${600 + i * 100}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* Event details */}
        <p
          className="text-xs text-pale-teal/70 tracking-wider mb-8 transition-all duration-600 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transitionDelay: "1400ms",
          }}
        >
          MAY 18 &ndash; 22, 2026 &middot; OMNI LAS COLINAS &middot; DALLAS, TX
        </p>

        {/* Bouncing chevron */}
        <div
          className="mb-6 transition-opacity duration-500"
          style={{ opacity: mounted ? 1 : 0, transitionDelay: "1600ms" }}
        >
          <span className="inline-block text-2xl text-bright-teal animate-bounce">⌄</span>
        </div>

        {/* Access code form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-3 transition-all duration-600 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "1800ms",
          }}
        >
          <label className="block text-sm font-medium text-pale-teal text-left">
            Enter your access code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(""); }}
            placeholder="Access code"
            autoCapitalize="none"
            autoCorrect="off"
            className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-bright-teal backdrop-blur-sm"
          />
          {error && <p className="text-red-300 text-sm text-left">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-bright-teal text-white font-semibold active:opacity-80 transition-opacity"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
