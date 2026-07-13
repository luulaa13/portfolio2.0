import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import AllProjects from "./pages/AllProjects";
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

  return (
    <>
      {!bootDone && <Loader onDone={() => setBootDone(true)} />}
      <CustomCursor />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home ready={bootDone} />} />
        <Route path="/projects" element={<AllProjects />} />
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