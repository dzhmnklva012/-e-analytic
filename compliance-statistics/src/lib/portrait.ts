// Mock data + types for the "Портрет ИИ" (AI portrait) chat module.
// The portrait is the AI-generated dossier summary; the chat lets a user
// ask follow-up questions about the employee.

export type Tone = "default" | "muted" | "success" | "warning";

/** A single line of the portrait — a key/value row or a labelled bullet group. */
export type PortraitItem = {
  label?: string;
  value?: string;
  tone?: Tone;
  /** Nested bullet lines (e.g. the two ID cards under "Удостоверение личности"). */
  children?: PortraitItem[];
};

export type PortraitSection = {
  id: string;
  title: string;
  items: PortraitItem[];
};

export type Portrait = {
  subjectName: string;
  sections: PortraitSection[];
};

// ── Generated portrait (mirrors the Figma reference) ───────────────
export const employeePortrait: Portrait = {
  subjectName: "Иванов Иван Иванович",
  sections: [
    {
      id: "general",
      title: "Портрет сотрудника",
      items: [
        { label: "ФИО", value: "Иванов Иван Иванович" },
        { label: "ИИН", value: "010308501176" },
        { label: "Дата рождения", value: "08.03.2001 (возраст: 24 года)" },
        { label: "Пол", value: "Мужской" },
        { label: "Гражданство", value: "Республика Казахстан" },
        { label: "Национальность", value: "Казах" },
        { label: "Место рождения", value: "г. Алматы, Медеуский район" },
        {
          label: "Адрес регистрации",
          value:
            "Республика Казахстан, г. Алматы, Алмалинский район, ул. Байганина, дом 16, кв. 2",
        },
        {
          label: "Семейное положение",
          value: "данных нет (предположительно не женат, детей нет)",
          tone: "muted",
        },
        { label: "Воинский учет", value: "военнообязанный" },
        {
          label: "Состояние здоровья",
          children: [
            { value: "Наркологический учет — не состоит", tone: "success" },
            { value: "Психоневрологический учет — не состоит", tone: "success" },
            { value: "Туберкулезный учет — не состоит", tone: "success" },
          ],
        },
      ],
    },
    {
      id: "documents",
      title: "Документы",
      items: [
        {
          label: "Удостоверение личности",
          children: [
            { value: "№ 041498345 — истёкшее, выдано 27.04.2017", tone: "warning" },
            {
              value: "№ 042698549 — действующее, выдано 14.02.2018, срок до 13.02.2028",
              tone: "success",
            },
          ],
        },
        {
          label: "Паспорт РК",
          children: [
            { value: "№ N08647016 — истёкший, выдан 02.04.2013, срок до 01.04.2023", tone: "warning" },
            {
              value: "№ N16761724 — действующий, выдан 14.03.2024, срок до 13.03.2034",
              tone: "success",
            },
          ],
        },
        { label: "Орган выдачи", value: "МВД РК" },
      ],
    },
    {
      id: "education",
      title: "Образование",
      items: [
        {
          label: "КГУ «Специализированная гимназия №12 им. Ш. Уалиханова», г. Алматы",
          children: [
            { value: "Период: 2016–2018" },
            { value: "Статус: Выпускник" },
          ],
        },
        {
          label: "АО «Казахстанско-Британский Технический Университет» (КБТУ)",
          children: [
            { value: "Период: 2018–2022" },
            { value: "Форма обучения: Очная" },
            { value: "Статус: Выпускник" },
            {
              value: "вероятная специализация — IT, менеджмент или инженерное направление",
              tone: "muted",
            },
          ],
        },
      ],
    },
  ],
};

// ── Suggested questions shown as quick-reply chips ─────────────────
export const suggestedQuestions = [
  "Какие документы скоро истекают?",
  "Где учился сотрудник?",
  "Состоит ли на медицинских учётах?",
  "Каков адрес регистрации?",
];

// ── Mock AI answer engine (keyword matching over the portrait) ─────
const cannedAnswers: { match: RegExp; answer: string }[] = [
  {
    match: /документ|удостоверени|паспорт|истек|истёк|срок/i,
    answer:
      "Действующие документы: удостоверение личности № 042698549 (срок до 13.02.2028) и паспорт РК № N16761724 (срок до 13.03.2034). Истёкшие: удостоверение № 041498345 и паспорт № N08647016 (срок истёк 01.04.2023).",
  },
  {
    match: /учил|образовани|университ|вуз|школ|гимнази|кбту/i,
    answer:
      "Сотрудник окончил гимназию №12 им. Ш. Уалиханова (2016–2018), затем КБТУ — Казахстанско-Британский Технический Университет (2018–2022, очная форма). Вероятная специализация — IT, менеджмент или инженерное направление.",
  },
  {
    match: /учёт|учет|здоровь|нарколог|психо|туберкул|медицин/i,
    answer:
      "По имеющимся данным сотрудник не состоит на наркологическом, психоневрологическом и туберкулезном учётах.",
  },
  {
    match: /адрес|регистрац|прожива|место жительств/i,
    answer:
      "Адрес регистрации: Республика Казахстан, г. Алматы, Алмалинский район, ул. Байганина, дом 16, кв. 2.",
  },
  {
    match: /возраст|родил|рождени|дата рожд/i,
    answer: "Дата рождения — 08.03.2001, на текущий момент сотруднику 24 года.",
  },
  {
    match: /семь|жена|женат|дет|брак/i,
    answer:
      "Данных о семейном положении нет. Предположительно сотрудник не женат, детей нет — эта информация не подтверждена документально.",
  },
  {
    match: /воинск|армия|служб/i,
    answer: "По воинскому учёту — военнообязанный.",
  },
];

/** Returns a mock AI answer for a free-text question about the employee. */
export function answerQuestion(question: string): string {
  const hit = cannedAnswers.find((a) => a.match.test(question));
  if (hit) return hit.answer;
  return "По этому запросу в досье нет точных данных. Уточните вопрос — я могу рассказать про документы, образование, адрес, медицинские учёты или личные данные сотрудника.";
}

export const MAX_MESSAGE_LENGTH = 1000;
