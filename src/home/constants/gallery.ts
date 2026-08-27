export type GalleryItem = {
  src: string;
  alt: string;
};

/* brand posters, alternating Kofé and Box Bites so the carousel never shows
   two of the same palette in a row. every file is 4:5, which is what
   --gallery-aspect is set to, so no card crops or letterboxes its artwork.
   the ingredient explainers live in the services section instead. */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/photos/v2/newKofePoster.webp",
    alt: "KOFÉ Spanish Latte — naturally sweetened, 25g x 5 sachets",
  },
  {
    src: "/photos/v2/newBB1.webp",
    alt: "Box Bites — healthy fuel, good source of energy, highly filling",
  },
  {
    src: "/photos/v2/newKofe3.webp",
    alt: "KOFÉ Spanish Latte boxes, 25g x 5 sachets",
  },
  {
    src: "/photos/v2/newBB2.webp",
    alt: "Box Bites — a healthy source of energy, high fibre with no added sugar",
  },
  {
    src: "/photos/v2/newKofe2.webp",
    alt: "KOFÉ Spanish Latte — goodbye sugar, hello energy",
  },
  {
    src: "/photos/v2/knowHoodia.webp",
    alt: "Get to know Hoodia gordonii, the appetite-supporting succulent behind Box Bites",
  },
  {
    src: "/photos/v2/newKofe.webp",
    alt: "Two KOFÉ Spanish Latte boxes",
  },
  {
    src: "/photos/v2/newbb.webp",
    alt: "Box Bites healthy cookies pouch",
  },
];
