import { useParams } from "react-router-dom";
import { projects } from "../data/projects";

import ProjectHero from "../components/projects/ProjectHero";
import ProjectOverview from "../components/projects/ProjectOverview";
import ProjectChallenge from "../components/projects/ProjectChallenge";
import ProjectResearch from "../components/projects/ProjectResearch";

export default function ProjectPage() {
  const { slug } = useParams();

  const project = projects.find((p) => p.slug === slug);

  if (!project) return <h1>404</h1>;

  return (
    <main className="project-page">
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectChallenge project={project} />
      <ProjectResearch project={project} />
    </main>
  );
}