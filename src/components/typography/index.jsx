import { cn } from "@/lib/util";
import { forwardRef } from "react";

export const H1 = forwardRef(({ children, className }, ref) => {
  return <h1 ref={ref} className={cn("font-neu font-normal text-[70px] uppercase", className)}>{children}</h1>;
});
