import type { ProductData, ProductId } from "@home/types/products";

export const PRODUCTS: Record<ProductId, ProductData> = {
  box: {
    wordmark: "Box Bites",
    category: "Functional Oat Snack",
    hero1: "Smart Snacking That",
    hero2: "Boxes Your",
    grn: "Cravings",
    heroPara:
      "Meet Box Bites — a functional oat-based snack made for people who want something satisfying, convenient, and better for everyday snacking. Crafted with hearty rolled oats, rich dark chocolate, and Hoodia extract.",
    tagline: "Snack smarter. Stay satisfied. Keep moving.",
    buy: "Buy Box Bites",
    buyNow: "Buy Box Bites Now",
    aboutTitle: "A Better Snack For Modern Lifestyles",
    aboutPara:
      "Box Bites was created for people who want a snack that feels satisfying, tastes good, and fits into a smarter routine. Each bite combines the natural texture of oats with the richness of dark chocolate and the functional benefit of Hoodia extract — a smarter way to manage cravings while still enjoying something delicious.",
    hlGrn: "Box Bites",
    highlights: [
      {
        t: "Made With Rolled Oats",
        d: "A hearty oat-based snack with a satisfying bite, made to support longer fullness and everyday energy.",
      },
      {
        t: "Rich Dark Chocolate",
        d: "A delicious chocolate flavour that makes smarter snacking feel enjoyable, not boring.",
      },
      {
        t: "Powered With Hoodia",
        d: "Formulated with Hoodia extract, traditionally known for supporting appetite control and craving management.",
      },
      {
        t: "No Added White Sugar",
        d: "A better everyday snack made for those who want to reduce unnecessary white sugar intake.",
      },
      {
        t: "High Fiber Snack",
        d: "A convenient way to enjoy a more filling snack during work, study, or busy daily routines.",
      },
      {
        t: "Individually Packed",
        d: "Easy to carry, easy to enjoy, and perfect for snacking anytime, anywhere.",
      },
    ],
    numsIntro:
      "Box Bites combines hearty rolled oats, rich dark chocolate, and Hoodia extract into a snack designed to satisfy cravings, support fullness, and fit smarter everyday routines.",
    stats: [
      { v: 100, s: "%", l: "Oat-based recipe" },
      { v: 0, s: "g", l: "Added white sugar" },
      { v: 3, s: "", l: "Functional ingredients" },
      { v: 6, s: "", l: "Reasons to love it" },
    ],
    revLabel: "Loved by smart snackers",
    revLead: "Thousands snack smarter with Box Bites every day.",
    reviews: [
      {
        i: "A",
        n: "Aisha",
        r: "Busy professional",
        q: "Finally a snack I can keep in my bag that doesn't leave me hungry an hour later. The dark chocolate makes it feel like a treat.",
      },
      {
        i: "D",
        n: "Daniel",
        r: "Student",
        q: "Box Bites get me through long study sessions — filling, tasty, and no sugar crash afterwards.",
      },
      {
        i: "M",
        n: "Mei",
        r: "Frequent traveller",
        q: "Individually packed and genuinely satisfying. It's my go-to between meals when I'm on the move.",
      },
    ],
    ctaTitle: "Ready To",
    ctaGrn: "Snack Smarter?",
    ctaPara:
      "Choose Box Bites for a satisfying snack made with purposeful ingredients and everyday convenience.",
    heroImages: [
      "/photos/bb-prod.jpeg",
      "/photos/bb-detail.webp",
      "/photos/box-bites.webp",
    ],
    aboutImages: {
      big: "/photos/bb-wallpaper.webp",
      small: "/photos/bb-detail.webp",
    },
  },
  kofe: {
    wordmark: "Kofé",
    category: "Functional Spanish Latte",
    hero1: "Goodbye Sugar,",
    hero2: "Hello",
    grn: "Energy",
    heroPara:
      "KOFÉ Spanish Latte is a smooth and creamy functional coffee drink made for modern routines — crafted with Arabica coffee, coconut milk powder, prebiotics, probiotics, MCT oil, monk fruit, and stevia.",
    tagline: "Creamy taste. Smarter ingredients. Everyday energy.",
    buy: "Buy KOFÉ",
    buyNow: "Buy KOFÉ Now",
    aboutTitle: "A Spanish Latte That Serves A Purpose",
    aboutPara:
      "KOFÉ was created for coffee lovers who want more than just a sweet drink. It brings together the smooth taste of Spanish latte with functional ingredients that fit into a smarter lifestyle. Each sachet is easy to prepare, creamy to drink, and enjoyable anytime you need a boost.",
    hlGrn: "KOFÉ",
    highlights: [
      {
        t: "Spanish Latte Taste",
        d: "Smooth, rich, and creamy with a satisfying café-style flavour.",
      },
      {
        t: "Prebiotics + Probiotics",
        d: "Made to support better gut health as part of your daily routine.",
      },
      {
        t: "Arabica For Focus",
        d: "Natural caffeine from Arabica coffee to help support alertness and concentration.",
      },
      {
        t: "Dairy-Free Creamy Blend",
        d: "Made with coconut milk powder and nondairy creamer for a creamy latte experience.",
      },
      {
        t: "No White Sugar",
        d: "Sweetened with monk fruit and stevia for a smarter everyday choice.",
      },
      {
        t: "With MCT Oil",
        d: "A functional ingredient often used to support energy-focused lifestyles.",
      },
    ],
    numsIntro:
      "KOFÉ blends Arabica coffee, coconut milk powder, prebiotics, probiotics, MCT oil, monk fruit, and stevia into a creamy Spanish latte crafted to support energy, focus, and gut health.",
    stats: [
      { v: 10, s: "", l: "Premium ingredients" },
      { v: 0, s: "g", l: "Added white sugar" },
      { v: 25, s: "g", l: "Per single sachet" },
      { v: 6, s: "", l: "Functional benefits" },
    ],
    revLabel: "Loved by coffee lovers",
    revLead: "Thousands start their day with KOFÉ.",
    reviews: [
      {
        i: "S",
        n: "Sofia",
        r: "Morning person",
        q: "All the creamy comfort of a Spanish latte without the sugar crash. It's become my daily morning ritual.",
      },
      {
        i: "J",
        n: "James",
        r: "Remote worker",
        q: "Smooth, low-acidity, and easy to make. The focus boost is real on long work-from-home days.",
      },
      {
        i: "L",
        n: "Lena",
        r: "Wellness enthusiast",
        q: "Love that it supports gut health and tastes amazing. Iced over the afternoon is my favourite.",
      },
    ],
    ctaTitle: "Make Your Coffee",
    ctaGrn: "Work Smarter",
    ctaPara:
      "Enjoy the smooth taste of Spanish latte with functional ingredients made for modern daily routines.",
    heroImages: [
      "/photos/kofe.webp",
      "/photos/kofeWallpaper.webp",
      "/photos/kofeIngredient.webp",
    ],
    aboutImages: {
      big: "/photos/kofeWallpaper.webp",
      small: "/photos/kofe.webp",
    },
  },
};

export const PRODUCT_NAV = [
  { label: "Highlights", hash: "highlights" },
  { label: "About", hash: "about" },
  { label: "Reviews", hash: "reviews" },
] as const;
