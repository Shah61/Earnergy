import { ArrowUpRight } from "lucide-react";
import { JOIN_PRODUCTS } from "@home/constants/join";
import { SHOP_MENU } from "@home/constants/navigation";
import { belibeliProductUrl } from "@/lib/belibeli";

type ShopProductListProps = {
  /** the reseller code in play; every link carries it (house code otherwise) */
  uplineCode: string | null;
  onPick?: () => void;
};

/* the products behind "Shop", each going straight to BeliBeli — shared by
   the desktop dropdown and the mobile drawer */
export function ShopProductList({ uplineCode, onPick }: ShopProductListProps) {
  return (
    <div className="shop-body">
      <p className="shop-eyebrow">{SHOP_MENU.eyebrow}</p>
      <ul className="shop-list">
        {JOIN_PRODUCTS.map((product) => (
          <li key={product.productId}>
            <a
              className="shop-item"
              href={belibeliProductUrl(product.productId, uplineCode)}
              target="_blank"
              rel="noreferrer"
              onClick={onPick}
            >
              <img
                className="shop-thumb"
                src={product.thumb}
                alt=""
                width={160}
                height={200}
                loading="lazy"
                decoding="async"
              />
              <span className="shop-text">
                <span className="shop-name">{product.shortName ?? product.name}</span>
                <span className="shop-price">{product.price}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="shop-arrow" />
            </a>
          </li>
        ))}
      </ul>
      {uplineCode ? (
        <p className="shop-code">
          {SHOP_MENU.codeNote} <b>{uplineCode}</b>
        </p>
      ) : null}
    </div>
  );
}
