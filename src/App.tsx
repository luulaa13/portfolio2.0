import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";


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

 return (
    <>
      <Navbar />

      <div className="hero">
        <h1>Mi Portfolio</h1>
      </div>
    </>
  );
}

export default App;