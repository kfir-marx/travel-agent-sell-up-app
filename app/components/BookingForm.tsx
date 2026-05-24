"use client";

import { useState, useTransition } from "react";
import { bookFlight, type BookingInput } from "../actions";

type Toast = {
  type: "success" | "error";
  message: string;
};

const initialForm: BookingInput = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  destination: "",
  departureDate: "",
  returnDate: "",
};

export default function BookingForm() {
  const [form, setForm] = useState<BookingInput>(initialForm);
  const [toast, setToast] = useState<Toast | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleChange(field: keyof BookingInput) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setToast(null);
    startTransition(async () => {
      const result = await bookFlight(form);
      if (result.ok) {
        setToast({
          type: "success",
          message: `Booking confirmed for ${form.customerName}. Agent notified via WhatsApp.`,
        });
        setForm(initialForm);
      } else {
        setToast({ type: "error", message: result.error });
      }
    });
  }

  return (
    <div className="relative">
      {toast && (
        <div
          role="status"
          className={`fixed top-6 right-6 z-50 max-w-sm rounded-lg border px-4 py-3 shadow-lg ${
            toast.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          <div className="flex items-start gap-3">
            <span
              className={`mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full text-xs font-bold text-white ${
                toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
              }`}
            >
              {toast.type === "success" ? "✓" : "!"}
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">
                {toast.type === "success" ? "Booking confirmed" : "Something went wrong"}
              </p>
              <p className="mt-1 text-sm leading-snug">{toast.message}</p>
            </div>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <div className="mb-6 border-b border-slate-100 pb-6">
          <h2 className="text-xl font-semibold text-slate-900">Book a Flight</h2>
          <p className="mt-1 text-sm text-slate-500">
            Capture your customer&apos;s travel details. Your travel agent will be notified
            on WhatsApp once the booking is submitted.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Customer Name" htmlFor="customerName">
            <input
              id="customerName"
              type="text"
              required
              autoComplete="name"
              value={form.customerName}
              onChange={handleChange("customerName")}
              placeholder="Jane Doe"
              className={inputClass}
            />
          </Field>

          <Field label="Customer Email" htmlFor="customerEmail">
            <input
              id="customerEmail"
              type="email"
              required
              autoComplete="email"
              value={form.customerEmail}
              onChange={handleChange("customerEmail")}
              placeholder="jane@example.com"
              className={inputClass}
            />
          </Field>

          <Field label="Customer Phone Number" htmlFor="customerPhone">
            <input
              id="customerPhone"
              type="tel"
              required
              autoComplete="tel"
              value={form.customerPhone}
              onChange={handleChange("customerPhone")}
              placeholder="+1 555 010 1234"
              className={inputClass}
            />
          </Field>

          <Field label="Destination" htmlFor="destination">
            <input
              id="destination"
              type="text"
              required
              value={form.destination}
              onChange={handleChange("destination")}
              placeholder="Lisbon, Portugal"
              className={inputClass}
            />
          </Field>

          <Field label="Departure Date" htmlFor="departureDate">
            <input
              id="departureDate"
              type="date"
              required
              value={form.departureDate}
              onChange={handleChange("departureDate")}
              className={inputClass}
            />
          </Field>

          <Field label="Return Date" htmlFor="returnDate">
            <input
              id="returnDate"
              type="date"
              required
              value={form.returnDate}
              onChange={handleChange("returnDate")}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-500">
            By submitting, a WhatsApp confirmation is sent to your assigned travel agent.
          </p>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Spinner />
                Submitting…
              </>
            ) : (
              <>Confirm Booking</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputClass =
  "block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
