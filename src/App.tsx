import { useState, useEffect } from "react";

import TimerModeSelect from "./components/TimerModeSelect";

import Logo from "./assets/Logo.svg";
import MainTimer from "./components/MainTimer";

function App() {
  const [mode, setMode] = useState<"pomodoro" | "short break" | "long break">(
    "pomodoro"
  );
  const [timeRemaining, setTimeRemaining] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

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
          className="mb-12"
          selected={mode}
          onSelect={(mode: "pomodoro" | "short break" | "long break") =>
            setMode(mode)
          }
        />
        <div className="flex flex-1 flex-col items-center justify-around">
          <MainTimer
            className="mb-6"
            mode={mode}
            timeRemaining={timeRemaining}
            isRunning={isRunning}
            onPlayPause={() => {
              setIsRunning(!isRunning);
            }}
          />
          <div className="">settings cog</div>
        </div>
      </main>
    </div>
  );
}

export default App;
