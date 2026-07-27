import { useEffect } from "react";
import { MobileDrawer, SiteFooter, SiteHeader } from "@home/components/layout";
import { clearAffiliateCode } from "@/lib/belibeli";
import {
  AboutSection,
  DeliveryPartnerHero,
  GallerySection,
  HeroSection,
  ServicesSection,
} from "@home/components/sections/home";
import { BrandMarkSprite } from "@home/components/ui/icons";
import {
  useMobileMenu,
  useRevealOnLoad,
  useScrollHeader,
  useScrollReveal,
} from "@home/hooks";

export function HomePage() {
  const { isOpen, toggle, close } = useMobileMenu();

  /* coming back to the landing page leaves the affiliate funnel, so the
     cached upline code is dropped and /products is plain again */
  useEffect(() => {
    clearAffiliateCode();
  }, []);

  useRevealOnLoad();
  useScrollHeader();
  useScrollReveal();

  return (
    <>
      <BrandMarkSprite />
      <SiteHeader onMenuToggle={toggle} isMenuOpen={isOpen} />
      <MobileDrawer onClose={close} />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ServicesSection />
      <DeliveryPartnerHero />
      <SiteFooter />
    </>
  );
}
