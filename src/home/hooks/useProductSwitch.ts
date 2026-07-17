import { useCallback, useState } from "react";
import type { ProductId } from "@home/types/products";

const SWITCH_OUT_MS = 340;

export function useProductSwitch(initial: ProductId = "box") {
  const [productId, setProductId] = useState<ProductId>(initial);
  const [isSwitching, setIsSwitching] = useState(false);

  const changeProduct = useCallback(
    (id: ProductId) => {
      if (id === productId || isSwitching) return;

      setIsSwitching(true);
      window.setTimeout(() => {
        setProductId(id);
        window.requestAnimationFrame(() => {
          setIsSwitching(false);
        });
      }, SWITCH_OUT_MS);
    },
    [productId, isSwitching],
  );

  return { productId, changeProduct, isSwitching };
}
