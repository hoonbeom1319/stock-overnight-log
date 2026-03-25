"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from '../lib/utils/cn';

export const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn("text-sm font-medium text-slate-300", className)}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;
