import { useState } from "react";

import TimerModeSelect from "./components/TimerModeSelect";

import Logo from "./assets/Logo.svg";

function App() {
  const [mode, setMode] = useState<"pomodoro" | "short-break" | "long-break">(
    "pomodoro"
  );

  return (
    <div className="container">
      <header className="flex justify-center">
        <img className="mt-8 h-6" src={Logo} alt="logo" />
      </header>
      <main className="mt-11 flex flex-col">
        <TimerModeSelect
          className="mb-6"
          selected={mode}
          onSelect={(mode: "pomodoro" | "short-break" | "long-break") =>
            setMode(mode)
          }
        />
        <div>main timer with countdown</div>
        <div>settings cog</div>
      </main>
    </div>
  );
}

export default App;
