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
    label: string;
    duration: number;
    colorName: string;
  };
};

const defaultModes: Modes = {
  focus: {
    label: "focus",
    duration: 1500,
    colorName: "red",
  },
  "short break": {
    label: "short break",
    duration: 300,
    colorName: "teal",
  },
  "long break": {
    label: "long break",
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

  const showNotification = useCallback(() => {
    if (Notification.permission === "granted") {
      void new Notification("Time's up!", {
        body: `Your ${modeRef.current} is over.`,
      });
    }
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dailyFocusTimer.isRunning) {
      setDailyFocusTime(dailyFocusTimer.elapsedTime);
    }
  }, [
    dailyFocusTimer.elapsedTime,
    dailyFocusTimer.isRunning,
    setDailyFocusTime,
  ]);

  useEffect(() => {
    modeRef.current = mode;
    resetTimer();
  }, [mode]);

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
  }, [timeRemaining, elapsedTime, modes, mode, toggleTimer, setPomoCount]);

  const onPlayPause = () => {
    toggleTimer();
    if (modeRef.current === "focus") {
      dailyFocusTimer.toggleTimer();
    } else {
      if (dailyFocusTimer.isRunning) {
        dailyFocusTimer.toggleTimer();
      }
    }
  };

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
          onSelect={(mode: "focus" | "short break" | "long break") => {
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
