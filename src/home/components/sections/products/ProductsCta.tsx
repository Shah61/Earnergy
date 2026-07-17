import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ProductData, ProductId } from "@home/types/products";
import { ProductSectionSwap } from "./ProductSectionSwap";
import { ProductsMark } from "./ProductsMark";

type ProductsCtaProps = {
  product: ProductData;
  productId: ProductId;
};

export function ProductsCta({ product, productId }: ProductsCtaProps) {
  return (
    <section className="ctaband" data-theme="dark">
      <ProductsMark className="mk-bg" />
      <ProductSectionSwap productId={productId}>
        <h2 className="display r-rise" style={{ "--d": "0.05s" } as CSSProperties}>
          {product.ctaTitle}
          <br />
          <span className="grn">{product.ctaGrn}</span>
        </h2>
        <p className="r-fade" style={{ "--d": "0.16s" } as CSSProperties}>
          {product.ctaPara}
        </p>
        <div className="cta-actions r-scale" style={{ "--d": "0.24s" } as CSSProperties}>
          <button type="button" className="hero-btn">
            {product.buyNow} <ArrowRight />
          </button>
          <button type="button" className="btn-ghost-d">
            View Ingredients <ArrowUpRight />
          </button>
        </div>
      </ProductSectionSwap>
    </section>
  );
}
