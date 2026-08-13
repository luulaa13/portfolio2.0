import { useEffect, useState, type ComponentProps } from "react";
import { Routes, Route, useLocation, useParams, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import BuildLog from "./Reto30/Reto30";
import BuildPage from "./Reto30/BuildPage";
import { BUILDS } from "./Reto30/builds";
import { PROJECTS } from "./Reto30/projects";
import ArtMusPage from "./pages/artmus/ArtMusPage";
import NextPage from "./pages/next/NextPage";
import Diario from "./pages/diario/Diario";
import DiarioEntryPage from "./pages/diario/DiarioEntryPage";
import { getDiarioEntryBySlug } from "./pages/diario/entries";

/* Link de React Router adaptado (su Link usa `to`, el componente pide `href`) */
const RouterLink = ({ href, ...rest }: ComponentProps<"a">) => (
  <Link to={href ?? "#"} {...rest} />
);

/* Ruta dinámica: /build-log/vena-viva, /build-log/lo-que-sea... */
function BuildRoute() {
  const { slug } = useParams();
  const i = BUILDS.findIndex((b) => b.slug === slug);
  if (i === -1) return <BuildLog linkAs={RouterLink} />; // slug desconocido → listado
  const build = BUILDS[i];
  // prev/next salen de PROJECTS (el listado completo), no de BUILDS:
  // así el nav ya muestra el nombre de un build aunque aún no tenga página propia.
  return (
    <BuildPage
      build={build}
      backHref="/build-log"
      prev={PROJECTS.find((p) => p.num === build.num - 1)}
      next={PROJECTS.find((p) => p.num === build.num + 1)}
      linkAs={RouterLink}
    />
  );
}

/* Ruta dinámica: /diario/mi-entrada... */
function DiarioRoute() {
  const { slug } = useParams();
  const entry = getDiarioEntryBySlug(slug ?? "");
  if (!entry) return <Diario />; // slug desconocido → listado
  return <DiarioEntryPage entry={entry} />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const mediaQuery = window.matchMedia("(pointer: coarse)");

  const update = () => setIsMobile(mediaQuery.matches);

  update();

  mediaQuery.addEventListener("change", update);

  return () => mediaQuery.removeEventListener("change", update);
}, []);
  
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
      {bootDone && !isMobile && <CustomCursor />}
      {!hideNavbar && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home ready={bootDone} />} />
        <Route path="/build-log" element={<BuildLog linkAs={RouterLink} />} />
        <Route path="/build-log/:slug" element={<BuildRoute />} />
        <Route path="/projects/artmus" element={<ArtMusPage />} />
        <Route path="/projects/ondea" element={<NextPage />} />
        <Route path="/diario" element={<Diario />} />
        <Route path="/diario/:slug" element={<DiarioRoute />} />
      </Routes>
    </>
  );
}

export default App;
