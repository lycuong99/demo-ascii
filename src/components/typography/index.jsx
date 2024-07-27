import { cn } from "@/lib/util";
import { forwardRef } from "react";

export const H1 = forwardRef(({ children, className }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn("font-neu font-normal text-[24px] lg:text-[clamp(40px,20px+2.5vw,80px)] uppercase", className)}
    >
      {children}
    </h1>
  );
});

export const Subheader1 = forwardRef(({ children, className, as }, ref) => {
  const Tag = as || "p";
  return (
    <Tag ref={ref} className={cn("font-neu font-normal text-[clamp(40px,20px+2.5vw,80px)] uppercase", className)}>
      {children}
    </Tag>
  );
});
