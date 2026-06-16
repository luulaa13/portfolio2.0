import { useEffect, useState } from "react";


const words = ["research", "diseño", "código", "prototipos", "deploy"];

function Hero() {
    const [index, setIndex] = useState(0);
   const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setAnimating(false);
      }, 300); // duración animación

    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
   <section className="hero">
  <div className="hero-container">

    <span className="hero-label">
      PRODUCT BUILDER — END TO END
    </span>

    <h1 className="hero-title">
      De la idea
      <br />
      al producto.
    </h1>

    <p className="hero-description">
      Soy Lucía. Diseño, programo y diseño productos digitales
      de principio a fin.
    </p>
    <a href="#projects" className="hero-link">
      hoy construyo:&nbsp;

      <span className="word-wrapper">
        <span className={`word ${animating ? "out" : "in"}`}>
          {words[index]}
        </span>
      </span>
    </a>
  </div>
</section>
  );
}

export default Hero;