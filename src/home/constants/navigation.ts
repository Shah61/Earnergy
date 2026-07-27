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

export const JOIN_US_CTA = {
  label: "Join Us",
  href: ROUTES.join,
} as const;

export const SITE_NAME = "Earnergy";
export const SITE_LOGO = "/photos/logo2.webp";
