import { useEffect, type RefObject } from "react";

const REVEAL_SELECTOR =
  ".r, .r-fade, .r-rise, .r-slide-l, .r-slide-r, .r-scale, .r-curtain, .r-curtain-r";

export function useProductsReveal(
  rootRef: RefObject<HTMLElement | null>,
  resetKey?: string,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
    elements.forEach((el) => el.classList.remove("shown"));

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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef, resetKey]);
}
