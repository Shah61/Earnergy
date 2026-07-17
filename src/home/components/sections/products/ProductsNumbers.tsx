import type { CSSProperties } from "react";
import type { ProductData, ProductId } from "@home/types/products";
import { revealDelay } from "@home/utils/reveal";
import { NumStat } from "./NumStat";
import { ProductSectionSwap } from "./ProductSectionSwap";

type ProductsNumbersProps = {
  product: ProductData;
  productId: ProductId;
};

export function ProductsNumbers({ product, productId }: ProductsNumbersProps) {
  return (
    <section className="nums" data-theme="dark">
      <div className="wrap">
        <ProductSectionSwap productId={productId}>
          <div className="nums-top">
            <h2 className="nums-h display r-rise" style={{ "--d": "0.05s" } as CSSProperties}>
              By The Numbers
            </h2>
            <p className="nums-intro r-fade" style={{ "--d": "0.14s" } as CSSProperties}>
              {product.numsIntro}
            </p>
          </div>

          <div className="nums-grid">
            {product.stats.map((stat, index) => (
              <NumStat
                key={`${product.wordmark}-${stat.l}`}
                value={stat.v}
                suffix={stat.s}
                label={stat.l}
                style={revealDelay(index, 0.1, 0.08)}
              />
            ))}
          </div>
        </ProductSectionSwap>
      </div>
    </section>
  );
}
