import { Link } from "react-router-dom";
import { NAV_ITEMS } from "@home/constants/navigation";
import { ROUTES } from "@home/constants/routes";

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
        <Link to={ROUTES.contact} className="pill" onClick={onClose}>
          Contact Us
        </Link>
      </aside>
    </>
  );
}
