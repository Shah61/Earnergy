import { useId, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { useAffiliateCode } from "@/hooks/useAffiliateCode";
import { resellerPath } from "@/lib/belibeli";
import { MenuPanel } from "@home/components/layout/NavMenu";
import {
  JOIN_US_CTA,
  NAV_ITEMS,
  isNavLink,
  type MenuPanelKind,
} from "@home/constants/navigation";

type MobileDrawerProps = {
  onClose: () => void;
};

export function MobileDrawer({ onClose }: MobileDrawerProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const uplineCode = useAffiliateCode();
  /* one panel open at a time, so the sheet stays short */
  const [openPanel, setOpenPanel] = useState<MenuPanelKind | null>(null);
  const panelIdPrefix = useId();

  const join = () => {
    onClose();
    navigate(resellerPath(JOIN_US_CTA.href, uplineCode));
  };

  return (
    <aside className="mobile-menu" id="drawer" aria-label="Mobile menu">
      <div className="mobile-menu-content">
        <p className="mobile-menu-eyebrow">Explore Earnergy</p>

        <nav className="mobile-menu-links" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item, index) => {
            const number = <span className="mobile-menu-index">0{index + 1}</span>;

            /* Shop and Reseller unfold in place: the products (each straight
               to BeliBeli), or the reseller links */
            if (!isNavLink(item)) {
              const { panel } = item;
              const isOpen = openPanel === panel;
              const panelId = `${panelIdPrefix}-${panel}`;

              return (
                <div
                  key={item.label}
                  className={`mobile-menu-drop${isOpen ? " is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="mobile-menu-link mobile-menu-drop-toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenPanel((open) => (open === panel ? null : panel))}
                  >
                    {number}
                    <span className="mobile-menu-label">{item.label}</span>
                    <ChevronDown aria-hidden="true" className="mobile-menu-arrow" />
                  </button>
                  <div className="mobile-menu-drop-panel" id={panelId}>
                    <div className="mobile-menu-drop-inner">
                      <MenuPanel panel={panel} uplineCode={uplineCode} onPick={onClose} />
                    </div>
                  </div>
                </div>
              );
            }

            const href = resellerPath(item.href, uplineCode);
            const isRoute = href.startsWith("/");
            const isActive = isRoute && (pathname === href || pathname === item.href);
            const content = (
              <>
                {number}
                <span className="mobile-menu-label">{item.label}</span>
                <ChevronRight aria-hidden="true" className="mobile-menu-arrow" />
              </>
            );

            return isRoute ? (
              <Link
                key={item.label}
                to={href}
                className={`mobile-menu-link${isActive ? " mobile-menu-link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={onClose}
              >
                {content}
              </Link>
            ) : (
              <a key={item.label} href={href} className="mobile-menu-link" onClick={onClose}>
                {content}
              </a>
            );
          })}
        </nav>

        <div className="mobile-menu-cta-wrap">
          <PulsatingButton
            type="button"
            className="join-cta"
            pulseColor="rgba(190, 241, 169, 0.72)"
            duration="1.8s"
            distance="10px"
            variant="pulse"
            onClick={join}
          >
            {JOIN_US_CTA.label}
          </PulsatingButton>
          <p className="mobile-menu-tagline">Smart products · Smarter business</p>
        </div>
      </div>
    </aside>
  );
}
