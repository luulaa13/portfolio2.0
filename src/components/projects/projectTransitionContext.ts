import { createContext, useContext } from "react";

export interface TransitionPayload {
  slug: string;
  image: string;
  rect: DOMRect;
}

export interface ProjectTransitionContextValue {
  startTransition: (payload: TransitionPayload) => void;
}

export const ProjectTransitionContext =
  createContext<ProjectTransitionContextValue | null>(null);

export function useProjectTransition(): ProjectTransitionContextValue {
  const ctx = useContext(ProjectTransitionContext);
  if (!ctx) {
    throw new Error(
      "useProjectTransition must be used within a ProjectTransitionProvider"
    );
  }
  return ctx;
}
