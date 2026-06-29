import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import {Hero} from "./components/Hero";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import WhatIDo from "./components/WhatIDo";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Proyect from "./components/Proyect";


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
      <Hero/>
      <section className="skills-banner">
      <div className="skills-track">
        <div className="skills-row">
          <span>✦ RESEARCH</span>
          <span className="accent">✦ DISEÑO</span>
          <span>✦ FRONTEND</span>
          <span className="accent">✦ BRANDING</span>
          <span>✦ UX/UI</span>
          <span className="accent">✦ MARKETING</span>
          <span>✦ PRODUCTS</span>
          <span className="accent">✦ STRATEGY</span>
        </div>

        <div className="skills-row">
          <span>✦ RESEARCH</span>
          <span className="accent">✦ DISEÑO</span>
          <span>✦ FRONTEND</span>
          <span className="accent">✦ BRANDING</span>
          <span>✦ UX/UI</span>
          <span className="accent">✦ MARKETING</span>
          <span>✦ PRODUCTS</span>
          <span className="accent">✦ STRATEGY</span>
        </div>
      </div>
    </section>
    <WhatIDo/>
    <Proyect/>
    <Contact/>
    <Footer/>
     
    </>
  );
}

export default App;