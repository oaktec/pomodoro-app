import * as React from "react";

import { cn } from "@/lib/utils";

const TypographyH1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "text-[6.25rem] font-bold leading-[7.5rem] tracking-[-0.3125rem]",
      className
    )}
    {...props}
  />
));
TypographyH1.displayName = "TypographyH1";

const TypographyH2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-[1.75rem] font-bold leading-[2.125rem]", className)}
    {...props}
  />
));
TypographyH2.displayName = "TypographyH2";

const TypographyH3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-base font-bold uppercase tracking-[0.9375rem]",
      className
    )}
    {...props}
  />
));
TypographyH3.displayName = "TypographyH3";

const TypographyH4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn(
      "text-[0.8125rem] font-bold uppercase tracking-[0.3125rem]",
      className
    )}
    {...props}
  />
));
TypographyH4.displayName = "TypographyH4";

const TypographyBody1 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[0.8125rem] font-bold leading-[1.125rem] opacity-60",
      className
    )}
    {...props}
  />
));
TypographyBody1.displayName = "TypographyBody1";

const TypographyBody2 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs font-bold leading-[0.875rem] opacity-40", className)}
    {...props}
  />
));
TypographyBody2.displayName = "TypographyBody2";

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyBody1,
  TypographyBody2,
};
