import type { CSSProperties } from "react";
import { CONTACT_HERO, CONTACT_SOCIAL } from "@home/constants/contact";
import { revealDelay } from "@home/utils/reveal";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "./ContactSocialIcons";

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
} as const;

function ContactSocialButtons() {
  return (
    <div className="flex items-center gap-3">
      {CONTACT_SOCIAL.map(({ label, icon, href }, index) => {
        const Icon = SOCIAL_ICONS[icon];
        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="c-social-pop flex size-11 items-center justify-center rounded-full bg-[#74c157] text-black transition duration-300 hover:-translate-y-1 hover:bg-black hover:text-white"
            style={revealDelay(index, 0.28, 0.08)}
          >
            <Icon className="size-5" />
          </a>
        );
      })}
    </div>
  );
}

export function ContactHero() {
  return (
    <section className="c-r-scale relative overflow-hidden rounded-[32px] border border-neutral-200 bg-white p-8 shadow-[0_6px_22px_rgba(0,0,0,0.04)] md:p-12">
      <div
        aria-hidden="true"
        className="c-hero-deco pointer-events-none absolute -left-10 -top-10 size-40 rounded-full bg-[#74c157]/12"
        style={
          {
            "--d": "0.1s",
            "--float-dur": "8s",
            "--float-delay": "0.2s",
          } as CSSProperties
        }
      />
      <div
        aria-hidden="true"
        className="c-hero-deco pointer-events-none absolute left-16 -top-6 size-16 rounded-2xl bg-[#74c157]/20"
        style={
          {
            "--d": "0.18s",
            "--float-dur": "6.5s",
            "--float-delay": "0.5s",
          } as CSSProperties
        }
      />
      <div
        aria-hidden="true"
        className="c-hero-deco pointer-events-none absolute -left-2 top-24 size-8 rounded-full bg-[#74c157]/35"
        style={
          {
            "--d": "0.26s",
            "--float-dur": "5.5s",
            "--float-delay": "0.8s",
          } as CSSProperties
        }
      />

      <div className="relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span
            className="c-r-fade mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600"
            style={{ "--d": "0.06s" } as CSSProperties}
          >
            <span className="size-2 rounded-full bg-[#74c157]" />
            {CONTACT_HERO.badge}
          </span>

          <h1
            className="c-r-rise text-4xl font-semibold leading-tight tracking-[-0.04em] text-black md:text-5xl"
            style={{ "--d": "0.12s" } as CSSProperties}
          >
            {CONTACT_HERO.title} <br />
            to{" "}
            <span className="rounded-lg bg-[#74c157] px-2 text-black">
              {CONTACT_HERO.titleHighlight}
            </span>{" "}
            {CONTACT_HERO.titleSuffix}
          </h1>
        </div>

        <div className="flex flex-col gap-7">
          <p
            className="c-r-slide-r text-base leading-7 text-neutral-600"
            style={{ "--d": "0.2s" } as CSSProperties}
          >
            {CONTACT_HERO.description}
          </p>
          <ContactSocialButtons />
        </div>
      </div>
    </section>
  );
}
