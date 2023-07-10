// Typescript React component which is a selector for a timer mode. Three options
// are available: Pomodoro, Short Break, and Long Break. The selected option has a
// red background while the others don't.
import * as React from "react";

import { cn } from "@/lib/utils";

export interface TimerModeSelectProps {
  className?: string;
  selected: "pomodoro" | "short-break" | "long-break";
  onSelect: (mode: "pomodoro" | "short-break" | "long-break") => void;
}

const TimerModeSelect: React.FC<TimerModeSelectProps> = ({
  className,
  selected,
  onSelect,
}) => {
  return (
    <section className={cn("flex justify-between", className)}>
      <button
        className={cn(
          "flex-grow-1 rounded-lg px-4 py-3 text-center text-sm font-bold",
          selected === "pomodoro"
            ? "bg-red-500 text-white"
            : "bg-gray-100 text-gray-500"
        )}
        onClick={() => onSelect("pomodoro")}
      >
        Pomodoro
      </button>
      <button
        className={cn(
          "flex-grow-1 rounded-lg px-4 py-3 text-center text-sm font-bold",
          selected === "short-break"
            ? "bg-red-500 text-white"
            : "bg-gray-100 text-gray-500"
        )}
        onClick={() => onSelect("short-break")}
      >
        Short Break
      </button>
      <button
        className={cn(
          "flex-grow-1 rounded-lg px-4 py-3 text-center text-sm font-bold",
          selected === "long-break"
            ? "bg-red-500 text-white"
            : "bg-gray-100 text-gray-500"
        )}
        onClick={() => onSelect("long-break")}
      >
        Long Break
      </button>
    </section>
  );
};

export default TimerModeSelect;
