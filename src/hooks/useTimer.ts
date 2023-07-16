import { useRef, useState, useEffect, useCallback } from "react";

interface TimerState {
  isRunning: boolean;
  elapsedTime: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  setElapsedSeconds: (elapsedSeconds: number) => void;
}

interface useTimerProps {
  startingElapsedSeconds?: number;
  duration?: number;
  onTimerEnd?: () => void;
}

const useTimer = ({
  startingElapsedSeconds = 0,
  duration = 0,
  onTimerEnd = undefined,
}: useTimerProps): TimerState => {
  const [isRunning, setIsRunning] = useState(false);
  const accumulatedTime = useRef(startingElapsedSeconds * 1000);
  const [elapsedTime, setElapsedTime] = useState(accumulatedTime.current);
  const startTime = useRef<number | null>(null);

  const toggleTimer = () => {
    setIsRunning((prev) => {
      if (prev) {
        if (startTime.current !== null) {
          accumulatedTime.current += Date.now() - startTime.current;
          startTime.current = null;
        }
      } else {
        startTime.current = Date.now();
      }
      return !prev;
    });
  };

  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
    accumulatedTime.current = 0;
    startTime.current = null;
  };

  const setElapsedSeconds = (elapsedSeconds: number) => {
    accumulatedTime.current = elapsedSeconds * 1000;
    setElapsedTime(accumulatedTime.current);
  };

  useEffect(() => {
    if (isRunning && startTime.current !== null) {
      const intervalId = setInterval(() => {
        if (startTime.current !== null) {
          const currentElapsedTime =
            accumulatedTime.current + Date.now() - startTime.current;
          setElapsedTime(currentElapsedTime);

          if (currentElapsedTime / 1000 >= duration) {
            clearInterval(intervalId);
            resetTimer();
            if (onTimerEnd) {
              onTimerEnd();
            }
          }
        }
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [isRunning, duration, onTimerEnd]);

  return {
    isRunning,
    elapsedTime: elapsedTime / 1000,
    toggleTimer,
    resetTimer,
    setElapsedSeconds,
  };
};

export default useTimer;
