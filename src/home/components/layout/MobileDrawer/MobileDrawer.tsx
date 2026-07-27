import { Link } from "react-router-dom";
import { JOIN_US_CTA, NAV_ITEMS } from "@home/constants/navigation";

type MobileDrawerProps = {
  onClose: () => void;
};

export function MobileDrawer({ onClose }: MobileDrawerProps) {
  return (
    <>
      <div className="overlay" id="overlay" onClick={onClose} aria-hidden="true" />
      <aside className="mobile-menu" id="drawer" aria-label="Mobile menu">
        {NAV_ITEMS.map((item) =>
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
