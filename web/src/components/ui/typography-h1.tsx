import type * as React from "react";
import { cn } from "@/lib/utils";

export function TypographyH1({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className,
      )}
      {...props}>
      {children}
    </h1>
  );
}
