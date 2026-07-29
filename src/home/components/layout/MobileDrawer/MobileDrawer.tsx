import { ChevronRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { JOIN_US_CTA, NAV_ITEMS } from "@home/constants/navigation";

type MobileDrawerProps = {
  onClose: () => void;
};

export function MobileDrawer({ onClose }: MobileDrawerProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const join = () => {
    onClose();
    navigate(JOIN_US_CTA.href);
  };

  return (
    <aside className="mobile-menu" id="drawer" aria-label="Mobile menu">
      <div className="mobile-menu-content">
        <p className="mobile-menu-eyebrow">Explore Earnergy</p>

        <nav className="mobile-menu-links" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item, index) => {
            const isRoute = item.href.startsWith("/");
            const isActive = isRoute && pathname === item.href;
            const content = (
              <>
                <span className="mobile-menu-index">0{index + 1}</span>
                <span className="mobile-menu-label">{item.label}</span>
                <ChevronRight aria-hidden="true" className="mobile-menu-arrow" />
              </>
            );

            return isRoute ? (
              <Link
                key={item.label}
                to={item.href}
                className={`mobile-menu-link${isActive ? " mobile-menu-link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={onClose}
              >
                {content}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className="mobile-menu-link" onClick={onClose}>
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
