import type { CSSProperties } from "react";
import { Quote } from "lucide-react";
import type { ProductData, ProductId } from "@home/types/products";
import { revealDelay } from "@home/utils/reveal";
import { ProductSectionSwap } from "./ProductSectionSwap";

type ProductsReviewsProps = {
  product: ProductData;
  productId: ProductId;
};

export function ProductsReviews({ product, productId }: ProductsReviewsProps) {
  return (
    <section className="rev" data-theme="light" id="reviews">
      <div className="wrap">
        <ProductSectionSwap productId={productId}>
          <div className="r-scale" style={{ "--d": "0.05s" } as CSSProperties}>
            <div className="av-stack">
              <span className="a">★</span>
              <span className="a">☻</span>
              <span className="av-badge">4k</span>
            </div>
            <p className="rev-clabel">{product.revLabel} · around the world</p>
          </div>

          <p className="rev-quote r-rise" style={{ "--d": "0.12s" } as CSSProperties}>
            <span className="ink">{product.revLead}</span>{" "}
            <span className="dim">
              Don&apos;t just take our word for it — hear from the people who made
              it part of their everyday routine.
            </span>
          </p>

          <div className="rev-grid">
            {product.reviews.map((review, index) => (
              <div
                className={index % 2 === 0 ? "rcard r-slide-l" : "rcard r-slide-r"}
                key={review.n}
                style={revealDelay(index, 0.1, 0.09)}
              >
                <Quote className="qi" />
                <div className="rcard-head">
                  <span className="rcard-av">{review.i}</span>
                  <div>
                    <h4>{review.n}</h4>
                    <p>{review.r}</p>
                  </div>
                </div>
                <p className="quote">{review.q}</p>
              </div>
            ))}
          </div>
        </ProductSectionSwap>
      </div>
    </section>
  );
}
