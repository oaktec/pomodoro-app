import { useRef, useState, useEffect, useCallback } from "react";

interface TimerState {
  isRunning: boolean;
  elapsedTime: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  setElapsedSeconds: (elapsedSeconds: number) => void;
}

const useTimer = (startingElapsedSeconds = 0): TimerState => {
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

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setElapsedTime(0);
    accumulatedTime.current = 0;
    startTime.current = null;
  }, []);

  const setElapsedSeconds = useCallback((elapsedSeconds: number) => {
    accumulatedTime.current = elapsedSeconds * 1000;
    setElapsedTime(accumulatedTime.current);
  }, []);

  useEffect(() => {
    if (isRunning && startTime.current !== null) {
      const intervalId = setInterval(() => {
        if (startTime.current !== null)
          setElapsedTime(
            accumulatedTime.current + Date.now() - startTime.current
          );
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [isRunning]);

  return {
    isRunning,
    elapsedTime: elapsedTime / 1000,
    toggleTimer,
    resetTimer,
    setElapsedSeconds,
  };
};

export default useTimer;
