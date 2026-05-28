"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ACTIVE_AGENT_ID, AGENTS, FLIGHTS, HOTEL_COMMISSION_RATE } from "./mockData";
import type { Agent, Flight, FlightStatus, View } from "./types";

type Toast = {
  id: number;
  title: string;
  body: string;
  tone: "success" | "info" | "error";
};

type DemoStore = {
  flights: Flight[];
  agents: Agent[];
  activeAgentId: string;
  view: View;
  setView: (view: View) => void;
  markUpsold: (flightId: string) => void;
  markDeclined: (flightId: string) => void;
  pushToast: (toast: Omit<Toast, "id">) => void;
  toasts: Toast[];
  dismissToast: (id: number) => void;
};

const DemoContext = createContext<DemoStore | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [flights, setFlights] = useState<Flight[]>(FLIGHTS);
  const [view, setView] = useState<View>("agent");
  const [toasts, setToasts] = useState<Toast[]>([]);

  const updateStatus = useCallback((flightId: string, status: FlightStatus) => {
    setFlights((prev) =>
      prev.map((f) => (f.id === flightId ? { ...f, status } : f)),
    );
  }, []);

  const pushToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const markUpsold = useCallback(
    (flightId: string) => updateStatus(flightId, "upsold"),
    [updateStatus],
  );
  const markDeclined = useCallback(
    (flightId: string) => updateStatus(flightId, "declined"),
    [updateStatus],
  );

  const value = useMemo<DemoStore>(
    () => ({
      flights,
      agents: AGENTS,
      activeAgentId: ACTIVE_AGENT_ID,
      view,
      setView,
      markUpsold,
      markDeclined,
      pushToast,
      toasts,
      dismissToast,
    }),
    [flights, view, markUpsold, markDeclined, pushToast, toasts, dismissToast],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoStore {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside <DemoProvider>");
  return ctx;
}

export type AgencyMetrics = {
  totalFlights: number;
  upsoldCount: number;
  openCount: number;
  declinedCount: number;
  pastCount: number;
  closingRate: number;
  netProfit: number;
  potentialProfit: number;
  totalHotelRevenue: number;
};

export function useAgencyMetrics(): AgencyMetrics {
  const { flights } = useDemo();
  return useMemo(() => {
    const totalFlights = flights.length;
    let upsoldCount = 0;
    let openCount = 0;
    let declinedCount = 0;
    let pastCount = 0;
    let upsoldHotelTotal = 0;
    let openHotelTotal = 0;

    for (const f of flights) {
      switch (f.status) {
        case "upsold":
          upsoldCount += 1;
          upsoldHotelTotal += f.hotelCostUsd;
          break;
        case "open":
          openCount += 1;
          openHotelTotal += f.hotelCostUsd;
          break;
        case "declined":
          declinedCount += 1;
          break;
        case "past":
          pastCount += 1;
          break;
      }
    }

    const closingRate = totalFlights === 0 ? 0 : upsoldCount / totalFlights;
    const netProfit = upsoldHotelTotal * HOTEL_COMMISSION_RATE;
    const potentialProfit = openHotelTotal * HOTEL_COMMISSION_RATE;

    return {
      totalFlights,
      upsoldCount,
      openCount,
      declinedCount,
      pastCount,
      closingRate,
      netProfit,
      potentialProfit,
      totalHotelRevenue: upsoldHotelTotal,
    };
  }, [flights]);
}
