import * as React from "react";

import { cn } from "@/lib/utils";

export interface MainTimerProps {
  className?: string;
  mode: "pomodoro" | "short break" | "long break";
  timeRemaining: number;
  isRunning: boolean;
  onPlayPause: () => void;
}

const MainTimer: React.FC<MainTimerProps> = ({
  className,
  mode,
  timeRemaining,
  isRunning,
  onPlayPause,
}) => {
  return (
    <section
      className={cn(
        "main-timer-gradient flex h-[300px] w-[300px] items-center justify-center rounded-full",
        className
      )}
    >
      <div>
        <div className="text-4xl font-bold">{mode}</div>
        <div className="text-4xl font-bold">{timeRemaining}</div>
        <button
          className={cn(
            "h-20 w-20 rounded-full bg-primary text-background",
            isRunning ? "opacity-40" : ""
          )}
          onClick={onPlayPause}
        >
          {isRunning ? "PAUSE" : "PLAY"}
        </button>
      </div>
    </section>
  );
};

export default MainTimer;
