import { useEffect, useState } from "react";
import faceGif from "../assets/face.gif";

function Loader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // pequeño delay para entrada más cinematográfica
    const t = setTimeout(() => setShow(true), 100);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`loader ${show ? "show" : ""}`}>
      <img src={faceGif} alt="loading" />
    </div>
  );
}

export default Loader;