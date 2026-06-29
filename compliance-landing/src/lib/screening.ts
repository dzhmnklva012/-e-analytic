/**
 * Mock screening engine for the "Глобальная проверка" landing demo.
 * Deterministic (name-seeded) so the same company always yields the same
 * dossier — no network, no randomness, safe for SSR/marketing.
 */

export type RiskLevel = "low" | "medium" | "high";

export type SourceHit = {
  source: string;
  status: "clear" | "match" | "review";
  detail: string;
};

export type Dossier = {
  company: string;
  country: string;
  riskLevel: RiskLevel;
  riskScore: number; // 0–100
  summary: string;
  sources: SourceHit[];
  flags: string[];
  checkedAt: string;
};

const COUNTRIES = ["Казахстан", "Россия", "Кипр", "ОАЭ", "Великобритания", "Турция"];

/** Stable hash so results are deterministic per company name. */
function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function isValidCompanyName(value: string): boolean {
  return value.trim().length >= 2;
}

export function screen(companyRaw: string): Dossier {
  const company = companyRaw.trim();
  const seed = hash(company.toLowerCase());
  const score = seed % 100;

  const riskLevel: RiskLevel = score >= 66 ? "high" : score >= 33 ? "medium" : "low";
  const country = COUNTRIES[seed % COUNTRIES.length];

  const sanctionsMatch = riskLevel === "high";
  const pepReview = riskLevel !== "low";

  const sources: SourceHit[] = [
    {
      source: "Санкционные списки (OFAC, EU, UN)",
      status: sanctionsMatch ? "match" : "clear",
      detail: sanctionsMatch
        ? "Найдено совпадение по связанному лицу"
        : "Совпадений не найдено",
    },
    {
      source: "Реестр PEP",
      status: pepReview ? "review" : "clear",
      detail: pepReview ? "Связь с публичным должностным лицом" : "Не является PEP",
    },
    {
      source: "Негативные публикации",
      status: riskLevel === "high" ? "review" : "clear",
      detail:
        riskLevel === "high"
          ? "Упоминания в расследованиях СМИ"
          : "Существенных упоминаний нет",
    },
    {
      source: "Корпоративные реестры",
      status: "clear",
      detail: "Действующее юридическое лицо",
    },
  ];

  const flags: string[] = [];
  if (sanctionsMatch) flags.push("Санкционный риск");
  if (pepReview) flags.push("PEP-связь");
  if (riskLevel === "high") flags.push("Негативный медиафон");
  if (flags.length === 0) flags.push("Существенных рисков не выявлено");

  const summary =
    riskLevel === "high"
      ? "Выявлены существенные риски. Рекомендуется углублённая проверка и открытие дела."
      : riskLevel === "medium"
        ? "Обнаружены факторы, требующие внимания. Рекомендуется дополнительная проверка."
        : "Контрагент выглядит благонадёжно. Существенных рисков не выявлено.";

  return {
    company,
    country,
    riskLevel,
    riskScore: score,
    summary,
    sources,
    flags,
    checkedAt: "только что",
  };
}

export const riskMeta: Record<
  RiskLevel,
  { label: string; tone: "low" | "medium" | "high" }
> = {
  low: { label: "Низкий риск", tone: "low" },
  medium: { label: "Средний риск", tone: "medium" },
  high: { label: "Высокий риск", tone: "high" },
};

/** Suggested example companies for the empty state. */
export const exampleCompanies = ["GAZPROMBANK", "ТОО «Альфа Логистик»", "Nordwind Trading Ltd"];
