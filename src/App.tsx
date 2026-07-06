import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import { ProjectTransitionProvider } from "./components/projects/ProjectTransition";

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
    <ProjectTransitionProvider>
     <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </ProjectTransitionProvider>
  );
}

export default App;