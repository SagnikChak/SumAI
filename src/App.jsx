import Hero from "./components/Hero";
import Demo from "./components/Demo";

import './App.css';

const App = () => {
  return (
    <main>
      <div className="main bg-black">
        <div className="bg-black" />
      </div>

      <div className="app">
        <Hero />
        <Demo />
      </div>
    </main>
  );
};

export default App;