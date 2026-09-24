import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAffiliateCode } from "@/hooks/useAffiliateCode";
import { resellerPath } from "@/lib/belibeli";
import { STICKY_JOIN_CTA } from "@home/constants/navigation";

/* mobile-only bottom rail: the join offer stays one thumb-tap away no
   matter how far down the page someone has scrolled */
export function StickyJoinBar() {
  const uplineCode = useAffiliateCode();

  return (
    <div className="sticky-join">
      <Link
        className="sticky-join-btn"
        to={resellerPath(STICKY_JOIN_CTA.href, uplineCode)}
      >
        <span className="sticky-join-label">
          {STICKY_JOIN_CTA.label}
          <ArrowRight aria-hidden="true" className="sticky-join-arrow" />
        </span>
        <span className="sticky-join-sub">{STICKY_JOIN_CTA.sub}</span>
      </Link>
    </div>
  );
}
