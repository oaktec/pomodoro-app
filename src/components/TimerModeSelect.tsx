import * as React from "react";

import { cn } from "@/lib/utils";

import type { Mode, Modes } from "@/App";

export interface TimerModeSelectProps {
  className?: string;
  selected: Mode;
  modes: Modes;
  isFocusActiveInBackground: boolean;
  stopFocus: () => void;
  onSelect: (mode: Mode) => void;
}

const TimerModeSelect: React.FC<TimerModeSelectProps> = ({
  className,
  selected,
  onSelect,
  isFocusActiveInBackground,
  stopFocus,
  modes,
}) => {
  const options = ["focus", "short break", "long break"];
  const [focusText, setFocusText] = React.useState("focus active");

  const handleFocusHover = () => setFocusText("stop focus");
  const handleFocusLeave = () => setFocusText("focus active");

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
              : option === "focus" && isFocusActiveInBackground
              ? "bg-midnight text-red"
              : "bg-midnight text-primary opacity-40"
          )}
          onClick={
            option === "focus" && isFocusActiveInBackground
              ? stopFocus
              : () => onSelect(option as "focus" | "short break" | "long break")
          }
          onMouseEnter={option === "focus" ? handleFocusHover : undefined}
          onMouseLeave={option === "focus" ? handleFocusLeave : undefined}
        >
          {option === "focus" && isFocusActiveInBackground ? focusText : option}
        </button>
      ))}
    </section>
  );
};

export default TimerModeSelect;
