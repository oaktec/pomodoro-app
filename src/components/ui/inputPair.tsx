import * as React from "react";

import { cn } from "@/lib/utils";

const InputPair = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
InputPair.displayName = "InputPair";

export { InputPair };
