import { useEffect } from "react";

function runCounter(el: HTMLElement, reduceMotion: boolean) {
  const target = parseFloat(el.dataset.count ?? "0");
  const suffix = el.dataset.suffix ?? "";

  if (reduceMotion) {
    el.textContent = `${target}${suffix}`;
    return;
  }

  const dur = 1300;
  const start = performance.now();
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  const tick = (now: number) => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = `${Math.round(target * ease(p))}${suffix}`;
    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = `${target}${suffix}`;
    }
  };

  requestAnimationFrame(tick);
}

function showElement(el: Element, reduceMotion: boolean) {
  el.classList.add("shown");
  el.querySelectorAll<HTMLElement>(".count").forEach((countEl) => {
    runCounter(countEl, reduceMotion);
  });
}

export function useScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const revealEls = document.querySelectorAll(".r2, .r2g");

    if ("IntersectionObserver" in window && !reduceMotion) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              showElement(entry.target, reduceMotion);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
      );

      revealEls.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }

    revealEls.forEach((el) => showElement(el, reduceMotion));
  }, []);
}
