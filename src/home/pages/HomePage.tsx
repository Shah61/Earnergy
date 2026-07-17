import { MobileDrawer, SiteFooter, SiteHeader } from "@home/components/layout";
import {
  AboutSection,
  DeliveryPartnerHero,
  GallerySection,
  HeroSection,
  ServicesSection,
  TeamSection,
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
      <TeamSection />
      <DeliveryPartnerHero />
      <SiteFooter />
    </>
  );
}
