import * as React from "react";

import { cn } from "@/lib/utils";
import iconArrowDown from "@/assets/icon-arrow-down.svg";
import iconArrowUp from "@/assets/icon-arrow-up.svg";
import iconArrowDownHover from "@/assets/icon-arrow-down-hover.svg";
import iconArrowUpHover from "@/assets/icon-arrow-up-hover.svg";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "number";
  className?: string;
  value: string | number;
  setValue: (val: number) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, setValue, ...props }, ref) => {
    const [upHovered, setUpHovered] = React.useState(false);
    const [downHovered, setDownHovered] = React.useState(false);

    if (type === "number") {
      return (
        <div className="relative">
          <input
            {...props}
            ref={ref}
            type="number"
            value={Number(value) / 60}
            className={cn(
              "h-[3rem] w-[8.75rem] rounded-[0.625rem] bg-off-white p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
          />
          <div className="absolute right-1 top-0 flex h-full flex-col">
            <button
              className="flex h-full w-full flex-1 items-end pl-2 pr-2"
              onClick={() => setValue(Number(value) + 60)}
              onMouseEnter={() => setUpHovered(true)}
              onMouseLeave={() => setUpHovered(false)}
            >
              <img
                className="mb-1 pt-1.5"
                src={upHovered ? iconArrowUpHover : iconArrowUp}
                alt="arrow up"
              />
            </button>
            <button
              className="flex h-full w-full flex-1 items-start pl-2 pr-2"
              onClick={() => setValue(Number(value) - 60)}
              onMouseEnter={() => setDownHovered(true)}
              onMouseLeave={() => setDownHovered(false)}
            >
              <img
                className="visible mt-1 pb-1.5"
                src={downHovered ? iconArrowDownHover : iconArrowDown}
                alt="arrow down"
              />
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <input
          type={type}
          className={cn(
            "file:bg-transparent h-[3rem] w-[8.75rem] rounded-[0.625rem] bg-off-white p-4 file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      );
    }
  }
);
Input.displayName = "Input";
