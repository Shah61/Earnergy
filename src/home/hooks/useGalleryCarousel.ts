import { useEffect, useRef } from "react";

export function useGalleryCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const curRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const prev = prevRef.current;
    const next = nextRef.current;
    const curEl = curRef.current;

    const getCards = () =>
      Array.from(track.querySelectorAll<HTMLElement>(".g-card"));

    const pad = (n: number) => String(n).padStart(2, "0");

    const getActiveIndex = () => {
      const cards = getCards();
      if (!cards.length) return 0;

      const scroll = track.scrollLeft;
      let closest = 0;
      let minDist = Infinity;

      cards.forEach((card, idx) => {
        const dist = Math.abs(card.offsetLeft - scroll);
        if (dist < minDist) {
          minDist = dist;
          closest = idx;
        }
      });

      return closest;
    };

    const update = () => {
      const cards = getCards();
      const total = cards.length;
      const i = getActiveIndex();
      indexRef.current = i;

      if (curEl) curEl.textContent = pad(i + 1);
      if (prev) prev.disabled = i <= 0;
      if (next) next.disabled = total <= 1 || i >= total - 1;
    };

    const goTo = (index: number) => {
      const cards = getCards();
      const total = cards.length;
      if (!total) return;

      const nextIndex = Math.min(Math.max(index, 0), total - 1);
      const card = cards[nextIndex];
      if (!card) return;

      track.scrollTo({
        left: card.offsetLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      });

      indexRef.current = nextIndex;
      if (curEl) curEl.textContent = pad(nextIndex + 1);
      if (prev) prev.disabled = nextIndex <= 0;
      if (next) next.disabled = nextIndex >= total - 1;
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    let auto: ReturnType<typeof setInterval> | null = null;
    const stopAuto = () => {
      if (auto) {
        clearInterval(auto);
        auto = null;
      }
    };

    const tickAuto = () => {
      const cards = getCards();
      const total = cards.length;
      if (total <= 1) return;

      if (indexRef.current >= total - 1) {
        goTo(0);
      } else {
        goTo(indexRef.current + 1);
      }
    };

    const startAuto = () => {
      if (reduceMotion) return;
      stopAuto();
      auto = setInterval(tickAuto, 3800);
    };

    const onPrevClick = () => {
      stopAuto();
      goTo(indexRef.current - 1);
    };

    const onNextClick = () => {
      stopAuto();
      goTo(indexRef.current + 1);
    };

    const onImagesReady = () => {
      requestAnimationFrame(update);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    prev?.addEventListener("click", onPrevClick);
    next?.addEventListener("click", onNextClick);
    section.addEventListener("pointerenter", stopAuto);
    section.addEventListener("focusin", stopAuto);
    section.addEventListener("pointerleave", startAuto);
    window.addEventListener("resize", onImagesReady);

    const images = track.querySelectorAll("img");
    images.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", onImagesReady);
    });

    const resizeObserver = new ResizeObserver(onImagesReady);
    resizeObserver.observe(track);

    requestAnimationFrame(() => {
      update();
      startAuto();
    });

    return () => {
      track.removeEventListener("scroll", onScroll);
      stopAuto();
      prev?.removeEventListener("click", onPrevClick);
      next?.removeEventListener("click", onNextClick);
      section.removeEventListener("pointerenter", stopAuto);
      section.removeEventListener("focusin", stopAuto);
      section.removeEventListener("pointerleave", startAuto);
      window.removeEventListener("resize", onImagesReady);
      resizeObserver.disconnect();
      images.forEach((img) => img.removeEventListener("load", onImagesReady));
    };
  }, []);

  return { sectionRef, trackRef, prevRef, nextRef, curRef };
}
