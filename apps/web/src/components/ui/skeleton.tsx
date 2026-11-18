import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "card" | "circle";
}

export function Skeleton({
  className,
  variant = "text",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton",
        variant === "text" && "h-4 w-full",
        variant === "card" && "h-32 w-full",
        variant === "circle" && "h-10 w-10 rounded-full",
        className
      )}
      {...props}
    />
  );
}
