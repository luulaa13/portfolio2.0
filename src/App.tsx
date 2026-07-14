import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import BuildLog from "./Reto30/Reto30";
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
  const [bootDone, setBootDone] = useState(false);
  const { pathname } = useLocation();

  const hideNavbar = pathname === "/build-log";

  return (
    <>
       {!bootDone && <Loader onDone={() => setBootDone(true)} />}

       {bootDone && <CustomCursor />}
       
       {!hideNavbar && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home ready={bootDone} />} />
        <Route path="/build-log" element={<BuildLog />} />
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