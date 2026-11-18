import { cn } from "@/lib/utils";

interface DataPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export function DataPanel({
  className,
  label,
  children,
  ...props
}: DataPanelProps) {
  return (
    <div
      className={cn(
        "bg-surface-2 border border-border rounded-[var(--radius-lg)] overflow-hidden",
        className
      )}
      {...props}
    >
      {label && (
        <div className="px-4 py-2 border-b border-border">
          <span className="text-xs font-medium text-muted uppercase tracking-wider">
            {label}
          </span>
        </div>
      )}
      <div className="p-4 font-mono text-sm">{children}</div>
    </div>
  );
}

interface DataRowProps {
  label: string;
  value: React.ReactNode;
  muted?: boolean;
}

export function DataRow({ label, value, muted }: DataRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-muted text-xs">{label}</span>
      <span
        className={cn(
          "font-mono text-sm",
          muted ? "text-muted" : "text-text"
        )}
      >
        {value}
      </span>
    </div>
  );
}

interface ProgressBarProps {
  value: number; // 0-100
  variant?: "accent" | "positive" | "warning";
  label?: string;
  showPercent?: boolean;
}

export function ProgressBar({
  value,
  variant = "accent",
  label,
  showPercent = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="space-y-1.5">
      {(label || showPercent) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs text-muted">{label}</span>}
          {showPercent && (
            <span className="text-xs font-mono text-muted">
              {clampedValue.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      <div className="h-1.5 bg-surface rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            variant === "accent" && "bg-accent glow-accent-sm",
            variant === "positive" && "bg-positive glow-positive",
            variant === "warning" && "bg-warning glow-warning"
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
