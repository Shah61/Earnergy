/** WhatsApp deep links with a pre-filled opening message. */

/** Drops the visitor into a chat with this already typed — they just hit send. */
export const WHATSAPP_GREETING =
  "Hi Earnergy! 👋 I came across your website and found your products really interesting. I’d love to learn more about the products and the business opportunity.";

/**
 * @param phone international format, digits only (e.g. "60162220264")
 */
export function whatsappUrl(phone: string, message = WHATSAPP_GREETING): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
