import * as React from "react";

import { cn } from "@/lib/utils";

export interface TimerModeSelectProps {
  className?: string;
  selected: "pomodoro" | "short break" | "long break";
  onSelect: (mode: "pomodoro" | "short break" | "long break") => void;
}

const TimerModeSelect: React.FC<TimerModeSelectProps> = ({
  className,
  selected,
  onSelect,
}) => {
  const options = ["pomodoro", "short break", "long break"];

  return (
    <section
      className={cn(
        "flex h-16 justify-between rounded-[2rem] bg-midnight pl-2 pr-2",
        className
      )}
    >
      {options.map((option) => (
        <button
          className={cn(
            "mb-2 mt-2 w-1/3 rounded-3xl text-center text-xs font-bold transition-colors",
            selected === option
              ? "bg-red text-background"
              : "bg-midnight text-primary opacity-40"
          )}
          onClick={() =>
            onSelect(option as "pomodoro" | "short break" | "long break")
          }
        >
          {option}
        </button>
      ))}
    </section>
  );
};

export default TimerModeSelect;
