export type ServiceItem = {
  number: string;
  title: string;
  image?: string;
  revealDelay: string;
};

export const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Box Bites supports smarter snacking with oats, dark chocolate, and Hoodia",
    image: "/photos/bb-ingredient.webp",
    revealDelay: ".08s",
  },
  {
    number: "02",
    title: "KOFÉ Spanish Latte delivers smooth energy with Arabica coffee and MCT oil",
    image: "/photos/kofeIngredient.webp",
    revealDelay: ".16s",
  },
  {
    number: "03",
    title: "Functional ingredients help support fullness, focus, and gut health",
    image: "/photos/kofeMenu.webp",
    revealDelay: ".24s",
  },
  {
    number: "04",
    title: "Convenient formats made for busy lifestyles, workdays, and daily routines",
    image: "/photos/box-bites.webp",
    revealDelay: ".32s",
  },
];
