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
    <div className="container">
      <header className="flex justify-center">
        <img className="mt-8 h-6" src={Logo} alt="logo" />
      </header>
      <main className="mt-11 flex flex-col">
        <TimerModeSelect
          className="mb-6"
          selected={mode}
          onSelect={(mode: "pomodoro" | "short break" | "long break") =>
            setMode(mode)
          }
        />
        <MainTimer
          className="mb-6"
          mode={mode}
          timeRemaining={timeRemaining}
          isRunning={isRunning}
          onPlayPause={() => {
            setIsRunning(!isRunning);
          }}
        />
        <div>settings cog</div>
      </main>
    </div>
  );
}

export default App;
