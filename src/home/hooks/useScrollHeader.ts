import { useEffect } from "react";

export function useScrollHeader(headerId = "header") {
  useEffect(() => {
    const header = document.getElementById(headerId);
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerId]);
}
