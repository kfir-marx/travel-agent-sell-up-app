import BookingForm from "./components/BookingForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
              TA
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Atlas Travel</p>
              <p className="text-xs text-slate-500">Agent Dashboard</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#" className="font-medium text-slate-900">
              Bookings
            </a>
            <a href="#" className="hover:text-slate-900">
              Customers
            </a>
            <a href="#" className="hover:text-slate-900">
              Reports
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-600 sm:inline">Sarah Chen</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
              SC
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              New Booking
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Enter customer travel details to create a booking and notify the agent.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BookingForm />
          </div>

          <aside className="space-y-4">
            <StatCard label="Bookings this week" value="24" trend="+12%" />
            <StatCard label="Upsell conversion" value="38%" trend="+4.2%" />
            <StatCard label="Avg. ticket value" value="$1,420" trend="+$85" />
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tip
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Confirmed flights automatically surface bulk-rate hotel options to your
                agent on WhatsApp — increasing margin without extra outreach.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        <p className="text-xs font-medium text-emerald-600">{trend}</p>
      </div>
    </div>
  );
}
