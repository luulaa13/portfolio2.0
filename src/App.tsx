import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import ArtMusPage from "./pages/artmus/ArtMusPage";
import NextPage from "./pages/next/NextPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

const [hide, setHide] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setHide(true);

      setTimeout(() => {
        setLoading(false);
      }, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }
 return (
   <>
     <CustomCursor />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route
          path="/projects/artmus"
          element={<ArtMusPage />}
        />

        <Route
          path="/projects/next"
          element={<NextPage />}
        />
      </Routes>
   </>
  );
}

export default App;