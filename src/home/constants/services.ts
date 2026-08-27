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
    image: "/photos/v2/newBBingre.webp",
    revealDelay: ".08s",
  },
  {
    number: "02",
    title: "KOFÉ Spanish Latte delivers smooth energy with Arabica coffee and MCT oil",
    image: "/photos/v2/newKofeing.webp",
    revealDelay: ".16s",
  },
  {
    number: "03",
    title: "Functional ingredients help support fullness, focus, and gut health",
    image: "/photos/v2/newKofe4.webp",
    revealDelay: ".24s",
  },
  {
    number: "04",
    title: "Convenient formats made for busy lifestyles, workdays, and daily routines",
    image: "/photos/v2/newBB3.webp",
    revealDelay: ".32s",
  },
];
