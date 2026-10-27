import { useEffect } from "react";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** Smooth-scroll to a selector/element/position, falling back to native scrolling without Lenis. */
export const scrollToTarget = (target: string | HTMLElement | number, offset = -12) => {
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else {
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
};

const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });
    instance = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Route in-page anchor clicks through Lenis so they glide instead of jumping
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector<HTMLElement>(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -12, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
};

export default SmoothScroll;
