import { lazy, useState, type ReactNode } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { getStoredAffiliateCode, resellerPath } from "@/lib/belibeli";
import { useUplineCodeCheck } from "@/hooks/useUplineCodeCheck";

/* only a bad share link needs it, so it stays out of the page bundles */
const InvalidCodeScreen = lazy(() => import("@/components/layout/InvalidCodeScreen"));

type ResellerGateProps = {
  /** the page's plain path, e.g. "/join" — "/join/<code>" is its reseller link */
  path: string;
  children: ReactNode;
};

/**
 * Any page of the site can carry a reseller's code in its URL ("/5141",
 * "/join/5141", "/contact/5141"). The code is checked before the page
 * shows, then rides along to every page and buy button.
 */
export function ResellerGate({ path, children }: ResellerGateProps) {
  const { uplinecode } = useParams<{ uplinecode: string }>();
  const { hash } = useLocation();
  const codeCheck = useUplineCodeCheck(uplinecode);
  /* read once: activating a code on this page must not bounce the visitor
     to a new URL halfway through the form */
  const [codeAtLoad] = useState(getStoredAffiliateCode);

  /* a code is already in play this session: the plain URL gains it, so the
     address bar is the reseller's page too */
  if (!uplinecode && codeAtLoad) {
    return (
      <Navigate to={{ pathname: resellerPath(path, codeAtLoad), hash }} replace />
    );
  }

  /* a code nobody activated: say so plainly instead of quietly redirecting */
  if (codeCheck === "rejected" && uplinecode) {
    return <InvalidCodeScreen code={uplinecode} />;
  }

  /* hold the page back until the code clears, so a bad link never flashes
     the page first */
  if (codeCheck === "checking") return null;

  return children;
}
