import { useEffect, useRef, useState } from "react";
import { MobileDrawer, SiteFooter } from "@home/components/layout";
import {
  ProductsAbout,
  ProductsCta,
  ProductsHeader,
  ProductsHero,
  ProductsHighlights,
  ProductsNumbers,
  ProductsReviews,
} from "@home/components/sections/products";
import { PRODUCTS } from "@home/constants/products";
import {
  useMobileMenu,
  useProductSwitch,
  useProductsReveal,
  useProductsScrollTheme,
} from "@home/hooks";
import "@home/styles/products.css";

export function ProductsPage() {
  const { isOpen, toggle, close } = useMobileMenu();
  const { productId, changeProduct, isSwitching } = useProductSwitch("box");
  const rootRef = useRef<HTMLDivElement>(null);
  const [isInitial, setIsInitial] = useState(true);

  const product = PRODUCTS[productId];
  const { theme, scrolled } = useProductsScrollTheme(rootRef);

  useProductsReveal(rootRef, productId);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsInitial(false));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <div
        ref={rootRef}
        className={`syn${productId === "kofe" ? " kofe" : ""}${isSwitching ? " is-switching" : ""}${isInitial ? " is-initial" : ""}`}
      >
        <ProductsHeader
          theme={theme}
          scrolled={scrolled}
          onMenuToggle={toggle}
          isMenuOpen={isOpen}
          ctaLabel={product.buy}
        />
        <MobileDrawer onClose={close} />
        <ProductsHero
          product={product}
          productId={productId}
          isSwitching={isSwitching}
          onProductChange={changeProduct}
        />
        <ProductsAbout product={product} productId={productId} />
        <ProductsHighlights productId={productId} />
        <ProductsNumbers product={product} productId={productId} />
        <ProductsReviews product={product} productId={productId} />
        <ProductsCta product={product} productId={productId} />
      </div>
      <SiteFooter />
    </>
  );
}
