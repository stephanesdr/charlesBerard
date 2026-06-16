"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type AnimationOrchestratorContextValue = {
  register: (id: string, timeline: gsap.core.Timeline) => void;
  playIn: (id: string) => void;
  playOut: (id: string) => void;
};

const AnimationOrchestratorContext =
  createContext<AnimationOrchestratorContextValue | null>(null);

export function AnimationOrchestratorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const timelines = useRef<Map<string, gsap.core.Timeline>>(new Map());

  const register = useCallback((id: string, timeline: gsap.core.Timeline) => {
    timelines.current.set(id, timeline);
  }, []);

  const playIn = useCallback((id: string) => {
    const tl = timelines.current.get(id);
    if (tl) tl.play(0);
  }, []);

  const playOut = useCallback((id: string) => {
    const tl = timelines.current.get(id);
    if (tl) tl.reverse();
  }, []);

  const value = useMemo(
    () => ({ register, playIn, playOut }),
    [register, playIn, playOut],
  );

  useGSAP(() => {
    gsap.defaults({ ease: "power2.out", duration: 0.4 });
  });

  return (
    <AnimationOrchestratorContext.Provider value={value}>
      {children}
    </AnimationOrchestratorContext.Provider>
  );
}

export function useAnimationOrchestrator() {
  const ctx = useContext(AnimationOrchestratorContext);
  if (!ctx) {
    throw new Error(
      "useAnimationOrchestrator must be used within AnimationOrchestratorProvider",
    );
  }
  return ctx;
}
