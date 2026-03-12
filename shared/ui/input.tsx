import { forwardRef, InputHTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 text-sm text-slate-100 outline-none transition",
        "placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
