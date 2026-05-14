import { AgendaItem } from "./sheets";

function pad(n: number) { return n.toString().padStart(2, "0"); }

function toIcsDate(dateStr: string, timeStr: string): string {
  const d = new Date(dateStr);
  const [time, period] = timeStr.split(" ");
  const [hStr, mStr] = time.split(":");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (period?.toUpperCase() === "PM" && h !== 12) h += 12;
  if (period?.toUpperCase() === "AM" && h === 12) h = 0;
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(h)}${pad(m)}00`;
}

export function generateIcs(item: AgendaItem): string {
  const dtStart = toIcsDate(item.date, item.startTime);
  const dtEnd = toIcsDate(item.date, item.endTime);
  const desc = [item.description, item.speaker ? `Speaker: ${item.speaker}` : ""]
    .filter(Boolean).join("\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SM Shift 2026//EN",
    "BEGIN:VEVENT",
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${item.title}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:Omni Las Colinas${item.room ? ` - ${item.room}` : ""}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(item: AgendaItem) {
  const ics = generateIcs(item);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${item.title.replace(/[^a-zA-Z0-9]/g, "-")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
