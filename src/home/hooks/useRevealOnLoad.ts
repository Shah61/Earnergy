import { useEffect } from "react";

export function useRevealOnLoad() {
  useEffect(() => {
    const onLoad = () => {
      requestAnimationFrame(() => {
        document.body.classList.add("is-loaded");
      });
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);
}
