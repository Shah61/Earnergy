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

      {/* three across so the wide combo card (two columns) leaves no gaps;
          dense lets a single card move up into a gap on two-column screens */}
      <div className="grid grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
        {JOIN_PRODUCTS.map((product, index) => (
          <a
            key={product.no}
            href={belibeliProductUrl(product.productId, uplineCode)}
            target="_blank"
            rel="noreferrer"
            className={`c-r-rise group relative flex flex-col overflow-hidden rounded-3xl${product.featured ? " sm:col-span-2" : ""} border border-neutral-200 bg-white shadow-[0_6px_22px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1.5 hover:border-[#74c157] hover:shadow-[0_28px_55px_-32px_rgba(79,158,52,0.55)]`}
            style={revealDelay(index, 0.12, 0.09)}
          >
            {/* the artwork is the card top — matching the stage to the file's
                own ratio means cover fills the width without cropping a word */}
            <div
              className="relative w-full overflow-hidden bg-neutral-50"
              style={{ aspectRatio: product.imageRatio }}
            >
              <img
                src={product.image}
                alt={product.imageAlt}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 90vw"
                className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
            </div>

            <div className="relative flex flex-1 flex-col p-6 pt-5">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-0 font-display text-6xl font-extrabold text-neutral-100 transition duration-300 group-hover:text-[#74c157]/25"
              >
                {product.no}
              </span>
              <div className="relative mb-3 flex flex-wrap items-center gap-1.5">
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
              <h3 className="relative mb-2 font-display text-lg font-extrabold uppercase leading-snug tracking-[-0.01em] text-black">
                {product.name}
              </h3>
              <p className="text-sm leading-6 text-neutral-600">{product.tagline}</p>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4 sm:mt-auto sm:pt-5">
                <span className="flex min-w-0 flex-col">
                  <span className="font-display text-xl font-extrabold text-black">
                    {product.price}
                  </span>
                  <span className="mt-0.5 text-[13px] font-medium text-red-600">
                    {product.retailProfit}
                  </span>
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
