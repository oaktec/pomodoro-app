import DesignSystem from "./pages/DesignSystem";

import Logo from "./assets/Logo.svg";

function App() {
  return (
    <div className="container">
      <header className="flex justify-center">
        <img className="mt-8 h-6" src={Logo} alt="logo" />
      </header>
      <main className="mt-11 flex flex-col">
        <div>timer mode select</div>
        <div>main timer with countdown</div>
        <div>settings cog</div>
      </main>
    </div>
  );
}

export default App;
