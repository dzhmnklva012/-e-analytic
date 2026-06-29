import {
  BarChart3,
  Bot,
  ClipboardCheck,
  ClipboardList,
  FileCheck2,
  FolderOpen,
  FolderSearch,
  Gauge,
  Gift,
  Globe,
  ListChecks,
  Network,
  PhoneCall,
  ScanSearch,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Возможности", href: "#benefits" },
  { label: "Модули", href: "#modules" },
  { label: "Как это работает", href: "#how" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Вопросы", href: "#faq" },
];

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const BENEFITS: Feature[] = [
  {
    icon: ScanSearch,
    title: "Санкционный скрининг по запросу",
    description:
      "Проверяйте контрагентов по международным базам и санкционным спискам до начала сотрудничества — базовая потребность AML/KYC.",
  },
  {
    icon: Sparkles,
    title: "ИИ делает рутину за вас",
    description:
      "Мгновенные досье и краткие резюме вместо ручного поиска по десяткам источников.",
  },
  {
    icon: Network,
    title: "Сквозная работа с делами",
    description:
      "Жалоба с горячей линии или риск-флаг превращаются в расследование с владельцем, доказательствами и отчётом.",
  },
  {
    icon: FileCheck2,
    title: "Готовность к аудиту",
    description:
      "Каждая проверка, расследование и декларация фиксируется и статусируется как доказательство комплаенса.",
  },
  {
    icon: Globe,
    title: "Одна связанная система",
    description:
      "Скрининг, расследования, декларации, досье и аналитика работают с общими данными, а не в разрозненных таблицах.",
  },
  {
    icon: Gauge,
    title: "Контроль и надзор",
    description:
      "Дашборды для руководства и управление квотами и тарифами для governance использования.",
  },
];

export interface ModuleItem {
  icon: LucideIcon;
  name: string;
  description: string;
}

export const MODULES: ModuleItem[] = [
  {
    icon: Globe,
    name: "Глобальная проверка",
    description: "ИИ-поиск: компания → международные и санкционные базы → риск → досье.",
  },
  {
    icon: Bot,
    name: "Цифровой ассистент",
    description: "ИИ-резюме досье и свободные ответы на вопросы по делу.",
  },
  {
    icon: BarChart3,
    name: "Статистика",
    description: "KPI-дашборды по всей комплаенс-активности.",
  },
  {
    icon: ClipboardList,
    name: "Реестр проверок",
    description: "Журнал проверок со статусами и историей.",
  },
  {
    icon: ListChecks,
    name: "Задачи",
    description: "Управление задачами и сроками.",
  },
  {
    icon: PhoneCall,
    name: "Горячая линия",
    description: "Приём обращений и жалоб по этике.",
  },
  {
    icon: FolderSearch,
    name: "Расследования",
    description: "Кейс-менеджмент: цель, нарушение, доказательства, связанные лица.",
  },
  {
    icon: ShieldAlert,
    name: "Санкции",
    description: "Скрининг по санкционным и наблюдательным спискам.",
  },
  {
    icon: FolderOpen,
    name: "Досье",
    description: "Сводные профили сотрудников и контрагентов.",
  },
  {
    icon: ShieldCheck,
    name: "Проверка СБ",
    description: "Due diligence службы безопасности.",
  },
  {
    icon: Gift,
    name: "Декларация подарков",
    description: "Реестр деклараций о подарках.",
  },
  {
    icon: Scale,
    name: "Конфликт интересов",
    description: "Декларации конфликта интересов.",
  },
];

export interface Step {
  title: string;
  description: string;
}

export const STEPS: Step[] = [
  {
    title: "Скрининг",
    description:
      "Введите компанию в ИИ-агента — он проверит международные и санкционные источники, оценит риск и вернёт досье (с записью в историю и учётом суточной квоты).",
  },
  {
    title: "Сигнал",
    description:
      "Рискованные находки или жалобы с горячей линии поднимают вопрос для разбирательства.",
  },
  {
    title: "Расследование",
    description:
      "Откройте дело: цель, вид нарушения, дата и место, доказательства, связанные лица из досье и обращения, ответственный.",
  },
  {
    title: "Решение и отчёт",
    description:
      "Зафиксируйте результаты в отчёте о расследовании, обновите реестр проверок и задачи.",
  },
  {
    title: "Мониторинг",
    description:
      "Руководство контролирует весь конвейер через статистику; декларации и проверки СБ питают ту же запись.",
  },
];

export const AUDIENCE: Feature[] = [
  {
    icon: ClipboardCheck,
    title: "Комплаенс / AML / KYC",
    description: "Основные операторы: скрининг, расследования, декларации.",
  },
  {
    icon: Globe,
    title: "Банки и финансовые институты",
    description: "Проверка контрагентов перед сделками и расчётами.",
  },
  {
    icon: ShieldCheck,
    title: "Служба безопасности и закупки",
    description: "Проверка партнёров и поставщиков.",
  },
  {
    icon: FolderSearch,
    title: "Риск- и юридические аналитики",
    description: "Построение досье и ведение расследований.",
  },
  {
    icon: Gift,
    title: "Сотрудники",
    description: "Декларации подарков и конфликтов, обращения на горячую линию.",
  },
  {
    icon: Gauge,
    title: "Руководство",
    description: "Надзор через дашборды; управление подпиской и квотами.",
  },
];

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  quota: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const PRICING: PricingTier[] = [
  {
    name: "Старт",
    price: "₸0",
    period: "14 дней пробного периода",
    quota: "50 запросов в сутки",
    description: "Для знакомства с платформой и небольших команд.",
    features: [
      "Глобальная проверка и санкционный скрининг",
      "Цифровой ассистент",
      "Реестр проверок и история",
      "1 пользователь",
    ],
    cta: "Попробовать бесплатно",
  },
  {
    name: "Бизнес",
    price: "По запросу",
    period: "ежемесячно",
    quota: "200 запросов в сутки",
    description: "Для активных комплаенс-команд с полным циклом дел.",
    features: [
      "Всё из тарифа «Старт»",
      "Расследования и горячая линия",
      "Досье, декларации, проверка СБ",
      "Статистика и дашборды",
      "До 25 пользователей",
    ],
    cta: "Запросить демо",
    featured: true,
  },
  {
    name: "Корпоративный",
    price: "Индивидуально",
    period: "годовой контракт",
    quota: "Без суточного лимита",
    description: "Для банков и крупных организаций с интеграциями.",
    features: [
      "Всё из тарифа «Бизнес»",
      "SSO и роли доступа",
      "API и интеграции",
      "Выделенная поддержка и SLA",
      "Неограниченные пользователи",
    ],
    cta: "Связаться с нами",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "По каким источникам проходит проверка?",
    answer:
      "Глобальная проверка сверяет контрагента с международными базами и санкционными списками — OFAC, ЕС, HM Treasury, ООН, Interpol и агрегаторами вроде OpenSanctions. По итогу формируется единое досье с уровнем риска.",
  },
  {
    question: "Что такое суточный лимит запросов?",
    answer:
      "Каждый тариф включает квоту проверок в сутки (например, 200 для тарифа «Бизнес»). Лимит управляет использованием и отражается в истории запросов. На корпоративном тарифе лимит снимается.",
  },
  {
    question: "Можно ли из проверки сразу открыть расследование?",
    answer:
      "Да. Рискованная находка или жалоба с горячей линии превращается в дело: вы задаёте цель и вид нарушения, прикладываете доказательства, связываете лиц из досье и обращения, назначаете ответственного.",
  },
  {
    question: "Подходит ли платформа для аудита?",
    answer:
      "Да. Все проверки, расследования и декларации логируются и статусируются — это готовая доказательная база комплаенса для внутренних и внешних аудиторов.",
  },
  {
    question: "Точны ли ответы ИИ?",
    answer:
      "ИИ ускоряет сбор и резюмирование данных, но итоговые решения принимает комплаенс-офицер. Результаты сопровождаются ссылками на проверенные источники и подлежат человеческой верификации.",
  },
];

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Продукт",
    links: [
      { label: "Глобальная проверка", href: "#modules" },
      { label: "Расследования", href: "#modules" },
      { label: "Статистика", href: "#modules" },
      { label: "Тарифы", href: "#pricing" },
    ],
  },
  {
    title: "Решения",
    links: [
      { label: "Банки и финансы", href: "#audience" },
      { label: "Служба безопасности", href: "#audience" },
      { label: "Комплаенс / AML", href: "#audience" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О платформе", href: "#benefits" },
      { label: "Как это работает", href: "#how" },
      { label: "Контакты", href: "#contact" },
    ],
  },
  {
    title: "Правовое",
    links: [
      { label: "Условия использования", href: "#" },
      { label: "Политика конфиденциальности", href: "#" },
    ],
  },
];

export interface Currency {
  code: string;
  value: string;
  change: number;
}

export const CURRENCIES: Currency[] = [
  { code: "USD", value: "523,40", change: 0.42 },
  { code: "EUR", value: "565,10", change: -0.18 },
  { code: "RUB", value: "5,84", change: 0.06 },
  { code: "CNY", value: "71,90", change: -0.12 },
];

export const TRUSTED_BY = [
  "GAZPROMBANK",
  "Sberbank",
  "Halyk Bank",
  "Kaspi",
  "Freedom Finance",
];
