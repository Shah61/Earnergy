import { Link, useLocation } from "react-router-dom";
import { JOIN_US_CTA, NAV_ITEMS, SITE_LOGO, SITE_NAME } from "@home/constants/navigation";

type SiteHeaderProps = {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
};

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/")) return pathname === href;
  return false;
}

export function SiteHeader({ onMenuToggle, isMenuOpen }: SiteHeaderProps) {
  const { pathname } = useLocation();

  return (
    <header className="site-header" id="header">
      <div className="wrap nav">
        <Link className="brand" to="/" aria-label={`${SITE_NAME} home`}>
          <img
            src={SITE_LOGO}
            alt={SITE_NAME}
            className="brand-logo"
            width={2482}
            height={788}
            decoding="async"
          />
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const className = isNavActive(pathname, item.href) ? "active" : undefined;
            const isRoute = item.href.startsWith("/");

            return isRoute ? (
              <Link key={item.label} to={item.href} className={className}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className={className}>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="nav-right">
          <Link to={JOIN_US_CTA.href} className="pill nav-cta">
            {JOIN_US_CTA.label}
          </Link>
          <button
            type="button"
            className="burger"
            onClick={onMenuToggle}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="drawer"
          >
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
