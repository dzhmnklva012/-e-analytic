/**
 * Mock AI screening engine for the landing-page hero demo.
 *
 * `screen(query)` simulates ADATA's "Глобальная проверка": it resolves after a
 * short delay with either a risk-scored dossier or a "no match" result.
 * Everything is deterministic (keyword + hash based) so the demo behaves
 * predictably without a backend.
 */

export type RiskLevel = "low" | "medium" | "high";

export interface SanctionHit {
  /** Sanctions / watch list name */
  list: string;
  /** Specific program or designation */
  program: string;
  /** Name as matched in the list */
  matchedName: string;
  /** Designation date */
  date: string;
}

export interface Dossier {
  found: true;
  company: string;
  jurisdiction: string;
  registered: string;
  riskLevel: RiskLevel;
  /** 0–100 */
  riskScore: number;
  summary: string;
  sanctionHits: SanctionHit[];
  sourcesChecked: string[];
  flags: string[];
}

export interface NoMatch {
  found: false;
  company: string;
}

export type ScreeningResult = Dossier | NoMatch;

/** Minimum characters before a query is considered valid. */
export const MIN_QUERY_LENGTH = 2;

/** Demo suggestions shown in the hero empty state. */
export const SUGGESTED_QUERIES = [
  "GAZPROMBANK",
  "Sberbank",
  "Rosneft",
  "ADATA Technology",
];

const SOURCES_BASE = [
  "OFAC SDN (США)",
  "EU Consolidated List",
  "HM Treasury (Великобритания)",
  "ООН — Security Council",
  "Interpol Red Notices",
  "OpenSanctions",
];

const NOT_FOUND = [
  "тест",
  "test",
  "ромашка",
  "ноунейм",
  "no name",
  "xxx",
  "пример",
];

interface KnownCompany {
  match: string[];
  dossier: Omit<Dossier, "found">;
}

const KNOWN_COMPANIES: KnownCompany[] = [
  {
    match: ["gazprombank", "газпромбанк"],
    dossier: {
      company: "GAZPROMBANK (АО «Газпромбанк»)",
      jurisdiction: "Российская Федерация",
      registered: "1990",
      riskLevel: "high",
      riskScore: 87,
      summary:
        "Компания включена в санкционные списки США, ЕС и Великобритании. Прямое взаимодействие требует юридической оценки и блокируется в большинстве юрисдикций.",
      sanctionHits: [
        {
          list: "OFAC SDN",
          program: "RUSSIA-EO14024",
          matchedName: "GAZPROMBANK JOINT STOCK COMPANY",
          date: "24.02.2022",
        },
        {
          list: "EU Consolidated List",
          program: "Regulation 833/2014",
          matchedName: "Gazprombank JSC",
          date: "21.07.2022",
        },
      ],
      sourcesChecked: SOURCES_BASE,
      flags: ["Санкции OFAC", "Санкции ЕС", "Ограничения SWIFT"],
    },
  },
  {
    match: ["sberbank", "сбербанк", "сбер"],
    dossier: {
      company: "Sberbank (ПАО «Сбербанк»)",
      jurisdiction: "Российская Федерация",
      registered: "1991",
      riskLevel: "high",
      riskScore: 91,
      summary:
        "Крупнейший банк под блокирующими санкциями США и ЕС. Корреспондентские отношения и расчёты в долларах США ограничены.",
      sanctionHits: [
        {
          list: "OFAC SDN",
          program: "RUSSIA-EO14024",
          matchedName: "SBERBANK OF RUSSIA",
          date: "06.04.2022",
        },
      ],
      sourcesChecked: SOURCES_BASE,
      flags: ["Блокирующие санкции", "Запрет корсчетов"],
    },
  },
  {
    match: ["rosneft", "роснефть"],
    dossier: {
      company: "Rosneft Oil Company",
      jurisdiction: "Российская Федерация",
      registered: "1993",
      riskLevel: "medium",
      riskScore: 64,
      summary:
        "Секторальные ограничения по привлечению финансирования. Не блокирующие, но требуют контроля сделок и комплаенс-сопровождения.",
      sanctionHits: [
        {
          list: "OFAC SSI",
          program: "Sectoral Sanctions",
          matchedName: "ROSNEFT OIL COMPANY",
          date: "16.07.2014",
        },
      ],
      sourcesChecked: SOURCES_BASE,
      flags: ["Секторальные ограничения"],
    },
  },
  {
    match: ["adata", "адата"],
    dossier: {
      company: "ADATA Technology",
      jurisdiction: "Республика Казахстан",
      registered: "2015",
      riskLevel: "low",
      riskScore: 8,
      summary:
        "Совпадений в санкционных и международных списках не выявлено. Риск низкий — компания доступна для сотрудничества по итогам проверки.",
      sanctionHits: [],
      sourcesChecked: SOURCES_BASE,
      flags: [],
    },
  },
];

function normalize(query: string): string {
  return query.trim().toLowerCase();
}

/** Stable hash for deterministic generated dossiers. */
function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h << 5) - h + value.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function generatedDossier(query: string): Dossier {
  const score = hash(query) % 100;
  const riskLevel: RiskLevel =
    score >= 70 ? "high" : score >= 35 ? "medium" : "low";
  const titled = query.trim().replace(/\s+/g, " ");
  const sanctionHits: SanctionHit[] =
    riskLevel === "high"
      ? [
          {
            list: "OpenSanctions",
            program: "Watchlist match",
            matchedName: titled.toUpperCase(),
            date: "—",
          },
        ]
      : [];
  return {
    found: true,
    company: titled,
    jurisdiction: "Не определена",
    registered: "—",
    riskLevel,
    riskScore: score,
    summary:
      riskLevel === "high"
        ? "Обнаружены потенциальные совпадения в списках наблюдения. Рекомендуется углублённая проверка и открытие расследования."
        : riskLevel === "medium"
          ? "Прямых санкционных совпадений нет, но выявлены факторы, требующие дополнительной проверки источников."
          : "Совпадений в санкционных списках не обнаружено. Базовый риск низкий — рекомендуется стандартная процедура KYC.",
    sanctionHits,
    sourcesChecked: SOURCES_BASE,
    flags: riskLevel === "low" ? [] : ["Требуется дополнительная проверка"],
  };
}

const SCREENING_DELAY_MS = 1200;

export function screen(query: string): Promise<ScreeningResult> {
  const normalized = normalize(query);
  return new Promise((resolve) => {
    setTimeout(() => {
      if (NOT_FOUND.some((term) => normalized.includes(term))) {
        resolve({ found: false, company: query.trim() });
        return;
      }
      const known = KNOWN_COMPANIES.find((entry) =>
        entry.match.some((term) => normalized.includes(term)),
      );
      if (known) {
        resolve({ found: true, ...known.dossier });
        return;
      }
      resolve(generatedDossier(query));
    }, SCREENING_DELAY_MS);
  });
}

export const RISK_META: Record<
  RiskLevel,
  { label: string; badge: "success" | "warning" | "destructive" }
> = {
  low: { label: "Низкий риск", badge: "success" },
  medium: { label: "Средний риск", badge: "warning" },
  high: { label: "Высокий риск", badge: "destructive" },
};
