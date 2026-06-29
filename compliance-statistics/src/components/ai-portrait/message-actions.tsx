"use client";

import { Check, Copy, RefreshCw, Trash2, type LucideIcon } from "lucide-react";
import { useState } from "react";

type MessageActionsProps = {
  onCopy?: () => void;
  onRegenerate?: () => void;
  onDelete?: () => void;
};

/** Floating per-message toolbar (copy · regenerate · delete) shown on hover/focus. */
export function MessageActions({ onCopy, onRegenerate, onDelete }: MessageActionsProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    onCopy?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border bg-card p-1 shadow-md">
      {onCopy && (
        <ActionButton
          icon={copied ? Check : Copy}
          label={copied ? "Скопировано" : "Копировать"}
          onClick={handleCopy}
        />
      )}
      {onRegenerate && (
        <ActionButton icon={RefreshCw} label="Сгенерировать заново" onClick={onRegenerate} />
      )}
      {onDelete && (
        <ActionButton icon={Trash2} label="Удалить" onClick={onDelete} danger />
      )}
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
  danger,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid size-7 place-items-center rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
        danger
          ? "text-destructive hover:bg-destructive/10"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <Icon className="size-4" />
    </button>
  );
}
