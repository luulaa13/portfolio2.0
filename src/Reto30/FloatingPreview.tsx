import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';
import type { Project } from './types';
import { pad } from './DayRow';

export interface FloatingPreviewHandle {
  show: (project: Project) => void;
  hide: () => void;
}

/**
 * Preview que sigue al cursor sobre las filas activas.
 * Solo se monta el listener en dispositivos con puntero fino;
 * en táctil el componente queda oculto vía CSS.
 */
export const FloatingPreview = forwardRef<FloatingPreviewHandle>(
  function FloatingPreview(_props, ref) {
    const el = useRef<HTMLDivElement>(null);
    const [project, setProject] = useState<Project | null>(null);

    useImperativeHandle(ref, () => ({
      show(p: Project) {
        setProject(p);
        if (!el.current) return;
        gsap.to(el.current, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: 'power3.out',
        });
      },
      hide() {
        if (!el.current) return;
        gsap.to(el.current, {
          opacity: 0,
          scale: 0.85,
          duration: 0.3,
          ease: 'power3.in',
        });
      },
    }));

    useEffect(() => {
      const node = el.current;
      if (!node) return;
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches)
        return;

      const xTo = gsap.quickTo(node, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(node, 'y', { duration: 0.5, ease: 'power3.out' });
      const onMove = (e: MouseEvent) => {
        xTo(e.clientX + 26);
        yTo(e.clientY - 190);
      };
      document.addEventListener('mousemove', onMove);
      return () => document.removeEventListener('mousemove', onMove);
    }, []);

    return (
      <div ref={el} className="preview" aria-hidden="true">
        <span className="pv-num">{project ? `BUILD ${pad(project.num)}` : ''}</span>
        {project?.thumb ? (
          <img className="pv-img" src={project.thumb} alt="" />
        ) : (
          <span className="pv-body">
            [ SLOT — CAPTURA ]
            <br />
            AÑADE `thumb` AL PROYECTO
          </span>
        )}
      </div>
    );
  }
);
