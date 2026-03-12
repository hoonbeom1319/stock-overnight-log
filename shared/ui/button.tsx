import { ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-lg px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary"
          ? "bg-sky-500 text-slate-950 hover:bg-sky-400"
          : "border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800",
        className,
      )}
      {...props}
    />
  );
}
