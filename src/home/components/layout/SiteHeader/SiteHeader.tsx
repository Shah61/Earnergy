import { Link, useLocation, useNavigate } from "react-router-dom";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { useAffiliateCode } from "@/hooks/useAffiliateCode";
import { resellerPath } from "@/lib/belibeli";
import { ResellerCodeBadge } from "@home/components/layout/ResellerCodeBadge";
import { NavDropdown } from "@home/components/layout/NavMenu";
import {
  JOIN_US_CTA,
  NAV_ITEMS,
  SITE_LOGO,
  SITE_NAME,
  isNavLink,
} from "@home/constants/navigation";
import { ROUTES } from "@home/constants/routes";

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
  /* the reseller code in play: shown by the logo, carried by every link */
  const uplineCode = useAffiliateCode();

  return (
    <header className="site-header" id="header">
      <div className="wrap nav">
        <div className={`brand-block${uplineCode ? " brand-block--code" : ""}`}>
          <Link
            className="brand"
            to={resellerPath(ROUTES.home, uplineCode)}
            aria-label={`${SITE_NAME} home`}
          >
            <img
              src={SITE_LOGO}
              alt={SITE_NAME}
              className="brand-logo"
              width={2482}
              height={788}
              decoding="async"
            />
          </Link>
          {uplineCode ? <ResellerCodeBadge code={uplineCode} /> : null}
        </div>

        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            if (!isNavLink(item)) {
              return (
                <NavDropdown
                  key={item.label}
                  label={item.label}
                  panel={item.panel}
                  uplineCode={uplineCode}
                />
              );
            }

            const href = resellerPath(item.href, uplineCode);
            /* "/" still counts as Home after a code is activated on it */
            const isActive = isNavActive(pathname, href) || isNavActive(pathname, item.href);
            const className = isActive ? "active" : undefined;
            const isRoute = href.startsWith("/");

            return isRoute ? (
              <Link key={item.label} to={href} className={className}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={href} className={className}>
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
            onClick={() => navigate(resellerPath(JOIN_US_CTA.href, uplineCode))}
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
