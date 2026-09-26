import { RESELLER_CODE_SECTION } from "./reseller";
import { ROUTES } from "./routes";

export type NavItem = {
  label: string;
  href: string;
};

/** "shop": the products, each straight to BeliBeli; "reseller": the
    reseller links */
export type MenuPanelKind = "shop" | "reseller";

/** unfolds a panel of links instead of opening a page */
export type PanelNavItem = {
  label: string;
  panel: MenuPanelKind;
};

export type MenuItem = NavItem | PanelNavItem;

export const NAV_ITEMS: MenuItem[] = [
  { label: "Home", href: ROUTES.home },
  { label: "Our Products", href: ROUTES.products },
  { label: "Shop", panel: "shop" },
  { label: "Reseller", panel: "reseller" },
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

/* behind "Reseller": get your own share link on Home, then follow what it
   earns on BeliBeli. The sub line is two-tone, like the paste-code card's
   tagline. */
export const RESELLER_MENU = [
  {
    label: "Reseller Landing Page",
    subDim: "Start sharing.",
    subInk: "Start earning.",
    icon: "key",
    /** the paste-code card on Home */
    href: `${ROUTES.home}#${RESELLER_CODE_SECTION.id}`,
  },
  {
    label: "BeliBeli.Online",
    subDim: "View commission.",
    subInk: "View network.",
    icon: "network",
    /** resellers log in there to see their commission and network */
    href: "https://belibeli.online",
  },
] as const;

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
