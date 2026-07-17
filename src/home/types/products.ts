export type ProductId = "box" | "kofe";

export type ProductHighlight = {
  t: string;
  d: string;
};

export type ProductStat = {
  v: number;
  s: string;
  l: string;
};

export type ProductReview = {
  i: string;
  n: string;
  r: string;
  q: string;
};

export type ProductData = {
  wordmark: string;
  category: string;
  hero1: string;
  hero2: string;
  grn: string;
  heroPara: string;
  tagline: string;
  buy: string;
  buyNow: string;
  aboutTitle: string;
  aboutPara: string;
  hlGrn: string;
  highlights: ProductHighlight[];
  numsIntro: string;
  stats: ProductStat[];
  revLabel: string;
  revLead: string;
  reviews: ProductReview[];
  ctaTitle: string;
  ctaGrn: string;
  ctaPara: string;
  heroImages: [string, string, string];
  aboutImages: { big: string; small: string };
};
