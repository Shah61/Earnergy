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

export type JoinStep = {
  no: string;
  title: string;
  text: string;
  icon: "shop" | "business" | "share" | "growth";
};

export const JOIN_STEPS_HEAD = {
  tag: "How It Works",
  statementInk: "Shop. Do Business. Share.",
  statementDim: "Grow Your Income.",
  text: "What you spend can now become a business. Four simple habits power the whole Earnergy opportunity.",
};

export const JOIN_STEPS: JoinStep[] = [
  {
    no: "01",
    title: "Shop",
    text: "Start with what you already do — enjoy Box Bites and KOFÉ as part of your everyday routine.",
    icon: "shop",
  },
  {
    no: "02",
    title: "Do Business",
    text: "Resell Earnergy products and earn RM10 retail profit on every single unit you sell.",
    icon: "business",
  },
  {
    no: "03",
    title: "Share",
    text: "Introduce the opportunity to your circle and help others start their own reseller journey.",
    icon: "share",
  },
  {
    no: "04",
    title: "Grow Your Income",
    text: "As your circles expand across five levels, your retail profit potential multiplies with them.",
    icon: "growth",
  },
];

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
