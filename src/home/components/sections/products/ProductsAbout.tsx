import type { CSSProperties } from "react";
import type { ProductData, ProductId } from "@home/types/products";
import { ProductSectionSwap } from "./ProductSectionSwap";
import { ProductsMark } from "./ProductsMark";

type ProductsAboutProps = {
  product: ProductData;
  productId: ProductId;
};

export function ProductsAbout({ product, productId }: ProductsAboutProps) {
  return (
    <section className="about" data-theme="light" id="about">
      <svg className="mk-out" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 50 L74 24 L84 34 L58 60 Z" />
        <path d="M50 50 L80 44 L84 58 L50 64 Z" />
        <path d="M50 50 L62 80 L48 84 L42 50 Z" />
        <path d="M50 50 L24 70 L16 58 L44 40 Z" />
        <path d="M50 50 L26 30 L36 18 L56 44 Z" />
      </svg>

      <div className="wrap">
        <ProductSectionSwap productId={productId}>
          <h2 className="giant r-rise" style={{ "--d": "0.05s" } as CSSProperties}>
            {product.wordmark}
          </h2>

          <div className="about-body">
            <div className="about-col">
              <p className="num r-fade" style={{ "--d": "0.1s" } as CSSProperties}>
                <span className="n">0.1</span>&nbsp;/&nbsp;About
              </p>
              <h3 className="r-slide-l" style={{ "--d": "0.16s" } as CSSProperties}>
                {product.aboutTitle}
              </h3>
              <p className="body r-fade" style={{ "--d": "0.22s" } as CSSProperties}>
                {product.aboutPara}
              </p>
            </div>

            <div className="about-imgs">
              <div className="afloat big r-curtain" style={{ "--d": "0.12s" } as CSSProperties}>
                <img src={product.aboutImages.big} alt={product.wordmark} />
                <ProductsMark className="pmk" />
              </div>
              <div className="afloat small r-curtain-r" style={{ "--d": "0.24s" } as CSSProperties}>
                <img src={product.aboutImages.small} alt="" />
                <ProductsMark className="pmk" />
              </div>
            </div>
          </div>
        </ProductSectionSwap>
      </div>
    </section>
  );
}
