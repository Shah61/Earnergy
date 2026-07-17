import { ROUTES } from "./routes";

export const CONTACT_HERO = {
  badge: "Smart Products • Smarter Business",
  title: "We Would Love",
  titleHighlight: "Hear",
  titleSuffix: "from You",
  description:
    "Thank you for your interest in Earnergy. Whether you have questions about Box Bites, KOFÉ, retail orders, collaborations, or distribution, our team is here to help.",
};

export const CONTACT_INFO = [
  { title: "Address", text: "Malaysia", icon: "map-pin" as const },
  { title: "Email Us", text: "hello@earnergy.online", icon: "mail" as const, href: "mailto:hello@earnergy.online" },
  { title: "Call Us", text: "+60 XX XXX XXXX", icon: "phone" as const, href: "tel:+60000000000" },
  { title: "Working Hours", text: "10:00 AM - 6:00 PM", icon: "clock" as const },
];

export const CONTACT_PARTNERSHIPS_EMAIL = "collabs@earnergy.online";

export const CONTACT_FORM_IMAGE = {
  src: "/photos/kofe.jpeg",
  alt: "Earnergy Box Bites and KOFÉ products",
};

export const CONTACT_SUPPORT = [
  {
    title: "Retail & Distribution",
    description:
      "Interested in carrying Earnergy products? Contact us for retail placement, bulk orders, and distribution opportunities.",
    cta: "Partner With Us",
    href: "#contact-form",
  },
  {
    title: "Product Enquiries",
    description:
      "Have questions about Box Bites or KOFÉ? Reach out to learn more about our products, ingredients, and availability.",
    cta: "View Products",
    href: ROUTES.products,
  },
];

export const CONTACT_SOCIAL = [
  { label: "Facebook", icon: "facebook" as const, href: "#" },
  { label: "Instagram", icon: "instagram" as const, href: "#" },
  { label: "TikTok", icon: "tiktok" as const, href: "#" },
];

export const CONTACT_CTA = {
  title: "Let's Build Smarter",
  titleLine2: "Everyday Choices Together",
  description:
    "From functional snacks to purposeful beverages, Earnergy is creating products made for modern lifestyles. Reach out to explore partnerships, collaborations, retail opportunities, or product enquiries.",
  prompt: "Ready to connect with Earnergy?",
  buttonLabel: "Contact Us",
  buttonHref: "#contact-form",
};
