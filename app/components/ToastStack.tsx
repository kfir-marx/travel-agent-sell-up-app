"use client";

import { useDemo } from "../lib/store";

export default function ToastStack() {
  const { toasts, dismissToast } = useDemo();

  return (
    <div className="pointer-events-none fixed top-6 right-6 z-[100] flex w-[min(380px,calc(100vw-3rem))] flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="toast-enter pointer-events-auto overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 text-slate-100 shadow-2xl backdrop-blur"
        >
          <div className="flex items-start gap-3 px-4 py-3">
            <div
              className={`mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full text-sm font-bold ${
                t.tone === "success"
                  ? "bg-emerald-500/15 text-emerald-300"
                  : t.tone === "error"
                    ? "bg-rose-500/15 text-rose-300"
                    : "bg-sky-500/15 text-sky-300"
              }`}
            >
              {t.tone === "success" ? "✓" : t.tone === "error" ? "!" : "i"}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold tracking-tight">{t.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-300">{t.body}</p>
            </div>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => dismissToast(t.id)}
              className="text-slate-500 transition hover:text-slate-200"
            >
              ×
            </button>
          </div>
          <div
            className={`h-0.5 origin-left animate-[toast-progress_4.2s_linear_forwards] ${
              t.tone === "success"
                ? "bg-emerald-400"
                : t.tone === "error"
                  ? "bg-rose-400"
                  : "bg-sky-400"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
