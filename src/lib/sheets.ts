const SHEET_ID = "1eyaJ5FmWBZVO4bc4jfW04STa7ciRXeYczswYT8FTEgo";

function buildCsvUrl(tabName: string): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

function splitCsvRows(csv: string): string[] {
  const rows: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && csv[i + 1] === "\n") i++;
      if (current.trim()) rows.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) rows.push(current);
  return rows;
}

function parseCsv(csv: string): Record<string, string>[] {
  const lines = splitCsvRows(csv);
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = values[i] || ""));
    return row;
  });
}

async function fetchCsv(tabName: string): Promise<string> {
  const res = await fetch(buildCsvUrl(tabName));
  if (!res.ok) throw new Error(`Failed to fetch ${tabName}: ${res.status}`);
  return res.text();
}

export type AgendaItem = {
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  speaker: string;
  category: string;
  room: string;
  description: string;
};

export type FaqItem = {
  section: string;
  question: string;
  answer: string;
  order: number;
};

export type NeighborhoodItem = {
  category: string;
  name: string;
  walkingTime: string;
  description: string;
  address: string;
  mapsUrl: string;
  order: number;
};

export async function fetchAgenda(): Promise<AgendaItem[]> {
  const csv = await fetchCsv("agenda");
  return parseCsv(csv).map((r) => ({
    day: r.day || "",
    date: r.date || "",
    startTime: r.startTime || "",
    endTime: r.endTime || "",
    title: r.title || "",
    speaker: r.speaker || "",
    category: r.category || "",
    room: r.room || "",
    description: r.description || "",
  }));
}

export async function fetchFaq(): Promise<FaqItem[]> {
  const csv = await fetchCsv("faq");
  return parseCsv(csv).map((r) => ({
    section: r.section || "",
    question: r.question || "",
    answer: r.answer || "",
    order: parseInt(r.order, 10) || 0,
  }));
}

export async function fetchNeighborhood(): Promise<NeighborhoodItem[]> {
  const csv = await fetchCsv("neighborhood");
  return parseCsv(csv).map((r) => ({
    category: r.category || "",
    name: r.name || "",
    walkingTime: r.walkingTime || "",
    description: r.description || "",
    address: r.address || "",
    mapsUrl: r.mapsUrl || "",
    order: parseInt(r.order, 10) || 0,
  }));
}

export async function fetchConfig(): Promise<Record<string, string>> {
  const csv = await fetchCsv("config");
  const config: Record<string, string> = {};
  parseCsv(csv).forEach((r) => {
    if (r.key) config[r.key] = r.value || "";
  });
  return config;
}
