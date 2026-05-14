"use client";

import { useState } from "react";
import { useData } from "@/lib/data-context";

const HIDDEN_QUESTIONS = new Set([
  "Why Dallas?",
  "How do I book my stay?",
  "How do I book my flight?",
  "Is there a specific dollar limit for flight bookings?",
  "Do I have to use the Workgrounds platform to book my flight?",
  "How do I update my shirt size if I already claimed my room?",
  "Can I change my dates?",
  "When is the cutoff date for new joiners to attend Shift?",
  "Is attendance mandatory?",
  "How do I get my swag if I am not attending?",
]);

export default function FaqPage() {
  const { faq, loading } = useData();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = faq.filter((item) => !HIDDEN_QUESTIONS.has(item.question));

  const sections: Record<string, typeof faq> = {};
  filtered.forEach((item) => {
    if (!sections[item.section]) sections[item.section] = [];
    sections[item.section].push(item);
  });
  Object.values(sections).forEach((items) => items.sort((a, b) => a.order - b.order));

  return (
    <div className="px-4 py-4 pb-4">
      <h1 className="font-heading text-[26px] text-lake mb-1">Frequently Asked Questions</h1>
      <p className="text-sm text-bark-mid mb-6">Everything you need to know about Shift 2026</p>

      {Object.entries(sections).map(([section, items]) => (
        <div key={section} className="mb-6">
          <p className="text-xs font-semibold tracking-[2px] text-lake">{section.toUpperCase()}</p>
          <div className="h-0.5 w-10 bg-solace mt-1 mb-3" />
          <div className="space-y-2">
            {items.map((item, i) => {
              const id = `${section}-${i}`;
              const open = expandedId === id;
              return (
                <button
                  key={id}
                  onClick={() => setExpandedId(open ? null : id)}
                  className="w-full text-left bg-white rounded-xl p-4"
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-semibold text-[15px] text-lake flex-1">{item.question}</p>
                    <svg
                      className={`w-4 h-4 text-solace shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {open && (
                    <p className="text-sm text-bark leading-relaxed mt-3 pt-3 border-t border-gray-100 whitespace-pre-line">
                      {item.answer.replace(/\\n/g, "\n")}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {filtered.length === 0 && !loading && (
        <div className="text-center py-16 text-bark-mid">
          <p className="text-4xl mb-2">❓</p>
          <p>FAQs will appear here</p>
        </div>
      )}
    </div>
  );
}
