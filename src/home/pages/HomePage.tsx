import { lazy, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import {
  MobileDrawer,
  SiteFooter,
  SiteHeader,
  StickyJoinBar,
} from "@home/components/layout";
import { getStoredAffiliateCode } from "@/lib/belibeli";
import { useUplineCodeCheck } from "@/hooks/useUplineCodeCheck";
import {
  AboutSection,
  DeliveryPartnerHero,
  GallerySection,
  HeroSection,
  ResellerCodeSection,
  ServicesSection,
} from "@home/components/sections/home";
import { BrandMarkSprite } from "@home/components/ui/icons";
import {
  useMobileMenu,
  useRevealOnLoad,
  useScrollHeader,
  useScrollReveal,
} from "@home/hooks";

/* only a bad share link needs it, so it stays out of the landing bundle */
const InvalidCodeScreen = lazy(() => import("@/components/layout/InvalidCodeScreen"));

/**
 * "/" and "/<code>": a reseller's share link opens the landing page with
 * their code, which then rides along to every page and buy button.
 */
export function HomePage() {
  const { uplinecode } = useParams<{ uplinecode: string }>();
  const { hash } = useLocation();
  const codeCheck = useUplineCodeCheck(uplinecode);
  /* read once: activating a code on this page must not bounce the visitor
     to a new URL halfway through the form */
  const [codeAtLoad] = useState(getStoredAffiliateCode);

  /* a code is already in play this session: "/" becomes "/<code>" so the
     address bar is the reseller's page too */
  if (!uplinecode && codeAtLoad) {
    return (
      <Navigate
        to={{ pathname: `/${encodeURIComponent(codeAtLoad)}`, hash }}
        replace
      />
    );
  }

  /* a code nobody activated: say so plainly instead of quietly redirecting */
  if (codeCheck === "rejected" && uplinecode) {
    return <InvalidCodeScreen code={uplinecode} />;
  }

  /* hold the page back until the code clears, so a bad link never flashes
     the landing page first */
  if (codeCheck === "checking") return null;

  return <HomeContent />;
}

function HomeContent() {
  const { isOpen, toggle, close } = useMobileMenu();

  useRevealOnLoad();
  useScrollHeader();
  useScrollReveal();

  return (
    <>
      <BrandMarkSprite />
      <SiteHeader onMenuToggle={toggle} isMenuOpen={isOpen} />
      <MobileDrawer onClose={close} />
      <HeroSection />
      <ResellerCodeSection />
      <AboutSection />
      <GallerySection />
      <ServicesSection />
      <DeliveryPartnerHero />
      <SiteFooter />
      <StickyJoinBar />
    </>
  );
}
