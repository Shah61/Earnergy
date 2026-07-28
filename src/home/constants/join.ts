import { BELIBELI_PRODUCTS } from "@/lib/belibeli";
import { ROUTES } from "./routes";

export const JOIN_HERO = {
  badge: "Earnergy Business Opportunity",
  titleL1: "What You Spend",
  titleL2: "Can Now Become",
  titleL3: "a Business",
  lead: ["Shop", "Do Business", "Share", "Grow Your Income"],
  description:
    "Join Earnergy as a reseller and turn everyday purchases into a real income stream. Earn RM10 retail profit on every unit, then grow your circles level by level with the 5-Level Circle System.",
  sticker: { line1: "All RM50", line2: "Is Now", line3: "Yours!" },
  primaryCta: { label: "See the Circle System", href: "#circle-system" },
  secondaryCta: { label: "Buy Now", href: ROUTES.products },
  teaserLabel: "Your Potential Retail Profit",
};

export type JoinProduct = {
  no: string;
  name: string;
  tagline: string;
  price: string;
  image: string;
  imageAlt: string;
  /** units shipped per order — 2 renders the packshot as a pair */
  units?: number;
  /** BeliBeli product id — the buy link is built with the visitor's upline code */
  productId: string;
};

export const JOIN_PRODUCTS_HEAD = {
  tag: "Shop The Products",
  statementInk: "Buy on BeliBeli.",
  statementDim: "Start Earning Today.",
  text: "Every Earnergy product is available on BeliBeli. Grab yours, experience it, and turn what you spend into your first step as a reseller.",
};

export const JOIN_PRODUCTS: JoinProduct[] = [
  {
    no: "01",
    name: "EARNERGYBOX — Business All In A Box",
    tagline:
      "For just RM99 you get more than premium, healthy products — you also get the system, the knowledge and the community to start your business smarter.",
    price: "RM 99",
    image: "/boxbundle.png",
    imageAlt: "EARNERGYBOX bundle — Box Bites, KOFÉ and the business book",
    productId: BELIBELI_PRODUCTS.earnergyBox,
  },
  {
    no: "02",
    name: "Box Bites Healthy Cookies",
    tagline: "Hoodia extract, no added white sugar — healthy cookies that box your cravings.",
    price: "RM 30",
    image: "/box-bites-pouch.webp",
    imageAlt: "Box Bites healthy cookies pouch",
    productId: BELIBELI_PRODUCTS.boxBites,
  },
  {
    no: "03",
    name: "KOFÉ Spanish Latte",
    tagline:
      "×2 boxes per order. Probiotics + prebiotics, no white sugar — goodbye sugar, hello energy.",
    price: "RM 30",
    image: "/kofe/kofebox.webp",
    imageAlt: "Two KOFÉ Spanish Latte boxes",
    units: 2,
    productId: BELIBELI_PRODUCTS.kofe,
  },
  {
    no: "04",
    name: "Buku Berniaga Semudah Berbelanja",
    tagline: "The playbook that turns everyday spending into modal dan pendapatan.",
    price: "RM 30",
    image: "/Buku.png",
    imageAlt: "Buku Berniaga Semudah Berbelanja physical book",
    productId: BELIBELI_PRODUCTS.buku,
  },
];

export type JoinAffiliateStep = {
  no: string;
  title: string;
  text: string;
  icon: "buy" | "mail" | "paste";
};

export const JOIN_AFFILIATE_HEAD = {
  tag: "Become An Affiliate",
  statementInk: "Three Steps.",
  statementDim: "Your Own Earning Link.",
  text: "No sign-ups, no forms, no passwords. Buy once, grab your code from your email, paste it below — and you're an Earnergy affiliate with a link that pays you.",
};

