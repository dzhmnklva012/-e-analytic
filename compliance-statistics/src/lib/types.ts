// Domain types for the ADATA Compliance → Statistics module.

export type Period = "today" | "week" | "month" | "quarter" | "year" | "custom";

export interface Company {
  id: string;
  name: string;
}

/** A signed / unsigned split for a document collection. */
export interface SignedSplit {
  total: number;
  signed: number;
  unsigned: number;
}

/** One month of signed / unsigned document activity. */
export interface MonthlySigned {
  month: string; // localized short label, e.g. "Янв"
  signed: number;
  unsigned: number;
}

export interface TasksStat {
  planned: number;
  completed: number;
  inProgress: number;
  pending: number;
  other: number;
}

export interface CompanyFilesStat {
  checks: SignedSplit; // Проверки
  conclusions: SignedSplit; // Заключения
  data: SignedSplit; // Данные
}

export interface EmployeeFilesStat {
  inspections: SignedSplit; // Проверки
  conclusions: SignedSplit; // Заключения
  byMonth: MonthlySigned[]; // Данные по месяцам
}

export interface CaseFlowStat {
  total: number;
  new: number;
  completed: number;
  inProgress: number;
}

export interface ConflictStat {
  total: number;
  found: number; // Конфликт выявлен
  notFound: number; // Конфликт не выявлен
}

export interface GiftsStat {
  declarations: number; // Декларации
  gifts: number; // Подарки
  donors: number; // Дарители
  recipients: number; // Получатели
}

/** Full statistics payload returned for a given period + company scope. */
export interface StatisticsData {
  tasks: TasksStat;
  companyFiles: CompanyFilesStat;
  employeeFiles: EmployeeFilesStat;
  hotline: CaseFlowStat;
  investigations: CaseFlowStat;
  conflict: ConflictStat;
  gifts: GiftsStat;
}

/** Drives which UI state the dashboard renders (demo + real). */
export type ViewState = "ready" | "loading" | "empty" | "error" | "offline";
