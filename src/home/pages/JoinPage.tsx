import { useRef } from "react";
import { MobileDrawer, SiteFooter, SiteHeader } from "@home/components/layout";
import {
  JoinCircleSystem,
  JoinCta,
  JoinHero,
  JoinSteps,
} from "@home/components/sections/join";
import { useContactReveal, useMobileMenu, useScrollHeader } from "@home/hooks";
import "@home/styles/join.css";

export function JoinPage() {
  const { isOpen, toggle, close } = useMobileMenu();
  const rootRef = useRef<HTMLElement>(null);

  useScrollHeader();
  useContactReveal(rootRef);

  return (
    <>
      <SiteHeader onMenuToggle={toggle} isMenuOpen={isOpen} />
      <MobileDrawer onClose={close} />

      <section ref={rootRef} className="join bg-white">
        <main className="mx-auto flex w-[90%] max-w-none flex-col gap-5 pb-10 pt-4">
          <JoinHero />
          <JoinSteps />
          <JoinCircleSystem />
          <JoinCta />
        </main>
      </section>

      <SiteFooter />
    </>
  );
}
