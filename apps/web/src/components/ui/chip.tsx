import { cn } from "@/lib/utils";

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "positive" | "warning" | "outline";
  size?: "sm" | "md";
}

export function Chip({
  className,
  variant = "default",
  size = "sm",
  children,
  ...props
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-[var(--radius-pill)]",
        size === "sm" && "px-2.5 py-0.5 text-xs",
        size === "md" && "px-3 py-1 text-sm",
        variant === "default" && "bg-surface-2 text-muted border border-border",
        variant === "accent" && "bg-accent/10 text-accent border border-accent/20",
        variant === "positive" && "bg-positive/10 text-positive border border-positive/20",
        variant === "warning" && "bg-warning/10 text-warning border border-warning/20",
        variant === "outline" && "bg-transparent text-muted border border-border",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
