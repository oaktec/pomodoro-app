import * as React from "react";

import { cn } from "@/lib/utils";

export interface TimerModeSelectProps {
  className?: string;
  selected: "pomodoro" | "short break" | "long break";
  modes: {
    [key: string]: {
      label: string;
      duration: number;
      colorName: string;
    };
  };
  onSelect: (mode: "pomodoro" | "short break" | "long break") => void;
}

const TimerModeSelect: React.FC<TimerModeSelectProps> = ({
  className,
  selected,
  onSelect,
  modes,
}) => {
  const options = ["pomodoro", "short break", "long break"];

  return (
    <section
      className={cn(
        "flex h-16 w-80 justify-between rounded-[2rem] bg-midnight pl-2 pr-2 sm:w-96",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option}
          className={cn(
            "mb-2 mt-2 w-[6.5rem] rounded-3xl text-center text-xs font-bold transition-colors sm:w-[7.5rem] sm:text-sm",
            selected === option
              ? `bg-${modes[option].colorName} text-background"`
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
