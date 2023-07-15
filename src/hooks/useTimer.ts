import { useRef, useState, useEffect } from "react";

interface TimerState {
  isRunning: boolean;
  elapsedTime: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  setElapsedSeconds: (elapsedSeconds: number) => void;
}

const useTimer = (startingElapsedSeconds = 0): TimerState => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTime = useRef<number | null>(null);
  const accumulatedTime = useRef(startingElapsedSeconds * 1000);

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
  };

  useEffect(() => {
    if (isRunning && startTime.current !== null) {
      const intervalId = setInterval(() => {
        setElapsedTime(
          accumulatedTime.current + Date.now() - (startTime.current || 0)
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
