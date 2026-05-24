"use client";

import { useState, useEffect } from "react";

const DISMISSED_KEY = "shift_install_dismissed";

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export default function InstallBanner() {
  const [show, setShow] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;
    if (sessionStorage.getItem(DISMISSED_KEY)) return;
    const ua = navigator.userAgent.toLowerCase();
    setIsIos(/iphone|ipad|ipod/.test(ua));
    setShow(true);
  }, []);

  if (!show) return null;

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  };

  return (
    <div className="bg-solace px-4 py-2.5 flex items-center gap-3">
      <img src="/shift-2026/sm-flower.png" alt="" className="w-7 h-7 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-lake leading-tight">Add SM Shift to your homescreen as a web app</p>
        <p className="text-[11px] text-bark-mid leading-tight flex items-center gap-1 flex-wrap">
          {isIos ? (
            <>
              Tap
              <svg className="inline w-3.5 h-3.5 text-lake" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              <span>Share ➔ ⌄ More ➔</span>
              <span className="font-semibold">+ Add to Home Screen</span>
            </>
          ) : (
            <>
              Tap <span className="font-semibold">⋮</span> ➔ <span className="font-semibold">Add to Home Screen</span>
            </>
          )}
        </p>
      </div>
      <button onClick={dismiss} className="text-bark-mid text-lg px-1" aria-label="Dismiss">
        &times;
      </button>
    </div>
  );
}
