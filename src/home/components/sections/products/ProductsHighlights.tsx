import type { CSSProperties } from "react";
import type { ProductId } from "@home/types/products";
import { PRODUCT_HIGHLIGHTS } from "@home/constants/productHighlights";
import { revealDelay } from "@home/utils/reveal";
import { HighlightCardShell, HighlightIconBadge } from "./HighlightCard";
import { ProductSectionSwap } from "./ProductSectionSwap";

type ProductsHighlightsProps = {
  productId: ProductId;
};

export function ProductsHighlights({ productId }: ProductsHighlightsProps) {
  const config = PRODUCT_HIGHLIGHTS[productId];

  const featuredIngredients = config.ingredientCards.slice(0, 3);
  const supportingIngredients = config.ingredientCards.slice(3);

  return (
    <section
      className="hl"
      data-theme="light"
      data-product={productId}
      id="highlights"
    >
      <div className="wrap">
        <ProductSectionSwap productId={productId}>
          <div className="hl-shell">
            <div className="hl-top">
              <div className="hl-copy">
                <div
                  className="hl-badges r-fade"
                  style={{ "--d": "0.05s" } as CSSProperties}
                >
                  <span className="hl-badge hl-badge--accent">
                    {config.badge}
                  </span>
                  <span className="hl-badge">{config.badgeSecondary}</span>
                </div>

                <p
                  className="hl-eyebrow r-fade"
                  style={{ "--d": "0.1s" } as CSSProperties}
                >
                  {config.eyebrow}
                </p>

                <h2
                  className="hl-heading display r-rise"
                  style={{ "--d": "0.16s" } as CSSProperties}
                >
                  {config.title}{" "}
                  <span className="grn">{config.titleAccent}</span>
                </h2>

                <p
                  className="hl-intro r-fade"
                  style={{ "--d": "0.22s" } as CSSProperties}
                >
                  {config.intro}
                </p>
              </div>

              <div
                className="hl-float r-scale"
                style={{ "--d": "0.14s" } as CSSProperties}
                aria-hidden="true"
              >
                <div className="hl-float-glow" />
                {config.floatImages.map((img) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    className={`hl-float-img hl-float-img--${img.position}`}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            <div className="hl-block">
              <div className="hl-block-head">
                <p className="hl-kicker">Core formula</p>
                <h3 className="hl-subtitle">Ingredients that do more</h3>
              </div>

              <div className="hl-feature-grid">
                {featuredIngredients.map((card, index) => (
                  <HighlightCardShell
                    key={card.number}
                    className="hl-card--featured r-scale"
                    style={revealDelay(index, 0.08, 0.07)}
                  >
                    <div className="hl-card-glow" aria-hidden="true" />

                    <div className="hl-card-top">
                      <span className="hl-card-no">{card.number}</span>
                      <img
                        src={card.image}
                        alt={card.imageAlt}
                        className="hl-card-img"
                        loading="lazy"
                      />
                    </div>

                    <h3 className="hl-card-title">{card.title}</h3>
                    <p className="hl-card-desc">{card.description}</p>
                  </HighlightCardShell>
                ))}
              </div>
            </div>

            {supportingIngredients.length > 0 && (
              <div className="hl-block hl-block--compact">
                <div className="hl-block-head">
                  <p className="hl-kicker">Supporting blend</p>
                  <h3 className="hl-subtitle">Complete ingredient lineup</h3>
                </div>

                <div className="hl-mini-grid">
                  {supportingIngredients.map((card, index) => (
                    <HighlightCardShell
                      key={card.number}
                      className="hl-card--mini r-scale"
                      style={revealDelay(index + 3, 0.055, 0.04)}
                    >
                      <div className="hl-mini-media">
                        <span className="hl-card-no">{card.number}</span>
                        <img
                          src={card.image}
                          alt={card.imageAlt}
                          className="hl-mini-img"
                          loading="lazy"
                        />
                      </div>

                      <div>
                        <h3 className="hl-mini-title">{card.title}</h3>
                        <p className="hl-mini-desc">{card.description}</p>
                      </div>
                    </HighlightCardShell>
                  ))}
                </div>
              </div>
            )}

            <div className="hl-block">
              <div className="hl-block-head">
                <p className="hl-kicker">Everyday benefits</p>
                <h3 className="hl-subtitle">Built for modern routines</h3>
              </div>

              <div className="hl-benefit-grid">
                {config.iconCards.map((card, index) => (
                  <HighlightCardShell
                    key={card.number}
                    className="hl-card--benefit r-scale"
                    style={revealDelay(
                      index + config.ingredientCards.length,
                      0.07,
                      0.05,
                    )}
                  >
                    <div className="hl-card-top">
                      <span className="hl-card-no">{card.number}</span>
                      <HighlightIconBadge iconId={card.icon} />
                    </div>

                    <h3 className="hl-card-title">{card.title}</h3>
                    <p className="hl-card-desc">{card.description}</p>
                  </HighlightCardShell>
                ))}
              </div>
            </div>

            <div
              className="hl-cta r-fade"
              style={{ "--d": "0.12s" } as CSSProperties}
            >
              <div>
                <p className="hl-cta-label">Next step</p>
                <p className="hl-cta-title">{config.ctaTitle}</p>
              </div>

              <div className="hl-cta-actions">
                <button type="button" className="hero-btn">
                  {config.ctaPrimary}
                </button>
                <button type="button" className="btn-ghost-d">
                  {config.ctaSecondary}
                </button>
              </div>
            </div>
          </div>
        </ProductSectionSwap>
      </div>
    </section>
  );
}
