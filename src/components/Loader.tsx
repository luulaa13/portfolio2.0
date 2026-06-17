import { useEffect, useState } from "react";
import faceDesktop from "../assets/face2.gif";
import faceMobile from "../assets/face1.gif";

function Loader() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="loader">
      <img src={isMobile ? faceMobile : faceDesktop} alt="loading" />
    </div>
  );
}

export default Loader;