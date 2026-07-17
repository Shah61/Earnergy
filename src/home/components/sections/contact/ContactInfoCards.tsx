import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT_INFO } from "@home/constants/contact";
import { revealDelay } from "@home/utils/reveal";

const INFO_ICONS = {
  "map-pin": MapPin,
  mail: Mail,
  phone: Phone,
  clock: Clock,
} as const;

export function ContactInfoCards() {
  return (
    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {CONTACT_INFO.map(({ title, text, icon, href }, index) => {
        const Icon = INFO_ICONS[icon];
        const content = (
          <>
            <div className="flex flex-col gap-5">
              <span className="flex size-11 items-center justify-center rounded-full bg-[#74c157] text-black">
                <Icon className="size-5" />
              </span>

              <div>
                <p className="text-sm font-semibold text-black">{title}</p>
                <p className="mt-1 text-sm text-neutral-500">{text}</p>
              </div>
            </div>

            <span className="flex size-8 items-center justify-center rounded-full bg-black text-white transition duration-300 group-hover:rotate-45 group-hover:bg-[#74c157] group-hover:text-black">
              <ArrowUpRight className="size-4" />
            </span>
          </>
        );

        const className =
          "c-r-rise group flex min-h-[150px] items-start justify-between gap-3 rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_6px_22px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#74c157]";

        const style = revealDelay(index, 0.04, 0.09);

        return href ? (
          <a key={title} href={href} className={className} style={style}>
            {content}
          </a>
        ) : (
          <div key={title} className={className} style={style}>
            {content}
          </div>
        );
      })}
    </section>
  );
}
