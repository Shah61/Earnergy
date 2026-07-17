import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_SUPPORT } from "@home/constants/contact";
import { revealDelay } from "@home/utils/reveal";

export function ContactSupportCards() {
  return (
    <section className="grid gap-5 md:grid-cols-2">
      {CONTACT_SUPPORT.map(({ title, description, cta, href }, index) => {
        const isRoute = href.startsWith("/");

        const buttonClass =
          "mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#74c157] px-5 py-2.5 text-sm font-semibold text-black transition duration-300 hover:bg-black hover:text-white";

        return (
          <div
            key={title}
            className="c-r-scale flex flex-col gap-4 rounded-[32px] border border-neutral-200 bg-white p-8 shadow-[0_6px_22px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#74c157]"
            style={revealDelay(index, 0.06, 0.12)}
          >
            <h3 className="text-xl font-semibold text-black">{title}</h3>
            <p className="text-base leading-7 text-neutral-600">
              {description}
            </p>

            {isRoute ? (
              <Link to={href} className={buttonClass}>
                {cta}
                <ArrowUpRight className="size-4" />
              </Link>
            ) : (
              <a href={href} className={buttonClass}>
                {cta}
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        );
      })}
    </section>
  );
}
