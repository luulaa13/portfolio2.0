import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";


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
      <Hero/>
     
    </>
  );
}

export default App;