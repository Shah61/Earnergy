export type HighlightIconId = "candy-off" | "wheat" | "package" | "zap" | "coffee";

export type HighlightFloatImage = {
  src: string;
  alt: string;
  position: "left" | "right" | "center";
};

export type HighlightIngredientCard = {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type HighlightIconCard = {
  number: string;
  title: string;
  description: string;
  icon: HighlightIconId;
};

export type ProductHighlightsConfig = {
  badge: string;
  badgeSecondary: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  floatImages: HighlightFloatImage[];
  ingredientCards: HighlightIngredientCard[];
  iconCards: HighlightIconCard[];
  ctaTitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};
