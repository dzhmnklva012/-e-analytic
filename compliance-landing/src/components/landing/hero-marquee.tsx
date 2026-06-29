const items = [
  "Санкционный скрининг",
  "PEP-проверка",
  "Досье",
  "Расследования",
  "Горячая линия",
  "Проверка СБ",
  "Конфликт интересов",
  "Декларация подарков",
  "Реестр проверок",
  "Глобальная проверка",
];

/** Infinite horizontal ticker of compliance services. */
export function HeroMarquee() {
  return (
    <div className="marquee-mask relative flex overflow-hidden border-y border-border bg-card/50 py-3">
      <div className="flex shrink-0 animate-marquee items-center">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 text-sm font-medium whitespace-nowrap text-muted-foreground">
              {item}
            </span>
            <span className="text-primary" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
