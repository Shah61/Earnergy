import type { ReactNode } from "react";
import type { ProductId } from "@home/types/products";

type ProductSectionSwapProps = {
  productId: ProductId;
  className?: string;
  children: ReactNode;
};

export function ProductSectionSwap({
  productId,
  className = "",
  children,
}: ProductSectionSwapProps) {
  return (
    <div
      key={productId}
      className={`section-swap ${className}`.trim()}
      data-product={productId}
    >
      {children}
    </div>
  );
}
