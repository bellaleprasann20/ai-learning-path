import { useEffect } from "react";
import Home from "./pages/Home";

function App() {
  // Professional Touch: Reset scroll position on refresh
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <div className="antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* The wrapper ensures a consistent background 
          and smooth transitions between themes 
      */}
      <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
        <Home />
      </div>
    </div>
  );
}

export default App;