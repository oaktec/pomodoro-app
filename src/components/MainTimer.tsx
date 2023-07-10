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
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes < 10 ? "0" + minutes.toString() : minutes}:${
      seconds < 10 ? "0" + seconds.toString() : seconds
    }`;
  };

  return (
    <button
      className={cn(
        "main-timer-gradient main-timer-box-shadow flex h-[300px] w-[300px] items-center justify-center rounded-full shadow sm:h-[410px] sm:w-[410px]",
        className
      )}
      onClick={onPlayPause}
    >
      <div className="relative m-4 flex flex-1 items-center justify-center self-stretch rounded-full bg-midnight">
        <div className="pr-1 text-[5rem] font-bold tracking-[-4px] text-primary sm:pr-[5px] sm:text-[100px] sm:tracking-[-5px]">
          {formatTime(timeRemaining)}
        </div>

        <div className="absolute bottom-[20%] z-10 pl-[13.125px] text-sm font-bold tracking-[13.125px] text-primary sm:pl-[15px] sm:text-base sm:tracking-[15px]">
          {isRunning ? "PAUSE" : "PLAY"}
        </div>

        {/* <button
          className={cn(
            "absolute bottom-[25%] z-10 rounded-full bg-primary text-background",
            isRunning ? "opacity-40" : ""
          )}
          onClick={onPlayPause}
        >
          {isRunning ? "PAUSE" : "PLAY"}
        </button> */}
      </div>
    </button>
  );
};

export default MainTimer;
