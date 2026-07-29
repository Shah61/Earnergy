import { Link, useLocation, useNavigate } from "react-router-dom";
import { PulsatingButton } from "@/components/ui/pulsating-button";
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
  const navigate = useNavigate();

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
          <PulsatingButton
            type="button"
            className="nav-cta join-cta"
            pulseColor="rgba(190, 241, 169, 0.68)"
            duration="1.8s"
            distance="9px"
            variant="pulse"
            onClick={() => navigate(JOIN_US_CTA.href)}
          >
            {JOIN_US_CTA.label}
          </PulsatingButton>
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
