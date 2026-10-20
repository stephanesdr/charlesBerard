"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import type { HomeIntroMedia as HomeIntroMediaValue } from "@/lib/sanity/fallback-data";
import { urlFor } from "@/lib/sanity/image";
import { Media } from "@/components/media/Media";

type HomeIntroMediaProps = {
  media?: HomeIntroMediaValue | null;
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

export function HomeIntroMedia({ media }: HomeIntroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => true,
  );
  const videoUrl = media?.kind === "video" ? media.videoUrl : null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => setIsPlaying(false));
  }, [prefersReducedMotion, videoUrl]);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play().catch(() => setIsPlaying(false));
      return;
    }

    video.pause();
  };

  const poster = media?.poster?.asset?._ref
    ? urlFor(media.poster).width(1920).auto("format").url()
    : undefined;

  return (
    <section
      data-home-section="intro-media"
      className="absolute inset-x-0 top-[46dvh] z-30 sm:top-[43dvh] lg:top-[40dvh]"
    >
      <div className="relative mx-auto aspect-video w-full max-w-full overflow-hidden bg-ink/5 sm:w-4/5 lg:w-2/3">
        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              poster={poster}
              muted
              loop
              playsInline
              autoPlay={!prefersReducedMotion}
              preload="metadata"
              aria-label={media?.alt || "Intro video"}
              className="h-full w-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
            <button
              type="button"
              onClick={() => void togglePlayback()}
              aria-label={isPlaying ? "Pause intro video" : "Play intro video"}
              aria-pressed={isPlaying}
              className="absolute right-4 bottom-4 grid size-12 place-items-center rounded-full bg-surface/90 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {isPlaying ? (
                <Pause aria-hidden="true" className="size-5" />
              ) : (
                <Play aria-hidden="true" className="size-5 translate-x-px" />
              )}
            </button>
          </>
        ) : (
          <Media
            image={media?.kind === "image" ? media.image : media?.poster}
            alt={media?.alt ?? ""}
            fill
            priority
            sizes="(max-width: 600px) 90vw, (max-width: 1100px) 80vw, 68rem"
            placeholderLabel="Intro media"
          />
        )}
      </div>
    </section>
  );
}
