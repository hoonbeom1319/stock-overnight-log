import { ReactNode } from "react";

import { cn } from "@/shared/lib/utils/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20 backdrop-blur",
        className,
      )}
    >
      {children}
    </section>
  );
}
