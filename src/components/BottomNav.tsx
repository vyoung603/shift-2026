"use client";

type TabDef = {
  id: string;
  label: string;
  icon?: string;
  customIcon?: true;
};

const TABS: TabDef[] = [
  { id: "home", label: "Home", icon: "M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-4 0h4" },
  { id: "agenda", label: "Agenda", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { id: "about", label: "About", customIcon: true },
  { id: "faq", label: "FAQ", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "explore", label: "Explore", icon: "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
];

function FlowerNavIcon({ className, isActive }: { className: string; isActive: boolean }) {
  return (
    <img
      src="/shift-2026/sm-flower.png"
      alt=""
      className={`${className} ${isActive ? "opacity-100" : "opacity-40"}`}
    />
  );
}

export default function BottomNav({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (tab: string) => void;
}) {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)] z-50">
      <div className="flex justify-around py-2">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${
                isActive ? "text-lake" : "text-gray-400"
              }`}
            >
              {tab.customIcon ? (
                <FlowerNavIcon className="w-6 h-6" isActive={isActive} />
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                </svg>
              )}
              <span className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
