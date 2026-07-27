import { Link } from "react-router-dom";
import {
  AFFILIATE_NAV_ITEMS,
  JOIN_US_CTA,
  NAV_ITEMS,
} from "@home/constants/navigation";
import { useAffiliateCode } from "@/hooks/useAffiliateCode";

type MobileDrawerProps = {
  onClose: () => void;
};

export function MobileDrawer({ onClose }: MobileDrawerProps) {
  const affiliateCode = useAffiliateCode();
  const navItems = affiliateCode ? AFFILIATE_NAV_ITEMS : NAV_ITEMS;

  return (
    <>
      <div className="overlay" id="overlay" onClick={onClose} aria-hidden="true" />
      <aside className="mobile-menu" id="drawer" aria-label="Mobile menu">
        {navItems.map((item) =>
          item.href.startsWith("/") ? (
            <Link key={item.label} to={item.href} onClick={onClose}>
              {item.label}
            </Link>
          ) : (
            <a key={item.label} href={item.href} onClick={onClose}>
              {item.label}
            </a>
          ),
        )}
        <Link to={JOIN_US_CTA.href} className="pill" onClick={onClose}>
          {JOIN_US_CTA.label}
        </Link>
      </aside>
    </>
  );
}
