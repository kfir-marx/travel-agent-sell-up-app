"use client";

import { useMemo, useState } from "react";
import { useDemo } from "../lib/store";
import { formatUsd } from "../lib/format";
import type { Flight } from "../lib/types";
import FlightCard from "./FlightCard";
import FlightDetailModal from "./FlightDetailModal";

export default function AgentView() {
  const { flights, activeAgentId } = useDemo();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const myFlights = useMemo(
    () => flights.filter((f) => f.agentId === activeAgentId),
    [flights, activeAgentId],
  );

  const open = useMemo(
    () => myFlights.filter((f) => f.status === "open"),
    [myFlights],
  );
  const handled = useMemo(
    () => myFlights.filter((f) => f.status !== "open"),
    [myFlights],
  );

  const sortedOpen = useMemo(() => sortByDeparture(open), [open]);
  const sortedHandled = useMemo(() => sortByDeparture(handled), [handled]);

  const potentialUsd = useMemo(
    () => open.reduce((s, f) => s + f.hotelCostUsd, 0),
    [open],
  );

  const selected = useMemo(
    () => myFlights.find((f) => f.id === selectedId) ?? null,
    [myFlights, selectedId],
  );

  return (
    <>
      <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            My Bookings
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Upcoming flights
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            {open.length} {open.length === 1 ? "booking is" : "bookings are"} open for a
            hotel upsell — about {formatUsd(potentialUsd * 0.01, { decimals: true })} in
            commission on the line.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
          <Pill tone="amber" count={open.length} label="Upsell available" />
          <Pill tone="slate" count={handled.length} label="Handled" />
        </div>
      </section>

      {sortedOpen.length > 0 && (
        <SectionHeader
          eyebrow="Open"
          title="Ready to upsell"
          hint="Click a card to send the WhatsApp offer."
        />
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedOpen.map((f, i) => (
          <FlightCard
            key={f.id}
            flight={f}
            stagger={i}
            onOpen={() => setSelectedId(f.id)}
          />
        ))}
      </div>

      {sortedHandled.length > 0 && (
        <>
          <div className="mt-12">
            <SectionHeader
              eyebrow="Closed"
              title="Already handled"
              hint="These bookings are no longer eligible for upsell."
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sortedHandled.map((f, i) => (
              <FlightCard key={f.id} flight={f} stagger={i} />
            ))}
          </div>
        </>
      )}

      <FlightDetailModal flight={selected} onClose={() => setSelectedId(null)} />
    </>
  );
}

function sortByDeparture(flights: Flight[]) {
  return [...flights].sort((a, b) => a.departureDate.localeCompare(b.departureDate));
}

function Pill({
  tone,
  count,
  label,
}: {
  tone: "amber" | "slate";
  count: number;
  label: string;
}) {
  const toneClass =
    tone === "amber"
      ? "bg-amber-50 text-amber-900 ring-amber-200"
      : "bg-slate-50 text-slate-700 ring-slate-200";
  return (
    <div
      className={`flex items-center gap-2 rounded-xl px-3 py-1.5 ring-1 ring-inset ${toneClass}`}
    >
      <span className="text-sm font-semibold tabular-nums">{count}</span>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  hint,
}: {
  eyebrow: string;
  title: string;
  hint: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-800">
          {title}
        </h2>
      </div>
      <p className="hidden text-xs text-slate-500 sm:block">{hint}</p>
    </div>
  );
}
