import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "text-white shadow-[0_0_24px_4px_rgba(196,120,90,0.25)] hover:shadow-[0_0_32px_8px_rgba(196,120,90,0.35)] hover:brightness-110",
        secondary:
          "bg-surface-2 text-text border border-border hover:border-border-hover hover:bg-surface",
        outline:
          "border border-border text-muted hover:text-text hover:border-border-hover bg-transparent",
        ghost:
          "text-muted hover:text-text hover:bg-surface-2",
        danger:
          "bg-warning/10 text-warning border border-warning/20 hover:bg-warning/20",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)]",
        md: "h-10 px-5 text-sm rounded-[var(--radius-md)]",
        lg: "h-12 px-8 text-base rounded-[var(--radius-pill)]",
        xl: "h-14 px-10 text-lg rounded-[var(--radius-pill)]",
        icon: "h-10 w-10 rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        style={variant === "default" || variant === undefined ? { background: "var(--gradient-accent)" } : undefined}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
