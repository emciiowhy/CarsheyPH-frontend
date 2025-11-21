import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Sharp-Tech Input System
 * - Clean, minimal, high-contrast borders
 * - Soft shadows + smooth focus ring
 * - Stripe-like subtle surface
 * - Dark-mode aware
 */

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-border bg-surface-50 px-3 py-2 text-sm",
          "text-foreground placeholder:text-muted",
          "transition-all outline-none",
          "focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&_::-webkit-date-and-time-value]:text-foreground",
          "[&_::-webkit-inner-spin-button]:appearance-none",
          "[&_::-webkit-calendar-picker-indicator]:opacity-70",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
