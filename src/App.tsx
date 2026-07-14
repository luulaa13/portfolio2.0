import { useEffect, useState, type ComponentProps } from "react";
import { Routes, Route, useLocation, useParams, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import BuildLog from "./Reto30/Reto30";
import BuildPage from "./Reto30/BuildPage";
import { BUILDS } from "./Reto30/builds";
import ArtMusPage from "./pages/artmus/ArtMusPage";
import NextPage from "./pages/next/NextPage";

/* Link de React Router adaptado (su Link usa `to`, el componente pide `href`) */
const RouterLink = ({ href, ...rest }: ComponentProps<"a">) => (
  <Link to={href ?? "#"} {...rest} />
);

const slugify = (name: string) =>
  name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");

/* Ruta dinámica: /build-log/vena-viva, /build-log/lo-que-sea... */
function BuildRoute() {
  const { slug } = useParams();
  const i = BUILDS.findIndex((b) => slugify(b.name) === slug);
  if (i === -1) return <BuildLog linkAs={RouterLink} />; // slug desconocido → listado
  return (
    <BuildPage
      build={BUILDS[i]}
      backHref="/build-log"
      prev={BUILDS[i - 1]}
      next={BUILDS[i + 1]}
      linkAs={RouterLink}
    />
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  /* El loader solo corre una vez por sesión, aunque haya recargas */
  const [bootDone, setBootDone] = useState(
    () => sessionStorage.getItem("boot-done") === "1"
  );
  const finishBoot = () => {
    sessionStorage.setItem("boot-done", "1");
    setBootDone(true);
  };

  const { pathname } = useLocation();
  /* startsWith: cubre /build-log Y /build-log/vena-viva */
  const hideNavbar = pathname.startsWith("/build-log");

  return (
    <>
      {!bootDone && <Loader onDone={finishBoot} />}
      {bootDone && <CustomCursor />}
      {!hideNavbar && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home ready={bootDone} />} />
        <Route path="/build-log" element={<BuildLog linkAs={RouterLink} />} />
        <Route path="/build-log/:slug" element={<BuildRoute />} />
        <Route path="/projects/artmus" element={<ArtMusPage />} />
        <Route path="/projects/next" element={<NextPage />} />
      </Routes>
    </>
  );
}

export default App;