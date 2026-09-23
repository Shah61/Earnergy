import { useEffect, useRef } from "react";

/** a card counts as on screen once most of it is inside the viewport */
const VISIBLE_RATIO = 0.85;

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

    const maxScrollLeft = () =>
      Math.max(0, track.scrollWidth - track.clientWidth);

    /* The track shows several cards at once, so it runs out of scroll before
       the last few cards can reach the left edge — their start offsets sit
       past the end of the range. Navigating by card index therefore aimed at
       positions that do not exist, which scrolled nowhere while the readout
       carried on counting. Positions are derived from what the track can
       actually rest at instead: every card start inside the range, plus a
       final flush stop when the remaining travel is worth its own step
       (it is on narrow screens, where the last card would otherwise never
       come into view). */
    const positions = () => {
      const cards = getCards();
      if (!cards.length) return [0];

      const max = maxScrollLeft();
      const list = cards
        .map((card) => card.offsetLeft)
        .filter((offset) => offset <= max);

      if (!list.length) list.push(0);

      const tail = list[list.length - 1];
      if (max - tail > cards[0].offsetWidth * 0.25) list.push(max);

      return list;
    };

    /** first and last card meaningfully visible at a given scroll offset */
    const rangeAt = (scroll: number) => {
      const cards = getCards();
      const right = scroll + track.clientWidth;
      let first = -1;
      let last = 0;

      cards.forEach((card, i) => {
        const shown =
          Math.min(card.offsetLeft + card.offsetWidth, right) -
          Math.max(card.offsetLeft, scroll);
        if (shown >= card.offsetWidth * VISIBLE_RATIO) {
          if (first < 0) first = i;
          last = i;
        }
      });

      if (first < 0) return [0, 0] as const;
      return [first, last] as const;
    };

    const activePosition = () => {
      const list = positions();
      const scroll = track.scrollLeft;
      let closest = 0;
      let minDist = Infinity;

      list.forEach((offset, i) => {
        const dist = Math.abs(offset - scroll);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      return closest;
    };

    /* Reporting only the leading card made the readout stop at "06 / 08" and
       look like two images were missing, when cards 7 and 8 were already on
       screen beside it. The span of visible cards is reported instead. */
    const render = (posIndex: number) => {
      const list = positions();
      const scroll = list[posIndex] ?? 0;
      const [first, last] = rangeAt(scroll);

      if (curEl) {
        curEl.textContent =
          last > first ? `${pad(first + 1)}–${pad(last + 1)}` : pad(first + 1);
      }
      if (prev) prev.disabled = posIndex <= 0;
      if (next) next.disabled = posIndex >= list.length - 1;
    };

    const update = () => {
      const i = activePosition();
      indexRef.current = i;
      render(i);
    };

    /* A programmatic scroll fires scroll events the whole way. Letting those
       recompute the position mid-flight meant the click's target was
       overwritten, so the readout flickered through in-between values and the
       buttons flipped disabled state during the animation. */
    let animating = false;
    let animateTimer: ReturnType<typeof setTimeout> | null = null;

    const goTo = (index: number) => {
      const list = positions();
      const target = Math.min(Math.max(index, 0), list.length - 1);

      indexRef.current = target;
      render(target);

      animating = true;
      if (animateTimer) clearTimeout(animateTimer);

      track.scrollTo({
        left: list[target],
        behavior: reduceMotion ? "instant" : "smooth",
      });

      animateTimer = setTimeout(() => {
        animating = false;
        update();
      }, 700);
    };

    let ticking = false;
    const onScroll = () => {
      if (animating) return;
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    let auto: ReturnType<typeof setInterval> | null = null;
    /* Once someone drives the carousel themselves the timer stays off. It
       used to restart on pointerleave, so it would yank the track away
       moments after a deliberate click. */
    let userEngaged = false;

    const stopAuto = () => {
      if (auto) {
        clearInterval(auto);
        auto = null;
      }
    };

    const tickAuto = () => {
      const list = positions();
      if (list.length <= 1) return;
      goTo(indexRef.current >= list.length - 1 ? 0 : indexRef.current + 1);
    };

    const startAuto = () => {
      if (reduceMotion || userEngaged) return;
      stopAuto();
      auto = setInterval(tickAuto, 3800);
    };

    const engage = () => {
      userEngaged = true;
      stopAuto();
    };

    const onPrevClick = () => {
      engage();
      goTo(indexRef.current - 1);
    };

    const onNextClick = () => {
      engage();
      goTo(indexRef.current + 1);
    };

    const onLayoutChange = () => {
      /* a resize can drop the number of positions below the current one */
      const list = positions();
      const clamped = Math.min(indexRef.current, list.length - 1);
      if (clamped !== indexRef.current) {
        goTo(clamped);
        return;
      }
      update();
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    prev?.addEventListener("click", onPrevClick);
    next?.addEventListener("click", onNextClick);
    track.addEventListener("pointerdown", engage);
    section.addEventListener("pointerenter", stopAuto);
    section.addEventListener("focusin", engage);
    section.addEventListener("pointerleave", startAuto);
    window.addEventListener("resize", onLayoutChange);

    const images = track.querySelectorAll("img");
    images.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", onLayoutChange);
    });

    const resizeObserver = new ResizeObserver(onLayoutChange);
    resizeObserver.observe(track);

    /* run once straight away: a page opened in a background tab never gets a
       frame, and the readout would sit on its markup default until touched */
    update();
    requestAnimationFrame(() => {
      update();
      startAuto();
    });

    return () => {
      track.removeEventListener("scroll", onScroll);
      stopAuto();
      if (animateTimer) clearTimeout(animateTimer);
      prev?.removeEventListener("click", onPrevClick);
      next?.removeEventListener("click", onNextClick);
      track.removeEventListener("pointerdown", engage);
      section.removeEventListener("pointerenter", stopAuto);
      section.removeEventListener("focusin", engage);
      section.removeEventListener("pointerleave", startAuto);
      window.removeEventListener("resize", onLayoutChange);
      resizeObserver.disconnect();
      images.forEach((img) => img.removeEventListener("load", onLayoutChange));
    };
  }, []);

  return { sectionRef, trackRef, prevRef, nextRef, curRef };
}
