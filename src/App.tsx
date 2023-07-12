import { useState, useEffect, useRef } from "react";

import TimerModeSelect from "./components/TimerModeSelect";
import Logo from "./assets/Logo.svg";
import MainTimer from "./components/MainTimer";
import Settings from "./components/Settings";
import alarmSound from "./assets/alarm.wav";
import { formatTime } from "./lib/utils";

function App() {
  const [mode, setMode] = useState<"focus" | "short break" | "long break">(
    "focus"
  );
  const [modes, setModes] = useState(
    () =>
      (JSON.parse(localStorage.getItem("modes")!) as {
        [key: string]: {
          label: string;
          duration: number;
          colorName: string;
        };
      }) || {
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
      }
  );
  const [timeRemaining, setTimeRemaining] = useState(modes[mode].duration);
  const [isRunning, setIsRunning] = useState(false);

  const sound = useRef(new Audio(alarmSound));
  const modeRef = useRef(mode);

  useEffect(() => {
    localStorage.setItem("modes", JSON.stringify(modes));
  }, [modes]);

  useEffect(() => {
    if ("Notification" in window) {
      void Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      setIsRunning(false);
      void sound.current.play();
      showNotification();
    }
    document.title = `${formatTime(timeRemaining)} - ${
      modeRef.current
    } | pomodoro timer`;
  }, [timeRemaining]);

  useEffect(() => {
    setTimeRemaining(modes[mode].duration);
  }, [mode, modes]);

  useEffect(() => {
    modeRef.current = mode;
    setIsRunning(false);
  }, [mode]);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTimeRemaining((timeRemaining) => timeRemaining - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isRunning]);

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
    }
    setIsRunning((isRunning) => !isRunning);
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
          className="mb-12"
          selected={mode}
          modes={modes}
          onSelect={(mode: "focus" | "short break" | "long break") =>
            setMode(mode)
          }
        />
        <div className="flex flex-1 flex-col items-center justify-around">
          <MainTimer
            className="mb-6"
            mode={mode}
            modes={modes}
            timeRemaining={timeRemaining}
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
}

export default App;