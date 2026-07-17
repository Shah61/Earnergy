import { useState, type CSSProperties, type FormEvent } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import {
  CONTACT_FORM_IMAGE,
  CONTACT_PARTNERSHIPS_EMAIL,
} from "@home/constants/contact";
import { revealDelay } from "@home/utils/reveal";

const FORM_FIELDS = [
  { id: "firstName", label: "First Name", placeholder: "Enter First Name", type: "text" },
  { id: "lastName", label: "Last Name", placeholder: "Enter Last Name", type: "text" },
  { id: "email", label: "Email", placeholder: "Enter your Email", type: "email" },
  { id: "phone", label: "Phone", placeholder: "Enter Phone Number", type: "tel" },
] as const;

export function ContactFormSection() {
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section
      id="contact-form"
      className="c-r-fade rounded-[32px] border border-neutral-200 bg-white p-5 shadow-[0_6px_22px_rgba(0,0,0,0.04)] md:p-8"
      style={{ "--d": "0.04s" } as CSSProperties}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div
            className="c-r-curtain overflow-hidden rounded-3xl bg-neutral-100"
            style={{ "--d": "0.1s" } as CSSProperties}
          >
            <img
              src={CONTACT_FORM_IMAGE.src}
              alt={CONTACT_FORM_IMAGE.alt}
              className="h-72 w-full object-cover md:h-[420px]"
              loading="lazy"
            />
          </div>

          <div
            className="c-r-slide-l flex items-center justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            style={{ "--d": "0.22s" } as CSSProperties}
          >
            <div>
              <p className="text-base font-semibold text-black">
                Partnerships and Collaborations
              </p>
              <a
                href={`mailto:${CONTACT_PARTNERSHIPS_EMAIL}`}
                className="mt-1 inline-block text-sm text-neutral-500 transition hover:text-black"
              >
                {CONTACT_PARTNERSHIPS_EMAIL}
              </a>
            </div>

            <a
              href={`mailto:${CONTACT_PARTNERSHIPS_EMAIL}`}
              aria-label="Email partnerships"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#74c157] text-black transition duration-300 hover:-translate-y-1 hover:bg-black hover:text-white"
            >
              <ArrowUpRight className="size-5" />
            </a>
          </div>
        </div>

        <div
          className="c-r-slide-r rounded-3xl border border-neutral-200 bg-[#f7f7f7] p-6 md:p-8"
          style={{ "--d": "0.14s" } as CSSProperties}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {FORM_FIELDS.map(({ id, label, placeholder, type }, index) => (
                <div
                  key={id}
                  className="c-r-fade flex flex-col gap-2"
                  style={revealDelay(index, 0.2, 0.07)}
                >
                  <label htmlFor={id} className="text-sm font-semibold text-black">
                    {label}
                  </label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm text-black outline-none transition placeholder:text-neutral-400 focus:border-[#74c157] focus:ring-4 focus:ring-[#74c157]/15"
                  />
                </div>
              ))}
            </div>

            <div
              className="c-r-fade flex flex-col gap-2"
              style={{ "--d": "0.48s" } as CSSProperties}
            >
              <label htmlFor="message" className="text-sm font-semibold text-black">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Enter your Message"
                className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm text-black outline-none transition placeholder:text-neutral-400 focus:border-[#74c157] focus:ring-4 focus:ring-[#74c157]/15"
              />
            </div>

            <label
              className="c-r-fade flex cursor-pointer items-center gap-3 text-sm text-neutral-500"
              style={{ "--d": "0.56s" } as CSSProperties}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="size-4 rounded border-neutral-300 accent-[#74c157]"
              />
              I agree with the Terms of Use and Privacy Policy
            </label>

            <button
              type="submit"
              className="c-r-rise inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#74c157] hover:text-black"
              style={{ "--d": "0.64s" } as CSSProperties}
            >
              Send Your Message
              <Send className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
