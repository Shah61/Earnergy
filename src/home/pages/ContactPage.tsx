import { useRef } from "react";
import { MobileDrawer, SiteFooter, SiteHeader } from "@home/components/layout";
import {
  ContactCtaSection,
  ContactFormSection,
  ContactHero,
  ContactInfoCards,
  ContactSupportCards,
} from "@home/components/sections/contact";
import { useContactReveal, useMobileMenu, useScrollHeader } from "@home/hooks";
import "@home/styles/contact.css";

export function ContactPage() {
  const { isOpen, toggle, close } = useMobileMenu();
  const rootRef = useRef<HTMLElement>(null);

  useScrollHeader();
  useContactReveal(rootRef);

  return (
    <>
      <SiteHeader onMenuToggle={toggle} isMenuOpen={isOpen} />
      <MobileDrawer onClose={close} />

      <section ref={rootRef} className="contact bg-white">
        <main className="mx-auto flex w-[90%] max-w-none flex-col gap-5 pb-8 pt-4">
          <ContactHero />
          <ContactInfoCards />
          <ContactFormSection />
          <ContactSupportCards />
          <ContactCtaSection />
        </main>
      </section>

      <SiteFooter />
    </>
  );
}
