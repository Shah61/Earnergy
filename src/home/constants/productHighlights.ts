import type { ProductId } from "@home/types/products";
import type { ProductHighlightsConfig } from "@home/types/productHighlights";

export const PRODUCT_HIGHLIGHTS: Record<ProductId, ProductHighlightsConfig> = {
  box: {
    badge: "Box Bites",
    badgeSecondary: "Healthy Cookies That Box Your Cravings",
    eyebrow: "Functional Ingredients",
    title: "Purposeful Ingredients,",
    titleAccent: "Smarter Snacking",
    intro:
      "Made with rolled oats, rich dark chocolate, and Hoodia extract, Box Bites is created for satisfying cravings, longer fullness, and better everyday snacking.",
    floatImages: [
      { src: "/oat.webp", alt: "Golden rolled oats", position: "left" },
      { src: "/chocolate.webp", alt: "Dark chocolate curl", position: "right" },
      { src: "/hoodia.webp", alt: "Hoodia flower", position: "center" },
    ],
    ingredientCards: [
      {
        number: "01",
        title: "Rolled Oats For Lasting Fullness",
        description:
          "A hearty oat base that gives every bite a satisfying texture while helping you feel fuller for longer.",
        image: "/oat.webp",
        imageAlt: "Golden rolled oats",
      },
      {
        number: "02",
        title: "Rich Dark Chocolate Taste",
        description:
          "A smooth, satisfying chocolate flavour that makes better snacking feel indulgent, not restrictive.",
        image: "/chocolate.webp",
        imageAlt: "Dark chocolate curl",
      },
      {
        number: "03",
        title: "Powered With Hoodia Extract",
        description:
          "A functional botanical ingredient traditionally known for supporting craving control and mindful snacking.",
        image: "/hoodia.webp",
        imageAlt: "Hoodia flower",
      },
    ],
    iconCards: [
      {
        number: "04",
        title: "No Added White Sugar",
        description:
          "Created for those who want a smarter snack option without added white sugar.",
        icon: "candy-off",
      },
      {
        number: "05",
        title: "High Fiber, Better Satisfaction",
        description:
          "A more filling snack choice made to support busy workdays, study sessions, and everyday routines.",
        icon: "wheat",
      },
      {
        number: "06",
        title: "Individually Packed For Convenience",
        description:
          "Packed for easy snacking wherever your day takes you — at work, in class, while travelling, or between meals.",
        icon: "package",
      },
    ],
    ctaTitle: "Ready for a smarter snack?",
    ctaPrimary: "Shop Box Bites",
    ctaSecondary: "View Nutrition",
  },
  kofe: {
    badge: "Kofé",
    badgeSecondary: "Functional Spanish Latte",
    eyebrow: "Functional Ingredients",
    title: "Café Comfort,",
    titleAccent: "Smarter Energy",
    intro:
      "A functional Spanish latte crafted with Arabica coffee, coconut milk, prebiotics, probiotics, MCT oil, and natural sweeteners — made for smooth energy, gut support, and everyday focus.",
    floatImages: [
      { src: "/kofe/arabica.webp", alt: "Arabica coffee beans", position: "left" },
      { src: "/kofe/cup.webp", alt: "Iced Spanish latte", position: "right" },
      { src: "/kofe/coconut.webp", alt: "Coconut milk", position: "center" },
    ],
    ingredientCards: [
      {
        number: "01",
        title: "Arabica Coffee",
        description:
          "Premium coffee base with natural caffeine to support focus, alertness, and everyday energy.",
        image: "/kofe/arabica.webp",
        imageAlt: "Arabica coffee beans",
      },
      {
        number: "02",
        title: "Coconut Milk Powder",
        description:
          "Adds a smooth, creamy body for a rich café-style Spanish latte experience without dairy.",
        image: "/kofe/coconut.webp",
        imageAlt: "Coconut milk powder",
      },
      {
        number: "03",
        title: "Prebiotics + Probiotics",
        description:
          "A gut-friendly combination made to support digestive wellness as part of your daily coffee ritual.",
        image: "/kofe/probiotic.webp",
        imageAlt: "Probiotic ingredient",
      },
      {
        number: "04",
        title: "Non-Dairy Creamer",
        description:
          "Creates a fuller, smoother mouthfeel while keeping the blend creamy and convenient.",
        image: "/kofe/nondairy.webp",
        imageAlt: "Non-dairy creamer",
      },
      {
        number: "05",
        title: "Chicory Root Inulin",
        description:
          "A prebiotic fiber that helps support gut-friendly daily routines.",
        image: "/kofe/chicory.webp",
        imageAlt: "Chicory root inulin",
      },
      {
        number: "06",
        title: "Latte Flavour",
        description:
          "Gives Kofé its smooth, familiar latte profile with a balanced café-style finish.",
        image: "/kofe/cup.webp",
        imageAlt: "Latte flavour",
      },
      {
        number: "07",
        title: "Vanilla Bean Flavour",
        description:
          "Adds a soft aromatic sweetness that rounds out the coffee and creamy notes.",
        image: "/kofe/vanilla.webp",
        imageAlt: "Vanilla bean flavour",
      },
      {
        number: "08",
        title: "Tricalcium Phosphate",
        description:
          "Included as part of the formulation to support product stability and consistency.",
        image: "/kofe/tricalcium.webp",
        imageAlt: "Tricalcium phosphate",
      },
      {
        number: "09",
        title: "MCT Oil",
        description:
          "A functional fat source often used in energy-focused routines and active lifestyles.",
        image: "/kofe/mct.webp",
        imageAlt: "MCT oil",
      },
      {
        number: "10",
        title: "Natural Sweetener Blend",
        description:
          "Sweetened with monk fruit and stevia for a smoother choice without added white sugar.",
        image: "/kofe/monkfruit.webp",
        imageAlt: "Monk fruit and stevia",
      },
    ],
    iconCards: [
      {
        number: "11",
        title: "No Added White Sugar",
        description:
          "A smarter coffee choice made without added white sugar, helping you avoid the usual sugar crash.",
        icon: "candy-off",
      },
      {
        number: "12",
        title: "Dairy-Free Creamy Blend",
        description:
          "Creamy and satisfying without relying on dairy, making it easier to enjoy every day.",
        icon: "coffee",
      },
      {
        number: "13",
        title: "Spanish Latte, Anywhere",
        description:
          "Individually packed sachets — easy to prepare at home, at work, in class, or on the go.",
        icon: "package",
      },
    ],
    ctaTitle: "Ready for smarter coffee?",
    ctaPrimary: "Shop Kofé",
    ctaSecondary: "View Nutrition",
  },
};
