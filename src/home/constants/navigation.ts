import { ROUTES } from "./routes";

export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: ROUTES.home },
  { label: "Our Products", href: ROUTES.products },
  { label: "Contact Us", href: ROUTES.contact },
];

export const JOIN_US_CTA = {
  label: "JOIN US",
  href: ROUTES.join,
} as const;

/* copy for the mobile bottom rail — the sub line carries the promise the
   header pill has no room for */
export const STICKY_JOIN_CTA = {
  label: "JOIN US",
  sub: "Build Your Business. Grow Your Income.",
  href: ROUTES.join,
} as const;

export const SITE_NAME = "Earnergy";
export const SITE_LOGO = "/photos/logo2.webp";
