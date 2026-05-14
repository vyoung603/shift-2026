"use client";

import { useState } from "react";
import { useData } from "@/lib/data-context";
import { downloadIcs } from "@/lib/ics";
import { AgendaItem } from "@/lib/sheets";

const DAYS = ["Tuesday", "Wednesday", "Thursday"];
const DAY_LABELS: Record<string, string> = {
  Tuesday: "May 19", Wednesday: "May 20", Thursday: "May 21",
};

const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Session:     { bg: "bg-lake",        text: "text-white",  border: "border-lake" },
  Workshop:    { bg: "bg-lilac",       text: "text-white",  border: "border-lilac" },
  Meal:        { bg: "bg-solace",      text: "text-bark",   border: "border-solace" },
  Social:      { bg: "bg-terracota",   text: "text-white",  border: "border-terracota" },
  Break:       { bg: "bg-pale-teal",   text: "text-bark",   border: "border-pale-teal" },
  "Team Time": { bg: "bg-bright-teal", text: "text-white",  border: "border-bright-teal" },
};

function AgendaCard({ item, expanded, onToggle, hideTime }: {
  item: AgendaItem; expanded: boolean; onToggle: () => void; hideTime?: boolean;
}) {
  const cat = CAT_COLORS[item.category] || CAT_COLORS.Session;

  return (
    <button onClick={onToggle} className={`w-full h-full text-left bg-white rounded-xl p-4 border-l-4 ${cat.border}`}>
      <div className="flex justify-between items-center mb-1">
        {!hideTime && (
          <span className="text-xs font-medium text-bark-mid">
            {item.startTime} &ndash; {item.endTime}
          </span>
        )}
        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${cat.bg} ${cat.text} ${hideTime ? "" : ""}`}>
          {item.category}
        </span>
      </div>
      <p className="font-semibold text-base text-bark">{item.title}</p>
      {item.speaker && <p className="text-[13px] text-bark-mid mt-0.5">{item.speaker}</p>}
      {item.room && (
        <p className="text-xs text-bark-mid mt-1 flex items-center gap-1">📍 {item.room}</p>
      )}

      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          {item.description && <p className="text-sm text-bark leading-relaxed mb-3">{item.description}</p>}
          <div className="flex gap-2">
            <span
              onClick={(e) => { e.stopPropagation(); downloadIcs(item); }}
              className="inline-flex items-center gap-1 text-sm font-semibold text-bright-teal bg-sky px-3 py-2 rounded-lg cursor-pointer active:opacity-70"
            >
              📅 Add to Calendar
            </span>
          </div>
        </div>
      )}
    </button>
  );
}

type TimeGroup = { timeSlot: string; items: { item: AgendaItem; originalIdx: number }[] };

function groupByTimeSlot(items: AgendaItem[]): TimeGroup[] {
  const groups: TimeGroup[] = [];
  for (let i = 0; i < items.length; i++) {
    const slot = `${items[i].startTime}-${items[i].endTime}`;
    const last = groups[groups.length - 1];
    if (last && last.timeSlot === slot) {
      last.items.push({ item: items[i], originalIdx: i });
    } else {
      groups.push({ timeSlot: slot, items: [{ item: items[i], originalIdx: i }] });
    }
  }
  return groups;
}

export default function AgendaPage() {
  const { agenda, loading } = useData();
  const [day, setDay] = useState("Tuesday");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const items = agenda.filter((a) => a.day.toLowerCase() === day.toLowerCase());
  const groups = groupByTimeSlot(items);

  return (
    <div className="pb-4">
      {/* Day Tabs */}
      <div className="flex gap-2 px-4 py-3 bg-white border-b border-gray-200">
        {DAYS.map((d) => (
          <button
            key={d}
            onClick={() => { setDay(d); setExpandedIdx(null); }}
            className={`flex-1 text-center py-2 rounded-xl text-sm font-semibold transition-colors ${
              day === d ? "bg-lake text-white" : "bg-cream text-lake"
            }`}
          >
            {d.slice(0, 3)}
            <span className={`block text-[11px] font-normal ${day === d ? "text-pale-teal" : "text-bark-mid"}`}>
              {DAY_LABELS[d]}
            </span>
          </button>
        ))}
      </div>

      {/* Sessions */}
      <div className="space-y-2 px-4 mt-3">
        {items.length === 0 && !loading && (
          <div className="text-center py-16 text-bark-mid">
            <p className="text-4xl mb-2">📅</p>
            <p>No sessions for this day yet</p>
          </div>
        )}
        {groups.map((group) => {
          if (group.items.length === 1) {
            const { item, originalIdx } = group.items[0];
            return (
              <AgendaCard
                key={`${item.day}-${item.startTime}-${originalIdx}`}
                item={item}
                expanded={expandedIdx === originalIdx}
                onToggle={() => setExpandedIdx(expandedIdx === originalIdx ? null : originalIdx)}
              />
            );
          }

          const first = group.items[0].item;
          return (
            <div key={`group-${first.startTime}-${first.endTime}`} className="bg-white/50 rounded-2xl p-3 border border-bright-teal/30">
              <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-xs font-medium text-bark-mid">
                  {first.startTime} &ndash; {first.endTime}
                </span>
                <span className="text-[10px] font-semibold text-bright-teal bg-sky px-2 py-0.5 rounded-full">
                  Choose one &middot; {group.items.length} options
                </span>
              </div>
              <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-1 -mx-1 px-1 items-stretch">
                {group.items.map(({ item, originalIdx }) => (
                  <div key={originalIdx} className="snap-start shrink-0 w-[75%] flex">
                    <AgendaCard
                      item={item}
                      expanded={expandedIdx === originalIdx}
                      onToggle={() => setExpandedIdx(expandedIdx === originalIdx ? null : originalIdx)}
                      hideTime
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
