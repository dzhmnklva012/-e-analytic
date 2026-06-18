// Mock data for the ADATA Compliance — Статистика dashboard.
// Values mirror the Figma reference frame (node 1190:93762).

import {
  BarChart3,
  Bot,
  ClipboardList,
  CopyCheck,
  Mail,
  Scale,
  IdCard,
  ShieldCheck,
  Gift,
  Shuffle,
  Network,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  expandable?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Статистика", icon: BarChart3, active: true },
  { label: "Цифровой ассистент", icon: Bot },
  { label: "Реестр проверок", icon: ClipboardList },
  { label: "Задачи", icon: CopyCheck },
  { label: "Горячая линия", icon: Mail },
  { label: "Санкции", icon: Scale },
  { label: "Досье", icon: IdCard, expandable: true },
  { label: "Проверка СБ", icon: ShieldCheck },
  { label: "Декларация подарков", icon: Gift },
  { label: "Конфликт интересов", icon: Shuffle },
  { label: "Структура предприятия", icon: Network },
  { label: "Обучение", icon: GraduationCap },
];

export const headerLinks = ["Продукты и решения", "Контакты", "Тарифы"];

// ── Досье компании (radial gauge) ──────────────────────────────
export const companyFiles = {
  badge: { period: "Май", value: 14, delta: -12 },
  total: 516,
  // ring fill values are visual (0-100), matching the Figma render
  withoutRisks: { label: "Без рисков", count: 58, ring: 78 }, // blue, outer
  withRisks: { label: "С рисками", count: 79, ring: 62 }, // red, inner
};

// ── Досье сотрудников (stacked monthly bar) ────────────────────
export const employeeFiles = {
  badge: { period: "Май", value: 11, delta: -8 },
  ticks: [0, 500, 1000, 3000, 5000],
  months: [
    { month: "Январь", base: 1700, top: 3500 },
    { month: "Февраль", base: 1600, top: 2000 },
    { month: "Март", base: 1200, top: 700 },
    { month: "Апрель", base: 700, top: 500 },
    { month: "Май", base: 600, top: 100 },
    { month: "Июнь", base: 700, top: 600 },
    { month: "Июль", base: 1300, top: 900 },
    { month: "Август", base: 1600, top: 1900 },
    { month: "Сентябрь", base: 1900, top: 3300 },
  ],
};

// ── Задачи (KPIs + proportion bar) ─────────────────────────────
export const tasks = {
  kpis: [
    { label: "Назначенные", value: 8 },
    { label: "В работе", value: 2 },
    { label: "Тестирование", value: 10 },
    { label: "Законченные", value: 19 },
  ],
  segments: [
    { label: "Назначенные", percent: 14.5, color: "var(--color-chart-blue)" },
    { label: "В работе", percent: 21.2, color: "var(--color-chart-red)" },
    { label: "Тестирование", percent: 15.9, color: "var(--color-chart-orange)" },
    { label: "Законченные", percent: 41.6, color: "var(--color-chart-green)" },
  ],
};

// ── Горячая линия (donut) ──────────────────────────────────────
export const hotline = {
  total: 75,
  totalLabel: "Всего обращений",
  segments: [
    { label: "Новые", count: 79, value: 11, color: "var(--color-chart-blue)" },
    { label: "В работе", count: 45, value: 39, color: "var(--color-chart-yellow)" },
    { label: "Завершенные", count: 58, value: 50, color: "var(--color-chart-green)" },
  ],
};

// ── Конфликт интересов (donut) ─────────────────────────────────
export const conflicts = {
  total: 101,
  totalLabel: "Всего",
  segments: [
    { label: "Конфликт интересов найден", count: 12, value: 11, color: "var(--color-chart-blue)" },
    { label: "Конфликт интересов не найден", count: 89, value: 89, color: "var(--color-chart-red)" },
  ],
};

// ── Подарки (stat tiles) ───────────────────────────────────────
export const gifts = [
  { label: "Декларации", value: 41573 },
  { label: "Подарки", value: 7835 },
  { label: "Дарители", value: 2573 },
  { label: "Получатели", value: 20483 },
];

// ru-style thousands separator (non-breaking thin space)
export function formatRu(n: number): string {
  return n.toLocaleString("ru-RU").replace(/ /g, " ");
}
