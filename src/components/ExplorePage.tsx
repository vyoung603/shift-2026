"use client";

import { useData } from "@/lib/data-context";

const CAT_ICONS: Record<string, string> = {
  "Coffee & Tea": "☕",
  "Food & Drink": "🍽️",
  Attractions: "🧭",
};

export default function ExplorePage() {
  const { neighborhood, loading } = useData();

  const categories: Record<string, typeof neighborhood> = {};
  neighborhood.forEach((item) => {
    if (!categories[item.category]) categories[item.category] = [];
    categories[item.category].push(item);
  });
  Object.values(categories).forEach((items) => items.sort((a, b) => a.order - b.order));

  return (
    <div className="px-4 py-4 pb-4">
      {/* Hotel Card */}
      <a
        href="https://www.google.com/maps/search/Omni+Las+Colinas+Hotel+Irving+TX"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-lake rounded-2xl p-6 mb-6 text-white"
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-pale-teal mb-1">Our Home for the Week</p>
            <h2 className="font-heading text-[22px]">Omni Las Colinas Hotel</h2>
          </div>
          <span className="text-bright-teal text-xl">🧭</span>
        </div>
        <p className="text-[13px] text-pale-teal">221 E. Las Colinas Blvd, Irving, TX 75039</p>
        <p className="text-[13px] text-pale-teal mb-2">(972) 556-0800</p>
        <p className="text-[13px] text-pale-teal leading-relaxed">
          Resort-style pool, fitness center, on-site dining, steps from the Mandalay Canal Walk.
          All Shift programming takes place at or near the hotel.
        </p>
      </a>

      {/* Practical Details */}
      <h2 className="font-heading text-[22px] text-lake mb-3">Practical Details</h2>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[
          { icon: "✈️", label: "Getting There", text: "DFW ~10 min\nLove Field ~20 min" },
          { icon: "☀️", label: "Weather in May", text: "Highs 85-90°F\nPack layers for AC" },
          { icon: "🚗", label: "Parking & Transit", text: "No car needed\nLyft code provided" },
        ].map((d) => (
          <div key={d.label} className="bg-white rounded-xl p-3 text-center">
            <p className="text-xl mb-1">{d.icon}</p>
            <p className="text-[11px] font-semibold text-lake mb-1">{d.label}</p>
            <p className="text-[11px] text-bark-mid whitespace-pre-line">{d.text}</p>
          </div>
        ))}
      </div>

      {/* Nearby */}
      <h2 className="font-heading text-[22px] text-lake mb-3">What&apos;s Nearby</h2>

      {Object.entries(categories).map(([cat, items]) => (
        <div key={cat} className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span>{CAT_ICONS[cat] || "📍"}</span>
            <span className="font-semibold text-base text-lake">{cat}</span>
          </div>
          <div className="space-y-2">
            {items.map((place, i) => (
              <a
                key={`${cat}-${i}`}
                href={place.mapsUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-[15px] text-bark flex-1">{place.name}</span>
                  {place.walkingTime && (
                    <span className="flex items-center gap-1 bg-sky text-bright-teal text-[11px] font-semibold px-2 py-0.5 rounded-full">
                      🚶 {place.walkingTime}
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-bark-mid leading-relaxed mb-2">{place.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-[11px] text-bark-mid truncate flex-1 mr-2">{place.address}</p>
                  {place.mapsUrl && (
                    <span className="text-[13px] font-semibold text-bright-teal flex items-center gap-1">
                      🧭 Directions
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}

      {neighborhood.length === 0 && !loading && (
        <div className="text-center py-16 text-bark-mid">
          <p className="text-4xl mb-2">🧭</p>
          <p>Neighborhood info will appear here</p>
        </div>
      )}
    </div>
  );
}
