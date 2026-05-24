import { AgendaItem } from "./sheets";

function pad(n: number) { return n.toString().padStart(2, "0"); }

function toGcalDate(dateStr: string, timeStr: string): string {
  const d = new Date(dateStr);
  const [time, period] = timeStr.split(" ");
  const [hStr, mStr] = time.split(":");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (period?.toUpperCase() === "PM" && h !== 12) h += 12;
  if (period?.toUpperCase() === "AM" && h === 12) h = 0;
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(h)}${pad(m)}00`;
}

export function openCalendar(item: AgendaItem) {
  const start = toGcalDate(item.date, item.startTime);
  const end = toGcalDate(item.date, item.endTime);
  const details = [item.description, item.speaker ? `Speaker: ${item.speaker}` : ""]
    .filter(Boolean).join("\n");
  const location = `Omni Las Colinas${item.room ? ` - ${item.room}` : ""}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: item.title,
    dates: `${start}/${end}`,
    details,
    location,
    ctz: "America/Chicago",
  });

  window.open(`https://calendar.google.com/calendar/render?${params}`, "_blank");
}
