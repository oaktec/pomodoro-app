import { useState, useEffect, useRef } from "react";
import TimerModeSelect from "./components/TimerModeSelect";
import Logo from "./assets/Logo.svg";
import MainTimer from "./components/MainTimer";
import Settings from "./components/Settings";
import alarmSound from "./assets/alarm.wav";
import clickSound from "./assets/click.wav";
import { formatTimeMinsSeconds, showNotification } from "./lib/utils";
import PomoCount from "./components/PomoCount";

import useLocalStorage from "./hooks/useLocalStorage";
import useTimer from "./hooks/useTimer";
import useCheckNewDay from "./hooks/useCheckNewDay";

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
  const [dailyFocusTime, setDailyFocusTime] = useLocalStorage<number>(
    "dailyFocusTime",
    0
  );

  const click = useRef(new Audio(clickSound));
  const alarm = useRef(new Audio(alarmSound));

  const mainTimer = useTimer({
    duration: modes[mode].duration,
    onTimerEnd: () => {
      void alarm.current.play();
      showNotification("Time's up!", `Your ${mode} is over.`);

      if (mode === "focus") {
        setPomoCount((pomoCount) => pomoCount + 1);
        if (pomoCount >= 3) {
          setMode("long break");
        } else {
          setMode("short break");
        }
      } else {
        setMode("focus");
      }
    },
  });

  const dailyFocusTimer = useTimer({
    startingElapsedSeconds: dailyFocusTime,
    onTimerInterval: () => {
      setDailyFocusTime(dailyFocusTimer.elapsedTime);
    },
  });

  // Reset daily focus timer and pomo count when it's a new day
  useCheckNewDay(() => {
    setDailyFocusTime(0);
    dailyFocusTimer.resetTimer();
    setPomoCount(0);
  });

  // Request permission for notifications and check if it's a new day
  useEffect(() => {
    if ("Notification" in window) {
      void Notification.requestPermission();
    }
  }, []);

  const timeRemaining = Math.max(
    0,
    Math.floor(modes[mode].duration - mainTimer.elapsedTime)
  );

  // Update document title with time remaining and current mode
  useEffect(() => {
    document.title = `${formatTimeMinsSeconds(
      timeRemaining
    )} - ${mode} | pomodoro timer`;
  }, [timeRemaining, mode]);

  // Toggle timer and daily focus timer when play/pause button is clicked
  const onPlayPause = () => {
    mainTimer.toggleTimer();
    void click.current.play();
    if (mode === "focus") {
      dailyFocusTimer.toggleTimer();
    } else {
      if (mode === "long break") setPomoCount(0);
      if (dailyFocusTimer.isRunning) {
        dailyFocusTimer.toggleTimer();
      }
    }
  };

  return (
    <div className="container flex h-screen flex-col">
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
            mainTimer.resetTimer();
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
            dailyFocusTime={dailyFocusTime}
            isRunning={mainTimer.isRunning}
            onPlayPause={onPlayPause}
          />
          <Settings modes={modes} setModes={setModes} />
        </div>
      </main>
    </div>
  );
};

export default App;
