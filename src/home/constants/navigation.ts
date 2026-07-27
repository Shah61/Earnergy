import { ROUTES } from "./routes";

export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: ROUTES.home },
  { label: "Our Product", href: ROUTES.products },
  { label: "Contact Us", href: ROUTES.contact },
];

/** Once a visitor activates an upline code they stay inside the affiliate
 *  funnel: products and the Join page only. */
export const AFFILIATE_NAV_ITEMS: NavItem[] = [
  { label: "Our Product", href: ROUTES.products },
];

export const JOIN_US_CTA = {
  label: "Join Us",
  href: ROUTES.join,
} as const;

export const SITE_NAME = "Earnergy";
export const SITE_LOGO = "/photos/logo2.webp";
