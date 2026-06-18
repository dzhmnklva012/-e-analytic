import { ChevronDown } from "lucide-react";

type SelectFieldProps = {
  label: string;
  options: string[];
  defaultValue?: string;
};

/** Bordered select with a small floating label, e.g. "Месяц / Все". */
export function SelectField({ label, options, defaultValue }: SelectFieldProps) {
  const id = `select-${label}`;
  return (
    <div className="relative w-44 rounded-xl border border-line bg-card px-3 py-1.5">
      <label
        htmlFor={id}
        className="pointer-events-none block text-[11px] leading-tight text-ink-muted"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          defaultValue={defaultValue}
          className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-sm font-semibold text-ink focus:outline-none"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
      </div>
    </div>
  );
}
