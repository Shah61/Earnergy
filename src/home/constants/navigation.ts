import { ROUTES } from "./routes";

export type NavItem = {
  label: string;
  href: string;
};

/** opens the product list (each straight to BeliBeli) instead of a page */
export type ShopNavItem = {
  label: string;
  shop: true;
};

export type MenuItem = NavItem | ShopNavItem;

export const NAV_ITEMS: MenuItem[] = [
  { label: "Home", href: ROUTES.home },
  { label: "Our Products", href: ROUTES.products },
  { label: "Shop", shop: true },
  { label: "Contact Us", href: ROUTES.contact },
];

export function isNavLink(item: MenuItem): item is NavItem {
  return "href" in item;
}

export const SHOP_MENU = {
  eyebrow: "Buy on BeliBeli",
  /** shown under the list while a reseller code rides on the links */
  codeNote: "Reseller code applied:",
} as const;

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
