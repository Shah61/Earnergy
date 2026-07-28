import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { JOIN_PRODUCTS, JOIN_PRODUCTS_HEAD } from "@home/constants/join";
import { belibeliProductUrl } from "@/lib/belibeli";
import { useAffiliateCode } from "@/hooks/useAffiliateCode";
import { revealDelay } from "@home/utils/reveal";

export function JoinProducts() {
  /* an activated affiliate buys under their own code; everyone else gets
     Earnergy's house code */
  const uplineCode = useAffiliateCode();

  return (
    <section className="px-1 py-10 md:py-14">
      <div className="mb-10 grid items-start gap-6 md:grid-cols-[minmax(180px,0.9fr)_minmax(0,1.5fr)] md:gap-14">
        <p
          className="c-r-fade font-display text-sm font-bold uppercase tracking-[0.16em] text-black"
          style={revealDelay(0)}
        >
          {JOIN_PRODUCTS_HEAD.tag} <span className="text-[#74c157]">•</span>
        </p>
        <div>
          <h2
            className="c-r-rise font-display text-2xl font-extrabold uppercase leading-tight tracking-[-0.01em] md:text-3xl"
            style={{ "--d": "0.1s" } as CSSProperties}
          >
            <span className="text-black">{JOIN_PRODUCTS_HEAD.statementInk}</span>{" "}
            <span className="text-[#4f9e34]">{JOIN_PRODUCTS_HEAD.statementDim}</span>
          </h2>
          <p
            className="c-r-fade mt-4 max-w-xl text-base leading-7 text-neutral-600"
            style={{ "--d": "0.18s" } as CSSProperties}
          >
            {JOIN_PRODUCTS_HEAD.text}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-5">
        {JOIN_PRODUCTS.map((product, index) => (
          <a
            key={product.no}
            href={belibeliProductUrl(product.productId, uplineCode)}
            target="_blank"
            rel="noreferrer"
            className="c-r-rise group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_6px_22px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1.5 hover:border-[#74c157] hover:shadow-[0_28px_55px_-32px_rgba(79,158,52,0.55)]"
            style={revealDelay(index, 0.12, 0.09)}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1 z-[1] font-display text-6xl font-extrabold text-neutral-100 transition duration-300 group-hover:text-[#74c157]/25"
            >
              {product.no}
            </span>

            <div className="relative flex h-56 items-center justify-center bg-gradient-to-b from-[#f4f9f0] to-white p-6 sm:h-60">
              {product.units === 2 && product.unitsLayout === "side" ? (
                /* staggered pair — only the outer edge tucks behind, so the
                   transparent packshot never muddies the branding */
                <div className="relative h-full w-full transition duration-300 group-hover:scale-[1.05]">
                  <img
                    src={product.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 m-auto max-h-[80%] w-auto max-w-[46%] translate-x-[46%] -translate-y-[12%] object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.13)]"
                  />
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 m-auto max-h-[94%] w-auto max-w-[52%] -translate-x-[38%] translate-y-[5%] object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.2)]"
                  />
                </div>
              ) : product.units === 2 ? (
                /* both packs upright; the second sits back and a little lower */
                <div className="relative h-full w-full transition duration-300 group-hover:scale-[1.05]">
                  <img
                    src={product.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 m-auto max-h-[84%] w-auto max-w-[54%] translate-x-[20%] translate-y-[7%] object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.13)]"
                  />
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 m-auto max-h-[84%] w-auto max-w-[54%] -translate-x-[20%] -translate-y-[3%] object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.2)]"
                  />
                </div>
              ) : (
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full w-auto max-w-full object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.14)] transition duration-300 group-hover:scale-[1.05]"
                />
              )}
            </div>

            <div className="flex flex-1 flex-col p-6 pt-5">
              <div className="mb-3 flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#74c157]/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#3d7d27]">
                  <span className="size-1.5 rounded-full bg-[#74c157]" />
                  Available on BeliBeli
                </span>
                {product.badge ? (
                  <span className="inline-flex items-center rounded-full bg-neutral-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                    {product.badge}
                  </span>
                ) : null}
              </div>
              <h3 className="mb-2 font-display text-lg font-extrabold uppercase leading-snug tracking-[-0.01em] text-black">
                {product.name}
              </h3>
              <p className="text-sm leading-6 text-neutral-600">{product.tagline}</p>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4 sm:mt-auto sm:pt-5">
                <span className="font-display text-xl font-extrabold text-black">
                  {product.price}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition duration-300 group-hover:bg-[#74c157] group-hover:text-black">
                  Buy Now
                  <ArrowUpRight className="size-4 transition duration-300 group-hover:rotate-45" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
