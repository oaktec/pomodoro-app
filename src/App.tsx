import { useState, useEffect, useRef, useCallback } from "react";
import TimerModeSelect from "./components/TimerModeSelect";
import Logo from "./assets/Logo.svg";
import MainTimer from "./components/MainTimer";
import Settings from "./components/Settings";
import alarmSound from "./assets/alarm.wav";
import { formatTimeMinsSeconds } from "./lib/utils";
import PomoCount from "./components/PomoCount";

import useLocalStorage from "./hooks/useLocalStorage";
import useTimer from "./hooks/useTimer";

export type Mode = "focus" | "short break" | "long break";

export type Modes = {
  [key in Mode]: {
    duration: number;
    colorName: string;
  };
};

const defaultModes: Modes = {
  focus: {
    duration: 1500,
    colorName: "red",
  },
  "short break": {
    duration: 300,
    colorName: "teal",
  },
  "long break": {
    duration: 900,
    colorName: "purple",
  },
};

export const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>("focus");
  const [modes, setModes] = useLocalStorage<Modes>("modes", defaultModes);
  const [pomoCount, setPomoCount] = useLocalStorage<number>("pomoCount", 0);
  const [today, setToday] = useLocalStorage<string>(
    "today",
    new Date().toLocaleDateString()
  );
  const [dailyFocusTime, setDailyFocusTime] = useLocalStorage<number>(
    "dailyFocusTime",
    0
  );

  const { isRunning, elapsedTime, toggleTimer, resetTimer } = useTimer();
  const dailyFocusTimer = useTimer(dailyFocusTime);

  const timeRemaining = Math.max(
    0,
    Math.floor(modes[mode].duration - elapsedTime)
  );

  const sound = useRef(new Audio(alarmSound));
  const modeRef = useRef(mode);

  // Function to show notifications
  const showNotification = useCallback(() => {
    if (Notification.permission === "granted") {
      void new Notification("Time's up!", {
        body: `Your ${modeRef.current} is over.`,
      });
    }
  }, []);

  // Request permission for notifications and check if it's a new day
  useEffect(() => {
    if ("Notification" in window) {
      void Notification.requestPermission();
    }

    if (today !== new Date().toLocaleDateString()) {
      setToday(new Date().toLocaleDateString());
      setDailyFocusTime(0);
      dailyFocusTimer.resetTimer();
      setPomoCount(0);
    }
  }, [setToday, dailyFocusTimer, today, setDailyFocusTime, setPomoCount]);

  // Update daily focus time
  useEffect(() => {
    if (dailyFocusTimer.isRunning) {
      setDailyFocusTime(dailyFocusTimer.elapsedTime);
    }
  }, [
    dailyFocusTimer.elapsedTime,
    dailyFocusTimer.isRunning,
    setDailyFocusTime,
  ]);

  // Update modeRef and reset timer when mode changes
  useEffect(() => {
    modeRef.current = mode;
    resetTimer();
  }, [mode, resetTimer]);

  // Play alarm sound and show notification when timer is done
  // Keep document title updated with time remaining
  useEffect(() => {
    if (elapsedTime >= modes[mode].duration) {
      toggleTimer();
      void sound.current.play();
      showNotification();

      if (mode === "focus") {
        setPomoCount((pomoCount) => pomoCount + 1);
        setMode("short break");
      } else {
        setMode("focus");
      }
    }
    document.title = `${formatTimeMinsSeconds(
      timeRemaining
    )} - ${mode} | pomodoro timer`;
  }, [
    timeRemaining,
    elapsedTime,
    modes,
    mode,
    toggleTimer,
    setPomoCount,
    showNotification,
  ]);

  // Toggle timer and daily focus timer when play/pause button is clicked
  const onPlayPause = useCallback(() => {
    toggleTimer();
    if (modeRef.current === "focus") {
      dailyFocusTimer.toggleTimer();
    } else {
      if (dailyFocusTimer.isRunning) {
        dailyFocusTimer.toggleTimer();
      }
    }
  }, [toggleTimer, dailyFocusTimer]);

  return (
    <div className="mobile-safari-height-fix container flex h-screen flex-col">
      <header className="flex justify-center">
        <img
          className="mt-8 h-6 sm:mt-20 sm:h-8 lg:mt-8"
          src={Logo}
          alt="logo"
        />
      </header>
      <main className="mt-11 flex flex-1 flex-col items-center sm:mt-14">
        <TimerModeSelect
          selected={mode}
          modes={modes}
          onSelect={(mode: Mode) => {
            setMode(mode);
          }}
        />
        <PomoCount count={pomoCount} />
        <div className="flex flex-1 flex-col items-center justify-around">
          <MainTimer
            className="mb-6"
            mode={mode}
            modes={modes}
            timeRemaining={timeRemaining}
            dailyFocusTime={dailyFocusTimer.elapsedTime}
            isRunning={isRunning}
            onPlayPause={onPlayPause}
          />
          <Settings modes={modes} setModes={setModes} />
        </div>
      </main>
    </div>
  );
};

export default App;
