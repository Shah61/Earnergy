import { ArrowRight, ArrowUpRight, KeyRound, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { RESELLER_MENU } from "@home/constants/navigation";
import { resellerPath } from "@/lib/belibeli";

const LINK_ICONS = {
  key: KeyRound,
  network: Network,
} as const;

type ResellerLinkListProps = {
  /** the reseller code in play; the on-site link keeps it */
  uplineCode: string | null;
  onPick?: () => void;
};

/* the links behind "Reseller": the paste-code card on Home, and BeliBeli's
   dashboard where the commission and network live */
export function ResellerLinkList({ uplineCode, onPick }: ResellerLinkListProps) {
  return (
    <ul className="reseller-links">
      {RESELLER_MENU.map((link) => {
        const Icon = LINK_ICONS[link.icon];
        const isRoute = link.href.startsWith("/");
        const Arrow = isRoute ? ArrowRight : ArrowUpRight;
        const content = (
          <>
            <span className="reseller-link-icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="reseller-link-text">
              <span className="reseller-link-name">{link.label}</span>
              <span className="reseller-link-sub">
                <span>{link.subDim}</span>{" "}
                <span className="reseller-link-sub-ink">{link.subInk}</span>
              </span>
            </span>
            <Arrow aria-hidden="true" className="reseller-link-arrow" />
          </>
        );

        return (
          <li key={link.label}>
            {isRoute ? (
              <Link
                className="reseller-link"
                to={resellerPath(link.href, uplineCode)}
                onClick={onPick}
              >
                {content}
              </Link>
            ) : (
              <a
                className="reseller-link"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={onPick}
              >
                {content}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
