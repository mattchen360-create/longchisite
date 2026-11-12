"use client";
import { useEffect, useRef } from "react";

export function HomeMotion() {
  const anchor = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = anchor.current?.closest("main");
    if (!root) return;
    const photos = Array.from(
      root.querySelectorAll<HTMLElement>(".story-photo-window"),
    );
    const media = matchMedia(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
    );
    const active = new Set<HTMLElement>(),
      seen = new WeakSet<HTMLElement>(),
      animations = new Set<Animation>();
    let frame = 0,
      observer: IntersectionObserver | null = null;
    function update() {
      frame = 0;
      if (!media.matches) return;
      for (const el of active) {
        const r = el.getBoundingClientRect();
        if (!r.width) continue;
        const offset = Math.max(
          -1,
          Math.min(
            1,
            (r.top + r.height / 2 - innerHeight / 2) /
              (innerHeight / 2 + r.height / 2),
          ),
        );
        el.style.setProperty("--photo-shift", `${(-offset * 14).toFixed(2)}px`);
      }
    }
    function schedule() {
      if (media.matches && !frame) frame = requestAnimationFrame(update);
    }
    function stop() {
      observer?.disconnect();
      observer = null;
      active.clear();
      cancelAnimationFrame(frame);
      frame = 0;
      animations.forEach((a) => a.cancel());
      animations.clear();
      photos.forEach((el) => {
        el.removeAttribute("data-depth");
        el.style.removeProperty("--photo-shift");
      });
    }
    function setup() {
      stop();
      if (!media.matches || !("IntersectionObserver" in window)) return;
      photos.forEach((el) => (el.dataset.depth = "true"));
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              active.add(el);
              if (
                !seen.has(el) &&
                el.closest(".factory-story,.exhibition-story")
              ) {
                seen.add(el);
                const a = el.animate(
                  [
                    { clipPath: "inset(7% 0 7% 0)" },
                    { clipPath: "inset(0 0 0 0)" },
                  ],
                  { duration: 850, easing: "cubic-bezier(.2,.7,.2,1)" },
                );
                animations.add(a);
                a.finished.then(() => animations.delete(a)).catch(() => {});
              }
            } else active.delete(el);
          }
          schedule();
        },
        { rootMargin: "80px 0px", threshold: 0.05 },
      );
      photos.forEach((el) => observer!.observe(el));
      schedule();
    }
    setup();
    media.addEventListener("change", setup);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      stop();
      media.removeEventListener("change", setup);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return <span ref={anchor} hidden aria-hidden="true" />;
}
