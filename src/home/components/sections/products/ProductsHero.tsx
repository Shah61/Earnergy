import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { ProductData, ProductId } from "@home/types/products";
import { revealDelay } from "@home/utils/reveal";
import { ProductSectionSwap } from "./ProductSectionSwap";
import { ProductsMark } from "./ProductsMark";

type ProductsHeroProps = {
  product: ProductData;
  productId: ProductId;
  isSwitching: boolean;
  onProductChange: (id: ProductId) => void;
};

export function ProductsHero({
  product,
  productId,
  isSwitching,
  onProductChange,
}: ProductsHeroProps) {
  return (
    <section className="hero" data-theme="dark">
      <div className="wrap">
        <div
          className="tabs r-fade"
          style={{ "--d": "0.05s" } as CSSProperties}
          role="tablist"
          aria-label="Choose product"
        >
          <button
            type="button"
            role="tab"
            aria-selected={productId === "box"}
            className={productId === "box" ? "tab on" : "tab"}
            onClick={() => onProductChange("box")}
          >
            <span className="dot" /> Box Bites
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={productId === "kofe"}
            className={productId === "kofe" ? "tab on" : "tab"}
            onClick={() => onProductChange("kofe")}
          >
            <span className="dot" /> Kofé
          </button>
        </div>

        <ProductSectionSwap
          productId={productId}
          className={isSwitching ? "hero-swap is-exiting" : "hero-swap"}
        >
          <p
            className="eyebrow r-fade"
            style={
              {
                "--d": "0.08s",
                color: "var(--cream-dim)",
                marginTop: 24,
              } as CSSProperties
            }
          >
            <span className="sl">{product.category}</span>
            <span className="sl"></span>
          </p>

          <h1 className="h-hero display r-rise" style={{ "--d": "0.14s" } as CSSProperties}>
            {product.hero1}
            <br />
            {product.hero2} <span className="grn">{product.grn}</span>
          </h1>

          <p className="hero-para r-fade" style={{ "--d": "0.22s" } as CSSProperties}>
            {product.heroPara}
          </p>

          <div className="hero-actions r-slide-l" style={{ "--d": "0.3s" } as CSSProperties}>
            <button type="button" className="hero-btn">
              {product.buy} <ArrowRight />
            </button>
            <button type="button" className="btn-ghost-d">
              View Ingredients
            </button>
          </div>
        </ProductSectionSwap>
      </div>

      <div className="wrap hero-bottom">
        <ProductSectionSwap
          productId={productId}
          className={
            isSwitching ? "hero-bottom-swap is-exiting" : "hero-bottom-swap"
          }
        >
          <div className="hero-exp r-slide-r" style={{ "--d": "0.1s" } as CSSProperties}>
            <h4>{product.tagline}</h4>
            <p>
              {product.category} by Earnergy — purposeful ingredients, made for
              smarter everyday living.
            </p>
            <div className="scrollcue">
              <span className="bar" /> Scroll
            </div>
          </div>

          <div className="hero-strip">
            {product.heroImages.map((src, index) => (
              <div
                className="hstile r-curtain"
                key={src}
                style={revealDelay(index, 0.12, 0.1)}
              >
                <img src={src} alt="" />
                <ProductsMark className="pmk" />
              </div>
            ))}
          </div>
        </ProductSectionSwap>
      </div>
    </section>
  );
}
