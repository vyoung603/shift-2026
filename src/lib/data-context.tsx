"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import {
  fetchAgenda, fetchFaq, fetchNeighborhood, fetchConfig,
  AgendaItem, FaqItem, NeighborhoodItem,
} from "./sheets";

type SheetData = {
  agenda: AgendaItem[];
  faq: FaqItem[];
  neighborhood: NeighborhoodItem[];
  config: Record<string, string>;
  loading: boolean;
  lastUpdated: number | null;
};

const CACHE_KEY = "shift_sheet_data";
const DataContext = createContext<SheetData & { refresh: () => void }>({
  agenda: [], faq: [], neighborhood: [], config: {},
  loading: true, lastUpdated: null, refresh: () => {},
});

function loadCache(): Omit<SheetData, "loading"> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveCache(data: Omit<SheetData, "loading">) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch {}
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SheetData>({
    agenda: [], faq: [], neighborhood: [], config: {},
    loading: true, lastUpdated: null,
  });

  const load = useCallback(async () => {
    const cached = loadCache();
    if (cached) setData((d) => ({ ...d, ...cached, loading: true }));

    try {
      const [agenda, faq, neighborhood, config] = await Promise.all([
        fetchAgenda(), fetchFaq(), fetchNeighborhood(), fetchConfig(),
      ]);
      const fresh = { agenda, faq, neighborhood, config, lastUpdated: Date.now() };
      setData({ ...fresh, loading: false });
      saveCache(fresh);
    } catch {
      setData((d) => ({ ...d, loading: false }));
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <DataContext.Provider value={{ ...data, refresh: load }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
