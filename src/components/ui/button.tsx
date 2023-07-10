import * as React from "react";

import { cn } from "@/lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    className={cn(
      "inline-flex min-h-[3.3125rem] min-w-[8.75rem] items-center justify-center rounded-[1.65625rem] bg-red text-base font-bold text-white transition-colors hover:bg-pale-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Button.displayName = "Button";

export { Button };
