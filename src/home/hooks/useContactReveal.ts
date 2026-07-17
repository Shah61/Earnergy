import { useEffect, type RefObject } from "react";

const REVEAL_SELECTOR =
  ".c-r, .c-r-fade, .c-r-rise, .c-r-slide-l, .c-r-slide-r, .c-r-scale, .c-r-curtain, .c-r-curtain-r, .c-hero-deco, .c-social-pop, .c-cta-arc";

export function useContactReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((el) => el.classList.add("shown"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("shown");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}
