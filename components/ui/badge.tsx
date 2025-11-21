import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-surface-100 text-foreground border border-border shadow-xs",
        primary:
          "bg-primary/10 text-primary border border-primary/30 shadow-xs",
        outline:
          "border border-border text-foreground bg-transparent hover:bg-surface-50",
        muted:
          "bg-surface-75 text-muted border border-border/50",
        success:
          "bg-green-500/10 text-green-600 border border-green-500/20",
        warning:
          "bg-amber-500/10 text-amber-600 border border-amber-500/20",
        destructive:
          "bg-red-500/10 text-red-600 border border-red-500/20",
      },
      size: {
        sm: "text-[10px] px-1.5 py-0.5",
        md: "text-xs px-2 py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}
