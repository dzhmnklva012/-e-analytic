import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectFieldProps = {
  label: string;
  options: string[];
  defaultValue?: string;
};

/** Bordered select with a small floating label, e.g. "Месяц / Все". */
export function SelectField({ label, options, defaultValue }: SelectFieldProps) {
  return (
    <div className="w-44 rounded-lg border border-input bg-card px-3 py-2">
      <span className="block text-xs leading-tight text-muted-foreground">
        {label}
      </span>
      <Select defaultValue={defaultValue}>
        <SelectTrigger
          size="sm"
          className="h-auto w-full border-0 bg-transparent p-0 text-sm font-semibold text-foreground shadow-none focus-visible:ring-0"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
