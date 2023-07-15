import * as React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import type { Mode, Modes } from "@/App";

import { cn } from "@/lib/utils";
import { formatTimeMinsSeconds, formatTimeHoursMins } from "@/lib/utils";

export interface MainTimerProps {
  className?: string;
  mode: Mode;
  modes: Modes;
  timeRemaining: number;
  dailyFocusTime: number;
  isRunning: boolean;
  onPlayPause: () => void;
}

const MainTimer: React.FC<MainTimerProps> = ({
  className,
  mode,
  timeRemaining,
  dailyFocusTime,
  isRunning,
  modes,
  onPlayPause,
}) => {
  return (
    <button
      className={cn(
        "main-timer-gradient main-timer-box-shadow flex h-[300px] w-[300px] items-center justify-center rounded-full shadow hover:scale-[1.01] sm:h-[410px] sm:w-[410px]",
        className
      )}
      onClick={onPlayPause}
    >
      <div className="relative m-4 flex flex-1 items-center justify-center self-stretch rounded-full bg-midnight">
        <CircularProgressbar
          className="absolute z-0 h-[92%] w-[92%]"
          value={timeRemaining}
          strokeWidth={3}
          maxValue={modes[mode].duration}
          styles={buildStyles({
            trailColor: "var(--midnight)",
            pathColor: `hsl(var(--${modes[mode].colorName}))`,
          })}
        />

        <div className="absolute top-[20%] z-10 font-bold text-primary opacity-40 sm:text-xl">
          Daily Focus: {formatTimeHoursMins(dailyFocusTime)}
        </div>

        <div className="z-10 pr-1 text-[5rem] font-bold tracking-[-4px] text-primary sm:pr-[5px] sm:text-[100px] sm:tracking-[-5px]">
          {formatTimeMinsSeconds(timeRemaining)}
        </div>

        <div className="absolute bottom-[20%] z-10 pl-[13.125px] text-sm font-bold tracking-[13.125px] text-primary sm:pl-[15px] sm:text-base sm:tracking-[15px]">
          {isRunning ? "PAUSE" : "PLAY"}
        </div>
      </div>
    </button>
  );
};

export default MainTimer;
