import { useEffect, useState } from "react";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);

      setTimeout(() => {
        setLoading(false);
      }, 600);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={fade ? "fade-out" : ""}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="hero">
      <h1>Mi Portfolio</h1>
      <p>Bienvenido a mi web</p>
    </div>
  );
}

export default App;