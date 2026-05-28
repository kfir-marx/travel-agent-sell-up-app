const usdNoDecimals = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const usdWithDecimals = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export function formatUsd(value: number, opts?: { decimals?: boolean }) {
  return opts?.decimals ? usdWithDecimals.format(value) : usdNoDecimals.format(value);
}

const dateMedium = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const dateShort = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

export function formatDate(iso: string) {
  return dateMedium.format(new Date(iso + "T00:00:00"));
}

export function formatDateShort(iso: string) {
  return dateShort.format(new Date(iso + "T00:00:00"));
}

export function formatDateRange(startIso: string, endIso: string) {
  const startDate = new Date(startIso + "T00:00:00");
  const endDate = new Date(endIso + "T00:00:00");
  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  if (sameYear) {
    return `${dateShort.format(startDate)} – ${dateMedium.format(endDate)}`;
  }
  return `${dateMedium.format(startDate)} – ${dateMedium.format(endDate)}`;
}

export function nightsBetween(startIso: string, endIso: string) {
  const start = new Date(startIso + "T00:00:00").getTime();
  const end = new Date(endIso + "T00:00:00").getTime();
  return Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
}

export function formatPercent(value: number, digits = 0) {
  return `${(value * 100).toFixed(digits)}%`;
}
