"use client";

import { useData } from "@/lib/data-context";
import ShiftLogo from "./ShiftLogo";

export default function AboutPage() {
  const { config } = useData();

  return (
    <div className="pb-4">
      {/* Hero section */}
      <div className="bg-lake text-center px-6 pt-10 pb-8">
        <ShiftLogo className="w-48 h-auto mx-auto mb-4" />
        <h1 className="font-heading text-3xl text-white mb-2">What is Shift?</h1>
        <p className="text-base text-pale-teal font-medium">
          Our once-a-year moment to come together
        </p>
      </div>

      <div className="px-4 pt-6">

      {/* About content */}
      <div className="bg-white rounded-2xl p-6 mb-6">
        <div className="space-y-4 text-[15px] text-bark leading-relaxed">
          <p>
            Shift is SonderMind&apos;s annual company-wide event &mdash; the one time each year we bring
            nearly the entire company together in the same room. For one week, we pause daily operations
            to connect with colleagues, learn from each other, and celebrate the work that makes our
            mission possible.
          </p>
          <p>
            This year, Shift takes us to Dallas, Texas. Three full days of programming designed around
            three strategic objectives: strengthening connection to reduce attrition, building AI fluency
            to increase productivity, and improving meeting efficiency to reduce operating costs. Plus
            volunteering, workshops, panels, team time, and an unforgettable all-company celebration.
          </p>
        </div>
      </div>

      {/* Strategic pillars */}
      <h2 className="font-heading text-xl text-lake mb-3">This Year&apos;s Focus</h2>
      <div className="space-y-3 mb-6">
        {[
          { emoji: "🤝", title: "Connection", desc: "Strengthen relationships across functions and reduce attrition" },
          { emoji: "🤖", title: "AI Fluency", desc: "Build confidence and hands-on skill with AI tools to increase productivity" },
          { emoji: "⚡", title: "Efficiency", desc: "Improve how we meet and collaborate to reduce operating costs" },
        ].map((pillar) => (
          <div key={pillar.title} className="bg-white rounded-xl p-4 flex items-start gap-4">
            <span className="text-2xl shrink-0">{pillar.emoji}</span>
            <div>
              <p className="font-semibold text-lake">{pillar.title}</p>
              <p className="text-sm text-bark-mid">{pillar.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Key details */}
      <h2 className="font-heading text-xl text-lake mb-3">Event Details</h2>
      <div className="bg-white rounded-2xl p-6 mb-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">📅</span>
          <div>
            <p className="text-sm text-bark-mid">Dates</p>
            <p className="font-semibold text-lake">May 18 &ndash; 22, 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl">📍</span>
          <div>
            <p className="text-sm text-bark-mid">Venue</p>
            <p className="font-semibold text-lake">Omni Las Colinas Hotel, Irving (Dallas), TX</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl">👥</span>
          <div>
            <p className="text-sm text-bark-mid">Attendees</p>
            <p className="font-semibold text-lake">~300 SonderMinders</p>
          </div>
        </div>
      </div>

      {/* Slack CTA */}
      {config.slackChannel && (
        <a
          href={config.slackChannel}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-lake rounded-xl p-4 flex items-center gap-4 justify-between"
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
    </div>
  );
}
