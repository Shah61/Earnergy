import { useEffect, useState, type RefObject } from "react";

export type ProductsTheme = "dark" | "light";

export function useProductsScrollTheme(rootRef: RefObject<HTMLElement | null>) {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<ProductsTheme>("dark");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const headerY = 70;
      let nextTheme: ProductsTheme = "dark";

      root.querySelectorAll<HTMLElement>("[data-theme]").forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerY && rect.bottom > headerY) {
          nextTheme = section.dataset.theme === "light" ? "light" : "dark";
        }
      });

      setTheme(nextTheme);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [rootRef]);

  return { scrolled, theme };
}
