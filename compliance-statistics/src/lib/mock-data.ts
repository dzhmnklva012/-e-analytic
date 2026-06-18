import type {
  Company,
  CompanyRow,
  CompanyStatus,
  Period,
  StatisticsData,
  SignedSplit,
} from "@/lib/types";

export const COMPANIES: Company[] = [
  { id: "all", name: "Все компании" },
  { id: "adata-hq", name: "ADATA Holding" },
  { id: "adata-finance", name: "ADATA Finance" },
  { id: "adata-logistics", name: "ADATA Logistics" },
  { id: "adata-retail", name: "ADATA Retail" },
  { id: "adata-digital", name: "ADATA Digital" },
];

export const PERIOD_LABELS: Record<Period, string> = {
  today: "Сегодня",
  week: "Неделя",
  month: "Месяц",
  quarter: "Квартал",
  year: "Год",
  custom: "Произвольный период",
};

const MONTHS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

// Tiny deterministic seeded RNG so each company + period shows stable numbers.
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h) + 1;
}

function split(rng: () => number, base: number): SignedSplit {
  const total = Math.round(base * (0.7 + rng() * 0.8));
  const signed = Math.round(total * (0.45 + rng() * 0.4));
  return { total, signed, unsigned: total - signed };
}

const PERIOD_SCALE: Record<Period, number> = {
  today: 0.18,
  week: 0.5,
  month: 1,
  quarter: 2.6,
  year: 9,
  custom: 1.4,
};

function companyBin(id: string): string {
  return (hash(id) * 99991).toString().padStart(12, "0").slice(-12);
}

function buildCompanyRow(c: Company, period: Period): CompanyRow {
  const rng = seeded(hash(c.id) * 17 + hash(period) * 5);
  const k = PERIOD_SCALE[period] ?? 1;
  const checksTotal = Math.round(80 * k * (0.6 + rng()));
  const checksSigned = Math.round(checksTotal * (0.5 + rng() * 0.4));
  const roll = rng();
  const status: CompanyStatus =
    roll > 0.86 ? "archived" : roll > 0.66 ? "review" : "active";
  return {
    id: c.id,
    name: c.name,
    bin: companyBin(c.id),
    checksSigned,
    checksTotal,
    tasks: Math.round(60 * k * (0.5 + rng())),
    hotline: Math.round(30 * k * (0.4 + rng())),
    conflictFound: rng() < 0.3,
    status,
  };
}

/** Companies (Users) table rows for the current scope. */
export function buildCompanies(companyId: string, period: Period): CompanyRow[] {
  const list = COMPANIES.filter((c) => c.id !== "all");
  const scoped = companyId === "all" ? list : list.filter((c) => c.id === companyId);
  return scoped.map((c) => buildCompanyRow(c, period));
}

export function buildStatistics(companyId: string, period: Period): StatisticsData {
  const rng = seeded(hash(companyId) * 7 + hash(period) * 13);
  const k = PERIOD_SCALE[period] ?? 1;
  const n = (base: number) => Math.max(0, Math.round(base * k * (0.75 + rng() * 0.6)));
  const delta = () => Math.round(rng() * 34 - 11);

  return {
    tasks: {
      planned: n(34),
      completed: n(120),
      inProgress: n(28),
      pending: n(16),
      other: n(9),
    },
    companyFiles: {
      checks: split(rng, 90 * k),
      conclusions: split(rng, 64 * k),
      data: split(rng, 210 * k),
    },
    employeeFiles: {
      inspections: split(rng, 140 * k),
      conclusions: split(rng, 96 * k),
      byMonth: MONTHS.slice(0, 12).map((month) => {
        const total = Math.round(18 * (0.5 + rng() * 1.2) * Math.min(k, 3));
        const signed = Math.round(total * (0.5 + rng() * 0.4));
        return { month, signed, unsigned: total - signed };
      }),
    },
    hotline: (() => {
      const nw = n(14);
      const ip = n(16);
      const cm = n(58);
      return { total: nw + ip + cm, new: nw, inProgress: ip, completed: cm };
    })(),
    investigations: (() => {
      const nw = n(7);
      const ip = n(9);
      const cm = n(26);
      return { total: nw + ip + cm, new: nw, inProgress: ip, completed: cm };
    })(),
    conflict: (() => {
      const total = n(48);
      const found = Math.round(total * (0.2 + rng() * 0.25));
      return { total, found, notFound: total - found };
    })(),
    gifts: {
      declarations: n(73),
      gifts: n(58),
      donors: n(40),
      recipients: n(46),
    },
  };
}

/** A fully-zeroed dataset used to render the empty state. */
export const EMPTY_STATISTICS: StatisticsData = {
  tasks: { planned: 0, completed: 0, inProgress: 0, pending: 0, other: 0 },
  companyFiles: {
    checks: { total: 0, signed: 0, unsigned: 0 },
    conclusions: { total: 0, signed: 0, unsigned: 0 },
    data: { total: 0, signed: 0, unsigned: 0 },
  },
  employeeFiles: {
    inspections: { total: 0, signed: 0, unsigned: 0 },
    conclusions: { total: 0, signed: 0, unsigned: 0 },
    byMonth: [],
  },
  hotline: { total: 0, new: 0, completed: 0, inProgress: 0 },
  investigations: { total: 0, new: 0, completed: 0, inProgress: 0 },
  conflict: { total: 0, found: 0, notFound: 0 },
  gifts: { declarations: 0, gifts: 0, donors: 0, recipients: 0 },
};

export interface FetchParams {
  companyId: string;
  period: Period;
  /** Forces a thrown error — used to demo the error state. */
  forceError?: boolean;
  /** Returns the empty dataset — used to demo the empty state. */
  forceEmpty?: boolean;
  signal?: AbortSignal;
}

/** Simulated async fetch with latency, abort support and error path. */
export function fetchStatistics({
  companyId,
  period,
  forceError,
  forceEmpty,
  signal,
}: FetchParams): Promise<StatisticsData> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (forceError) {
        reject(new Error("Не удалось загрузить статистику. Сервер недоступен."));
        return;
      }
      resolve(forceEmpty ? EMPTY_STATISTICS : buildStatistics(companyId, period));
    }, 900);

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}
