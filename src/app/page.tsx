"use client";

import { useState } from "react";
import { DataProvider } from "@/lib/data-context";
import AuthGate from "@/components/AuthGate";
import BottomNav from "@/components/BottomNav";
import ShiftLogo from "@/components/ShiftLogo";
import HomePage from "@/components/HomePage";
import AgendaPage from "@/components/AgendaPage";
import FaqPage from "@/components/FaqPage";
import ExplorePage from "@/components/ExplorePage";
import AboutPage from "@/components/AboutPage";
import InstallBanner from "@/components/InstallBanner";

function AppShell() {
  const [entered, setEntered] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("shift_entered") === "true";
    }
    return false;
  });
  const [tab, setTab] = useState("home");

  if (!entered) {
    return <AuthGate onEnter={() => { setEntered(true); sessionStorage.setItem("shift_entered", "true"); }} />;
  }

  return (
    <div className="min-h-dvh bg-cream pb-20">
      <div className="sticky top-0 z-40">
        <InstallBanner />
        <header className="bg-lake text-white px-4 py-2.5 pt-[calc(env(safe-area-inset-top)+10px)] flex items-center">
          <ShiftLogo className="h-8 w-auto" />
        </header>
      </div>

      <main>
        {tab === "home" && <HomePage />}
        {tab === "agenda" && <AgendaPage />}
        {tab === "faq" && <FaqPage />}
        {tab === "explore" && <ExplorePage />}
        {tab === "about" && <AboutPage />}
      </main>

      <BottomNav active={tab} onNavigate={setTab} />
    </div>
  );
}

export default function Page() {
  return (
    <DataProvider>
      <AppShell />
    </DataProvider>
  );
}
