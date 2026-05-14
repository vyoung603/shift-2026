"use client";

import { useState } from "react";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { DataProvider } from "@/lib/data-context";
import AuthGate from "@/components/AuthGate";
import BottomNav from "@/components/BottomNav";
import ShiftLogo from "@/components/ShiftLogo";
import HomePage from "@/components/HomePage";
import AgendaPage from "@/components/AgendaPage";
import FaqPage from "@/components/FaqPage";
import ExplorePage from "@/components/ExplorePage";
import AboutPage from "@/components/AboutPage";

function AppShell() {
  const { authed, loading } = useAuth();
  const [tab, setTab] = useState("home");

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-cream">
        <div className="w-8 h-8 border-3 border-lake border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) return <AuthGate />;

  return (
    <div className="min-h-dvh bg-cream pb-20">
      <header className="bg-lake text-white px-4 py-2.5 flex items-center sticky top-0 z-40">
        <ShiftLogo className="h-8 w-auto" />
      </header>

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
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </DataProvider>
  );
}
