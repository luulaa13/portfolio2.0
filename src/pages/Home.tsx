import type { JSX } from "react";

import Hero from "../components/Hero";
import About from "../components/About";
import WhatIDo from "../components/WhatIDo";
import Proyect from "../components/Proyect";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

interface HomeProps {
  ready?: boolean;
}

export default function Home({ ready = true }: HomeProps): JSX.Element {
  return (
    <>
      <Hero ready={ready} />

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

      <About />
      <WhatIDo />
      <Proyect />
      <Contact />
      <Footer />
    </>
  );
}