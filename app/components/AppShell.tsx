"use client";

import { useDemo } from "../lib/store";
import AgentView from "./AgentView";
import AgencyView from "./AgencyView";
import ToastStack from "./ToastStack";

export default function AppShell() {
  const { view, setView, agents, activeAgentId } = useDemo();
  const me = agents.find((a) => a.id === activeAgentId)!;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-sm font-bold text-white shadow-sm">
              A
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                Atlas Travel
              </p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                Upsell Suite
              </p>
            </div>
          </div>

          <ViewToggle current={view} onChange={setView} />

          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-xs font-semibold text-slate-900">{me.name}</p>
              <p className="text-[11px] text-slate-500">Senior Travel Agent</p>
            </div>
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${me.avatarTint} text-xs font-semibold text-white shadow-sm ring-2 ring-white`}
            >
              {me.initials}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div key={view} className="view-fade">
          {view === "agent" ? <AgentView /> : <AgencyView />}
        </div>
      </main>

      <ToastStack />
    </div>
  );
}

function ViewToggle({
  current,
  onChange,
}: {
  current: "agent" | "agency";
  onChange: (v: "agent" | "agency") => void;
}) {
  return (
    <div className="relative flex items-center rounded-full border border-slate-200 bg-slate-100/80 p-1 shadow-inner">
      <span
        aria-hidden
        className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: current === "agent" ? "translateX(0)" : "translateX(100%)" }}
      />
      <button
        type="button"
        onClick={() => onChange("agent")}
        className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition ${
          current === "agent" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Agent
      </button>
      <button
        type="button"
        onClick={() => onChange("agency")}
        className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition ${
          current === "agency" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Agency
      </button>
    </div>
  );
}
