import "../style/ProjectShowcaseImage.css";

interface ProjectShowcaseImageProps {
  src: string;
  alt: string;
}

export default function ProjectShowcaseImage({
  src,
  alt,
}: ProjectShowcaseImageProps) {
  return (
    <section className="project-showcase">
      <div className="project-showcase-container">
        <img
          src={src}
          alt={alt}
          className="project-showcase-image"
        />
      </div>
    </section>
  );
}