export const JOIN_AFFILIATE_STEPS: JoinAffiliateStep[] = [
  {
    no: "01",
    title: "Buy Any Product",
    text: "Purchase any product below on BeliBeli — the EARNERGYBOX bundle, Box Bites, KOFÉ, or the book. Any one of them unlocks your affiliate journey.",
    icon: "buy",
  },
  {
    no: "02",
    title: "Check Your Email",
    text: "After your purchase, BeliBeli emails you your personal upline code. That code is your affiliate code — keep it close.",
    icon: "mail",
  },
  {
    no: "03",
    title: "Paste Your Code",
    text: "Drop your code into the field below and you will automatically become an affiliate — with your own shareable earning link.",
    icon: "paste",
  },
];

export const JOIN_AFFILIATE_FORM = {
  label: "Your upline code",
  placeholder: "e.g. 5141",
  button: "Activate My Link",
  buttonBusy: "Activating…",
  successTitle: "You're officially an Earnergy affiliate!",
  successText:
    "Share this link anywhere — every purchase made through it carries your upline code, so the commissions land with you.",
  copy: "Copy Link",
  copied: "Copied!",
  errorGeneric: "Something went wrong — please try again.",
};

export type JoinLevel = {
  id: string;
  name: string;
  sub: string;
  calc: string;
  potential: number;
  coins: number;
  bar: number;
  accent: string;
  accentSoft: string;
  accentDeep: string;
};

export const JOIN_SYSTEM = {
  tag: "Join Now",
  title: "Introducing Earnergy's",
  titleDim: "Business Opportunity",
  text: "One product. RM10 retail profit per unit. Five levels of earning potential — from your first box to a business-scale circle.",
  columns: [
    "5-Level Circle System",
    "Retail Profit per Unit",
    "Your Potential Retail Profit",
  ],
  perUnit: "RM10",
  perUnitLabel: "Retail Profit",
  buyBar: {
    prompt: "Ready to earn RM10 on every unit?",
    buttonLabel: "Buy Now",
    buttonHref: ROUTES.products,
  },
  footnote:
    "Every level of the circle earns the same RM10 retail profit per unit — all RM50 is now yours.",
};

export const JOIN_LEVELS: JoinLevel[] = [
  {
    id: "G1",
    name: "You",
    sub: "EARNERGY Reseller",
    calc: "1 Box",
    potential: 10,
    coins: 1,
    bar: 12,
    accent: "#d4a418",
    accentSoft: "#faf3da",
    accentDeep: "#a37c07",
  },
  {
    id: "G2",
    name: "Core Circle",
    sub: "Direct",
    calc: "10 × RM10",
    potential: 100,
    coins: 2,
    bar: 30,
    accent: "#2f5fd0",
    accentSoft: "#e9effc",
    accentDeep: "#234ba8",
  },
  {
    id: "G3",
    name: "Support Circle",
    sub: "Level 3",
    calc: "100 × RM10",
    potential: 1000,
    coins: 3,
    bar: 52,
    accent: "#6d3fb8",
    accentSoft: "#f2ecfa",
    accentDeep: "#57318f",
  },
  {
    id: "G4",
    name: "Growth Circle",
    sub: "Level 4",
    calc: "1,000 × RM10",
    potential: 10000,
    coins: 4,
    bar: 76,
    accent: "#e05a1e",
    accentSoft: "#fdeee5",
    accentDeep: "#b74615",
  },
  {
    id: "G5",
    name: "Business Circle",
    sub: "Level 5",
    calc: "10,000 × RM10",
    potential: 100000,
    coins: 5,
    bar: 100,
    accent: "#4f9e34",
    accentSoft: "#ecf6e7",
    accentDeep: "#3d7d27",
  },
];

export const JOIN_CTA = {
  title: "Master Stockist-Equivalent Income Potential",
  titleLine2: "From RM10,000 to RM100,000 — Now Easier to Achieve",
  description:
    "You don't need a warehouse or heavy capital to build a serious business. With the 5-Level Circle System, consistent selling and sharing can grow your income to master-stockist levels — starting from a single box.",
  prompt: "Ready to turn spending into earning?",
  buttonLabel: "Buy Now",
  buttonHref: ROUTES.products,
  secondaryLabel: "or talk to us first",
  secondaryHref: ROUTES.contact,
  badge: "Smart Products • Smarter Business",
};
