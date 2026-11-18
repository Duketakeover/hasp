import { cn } from "@/lib/utils";

interface StatusDotProps {
  status: "online" | "offline" | "warning";
  label?: string;
  className?: string;
}

export function StatusDot({ status, label, className }: StatusDotProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "inline-block w-2 h-2 rounded-full",
          status === "online" && "bg-positive status-dot text-positive",
          status === "offline" && "bg-muted",
          status === "warning" && "bg-warning status-dot text-warning"
        )}
      />
      {label && (
        <span className="text-xs text-muted">{label}</span>
      )}
    </div>
  );
}
