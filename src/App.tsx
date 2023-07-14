import { useState, useEffect, useRef } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import TimerModeSelect from "./components/TimerModeSelect";
import Logo from "./assets/Logo.svg";
import MainTimer from "./components/MainTimer";
import Settings from "./components/Settings";
import alarmSound from "./assets/alarm.wav";
import { formatTimeMinsSeconds } from "./lib/utils";
import PomoCount from "./components/PomoCount";

type Mode = "focus" | "short break" | "long break";

type Modes = {
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

export const App = () => {
  const [mode, setMode] = useState<Mode>("focus");
  const [modes, setModes] = useLocalStorage<Modes>("modes", defaultModes);
  const [pomoCount, setPomoCount] = useLocalStorage<number>("pomoCount", 0);
  const [dailyFocusTime, setDailyFocusTime] = useLocalStorage<number>(
    "dailyFocusTime",
    0
  );
  const [today, setToday] = useLocalStorage<string>(
    "today",
    new Date().toLocaleDateString()
  );

  const [timeRemaining, setTimeRemaining] = useState(modes[mode].duration);
  const [timerStartTime, setTimerStartTime] = useState<Date | null>(null);
  const [timerStartAmount, setTimerStartAmount] = useState(
    modes[mode].duration
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isFocussed, setIsFocussed] = useState(false);
  const [lastFocusTimerAdded, setLastFocusTimerAdded] = useState<Date | null>(
    null
  );

  const sound = useRef(new Audio(alarmSound));
  const modeRef = useRef(mode);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("modes", JSON.stringify(modes));
  }, [modes]);
  useEffect(() => {
    localStorage.setItem("dailyFocusTime", dailyFocusTime.toString());
  }, [dailyFocusTime]);
  useEffect(() => {
    localStorage.setItem("today", today);
  }, [today]);
  useEffect(() => {
    localStorage.setItem("pomoCount", pomoCount.toString());
  }, [pomoCount]);

  useEffect(() => {
    if ("Notification" in window) {
      void Notification.requestPermission();
    }

    if (localStorage.getItem("today") !== new Date().toLocaleDateString()) {
      setToday(new Date().toLocaleDateString());
      setDailyFocusTime(0);
      setPomoCount(0);
    }
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      setIsRunning(false);
      void sound.current.play();
      showNotification();
      if (modeRef.current === "focus") {
        setPomoCount((pomoCount) => pomoCount + 1);
        setMode("short break");
      } else {
        setMode("focus");
      }
    }
    document.title = `${formatTimeMinsSeconds(timeRemaining)} - ${
      modeRef.current
    } | pomodoro timer`;
  }, [timeRemaining]);

  useEffect(() => {
    setTimeRemaining(modes[mode].duration);
    setTimerStartAmount(modes[mode].duration);
  }, [mode, modes]);

  useEffect(() => {
    modeRef.current = mode;
    setIsRunning(false);
  }, [mode]);

  useEffect(() => {
    if (isRunning) {
      if (!timerStartTime) setTimerStartTime(new Date());
      const timer = setInterval(() => {
        if (timerStartTime) {
          const elapsedSeconds = Math.floor(
            (new Date().getTime() - timerStartTime.getTime()) / 1000
          );
          setTimeRemaining(Math.max(0, timerStartAmount - elapsedSeconds));
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isRunning, timerStartTime, timerStartAmount]);

  useEffect(() => {
    if (isFocussed) {
      if (!lastFocusTimerAdded) setLastFocusTimerAdded(new Date());
      const timer = setInterval(() => {
        if (lastFocusTimerAdded) {
          setDailyFocusTime(
            (dailyFocusTime) =>
              dailyFocusTime +
              Math.floor(
                (new Date().getTime() - lastFocusTimerAdded.getTime()) / 1000
              )
          );
          setLastFocusTimerAdded(new Date());
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isFocussed, lastFocusTimerAdded]);

  useEffect(() => {
    if (!isFocussed) {
      setLastFocusTimerAdded(null);
    }
  }, [isFocussed]);

  const showNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      void new Notification("Time's up!", {
        body: `Your ${modeRef.current} is over.`,
      });
    }
  };

  const onPlayPause = () => {
    if (timeRemaining === 0 && !isRunning) {
      setTimeRemaining(modes[mode].duration);
      setTimerStartAmount(modes[mode].duration);
    }
    setIsRunning((isRunning) => !isRunning);
    if (!isRunning) {
      setTimerStartTime(new Date());
      setTimerStartAmount(timeRemaining);
    }
    if (mode === "focus" && !isRunning) {
      setIsFocussed(true);
    } else {
      setIsFocussed(false);
    }
    if (mode === "long break" && !isRunning) {
      setPomoCount(0);
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
            setIsFocussed(false);
          }}
        />
        <PomoCount count={pomoCount} />
        <div className="flex flex-1 flex-col items-center justify-around">
          <MainTimer
            className="mb-6"
            mode={mode}
            modes={modes}
            timeRemaining={timeRemaining}
            dailyFocusTime={dailyFocusTime}
            isRunning={isRunning}
            onPlayPause={onPlayPause}
          />
          <Settings
            modes={
              modes as {
                focus: { label: string; duration: number; colorName: string };
                "short break": {
                  label: string;
                  duration: number;
                  colorName: string;
                };
                "long break": {
                  label: string;
                  duration: number;
                  colorName: string;
                };
              }
            }
            setModes={
              setModes as React.Dispatch<
                React.SetStateAction<{
                  focus: { label: string; duration: number; colorName: string };
                  "short break": {
                    label: string;
                    duration: number;
                    colorName: string;
                  };
                  "long break": {
                    label: string;
                    duration: number;
                    colorName: string;
                  };
                }>
              >
            }
          />
        </div>
      </main>
    </div>
  );
};

export default App;
