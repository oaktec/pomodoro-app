// A TypeScript React component which takes a count 1 to 4, and displays 4 circles with the number of circles filled in equal to the count. The circles are not completely filled
// in, but rather have a border.

import * as React from "react";

import { cn } from "@/lib/utils";

export interface PomoCountProps {
  count: number;
  className?: string;
}

const PomoCount: React.FC<PomoCountProps> = ({ count, className }) => {
  return (
    <div className={cn("flex gap-2 p-[18px]", className)}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex h-[18px] w-[18px] items-center justify-center rounded-full border border-primary"
          )}
        >
          {i < count && <div className="h-3.5 w-3.5 rounded-full bg-red" />}
        </div>
      ))}
    </div>
  );
};

export default PomoCount;
