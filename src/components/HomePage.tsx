"use client";

import { useData } from "@/lib/data-context";
import ShiftLogo from "./ShiftLogo";

const WEEK = [
  { day: "Monday", date: "May 18", label: "Travel Day", desc: "Arrive in Dallas, optional team dinners" },
  { day: "Tuesday", date: "May 19", label: "Foundation", desc: "Product deep-dives, volunteering" },
  { day: "Wednesday", date: "May 20", label: "Experience", desc: "Panels, AI workshop, leadership Q&A" },
  { day: "Thursday", date: "May 21", label: "Skills & Celebration", desc: "Workshops, team time, all-company party" },
  { day: "Friday", date: "May 22", label: "Depart", desc: "Safe travels home" },
];

export default function HomePage() {
  const { config } = useData();

  return (
    <div className="pb-4">
      {/* Hero */}
      <div className="bg-lake text-white text-center px-6 pt-10 pb-8">
        <ShiftLogo className="w-60 h-auto mx-auto mb-4" />
        <p className="font-heading italic text-base text-pale-teal mt-1">
          Where we pause, connect, and grow together
        </p>
        <p className="text-[13px] text-pale-teal/70 tracking-wider mt-3">
          May 18 &ndash; 22, 2026 &middot; Dallas, TX
        </p>
      </div>

      {/* Announcement */}
      {config.announcement && (
        <div className="mx-4 mt-4 p-4 bg-solace rounded-xl flex items-start gap-3">
          <span className="text-lg">📢</span>
          <p className="text-sm font-semibold text-lake">{config.announcement}</p>
        </div>
      )}

      {/* Week at a Glance */}
      <h2 className="font-heading text-[22px] text-lake mx-4 mt-6 mb-3">The Week at a Glance</h2>
      <div className="space-y-2 mx-4">
        {WEEK.map((w) => (
          <div key={w.day} className="bg-white rounded-xl p-4 border-l-4 border-bright-teal">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-[15px] text-lake">{w.day}</span>
              <span className="text-[13px] text-bark-mid">{w.date}</span>
            </div>
            <p className="text-sm font-medium text-bright-teal">{w.label}</p>
            <p className="text-[13px] text-bark-mid">{w.desc}</p>
          </div>
        ))}
      </div>

      {/* Venue */}
      <h2 className="font-heading text-[22px] text-lake mx-4 mt-6 mb-3">Venue</h2>
      <a
        href="https://www.google.com/maps/search/Omni+Las+Colinas+Hotel+Irving+TX"
        target="_blank"
        rel="noopener noreferrer"
        className="block mx-4 bg-white rounded-xl p-4"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lake">📍</span>
          <span className="font-semibold text-base text-lake">Omni Las Colinas Hotel</span>
        </div>
        <p className="text-[13px] text-bark-mid mb-2">221 E. Las Colinas Blvd, Irving, TX 75039</p>
        <span className="text-sm font-semibold text-bright-teal">Get Directions →</span>
      </a>

      {/* Wifi */}
      {config.wifiNetwork && (
        <div className="mx-4 mt-3 bg-white rounded-xl p-4 flex items-center gap-4">
          <span className="text-xl">📶</span>
          <div>
            <p className="text-xs text-bark-mid">Wifi Network</p>
            <p className="font-semibold text-[15px] text-lake">{config.wifiNetwork}</p>
            {config.wifiPassword && <p className="text-[13px] text-bark-mid">Password: {config.wifiPassword}</p>}
          </div>
        </div>
      )}

      {/* Slack Channel */}
      {config.slackChannel && (
        <a
          href={config.slackChannel}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 mt-6 bg-lake rounded-xl p-4 flex items-center gap-4 justify-between block"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">💬</span>
            <div>
              <p className="text-xs text-pale-teal/70">Join the Conversation</p>
              <p className="font-semibold text-[15px] text-white">#sm-shift2026 on Slack</p>
            </div>
          </div>
          <span className="text-bright-teal text-lg">→</span>
        </a>
      )}
    </div>
  );
}
