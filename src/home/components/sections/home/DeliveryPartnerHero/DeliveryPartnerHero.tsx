import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@home/constants/routes";

export function DeliveryPartnerHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* This section is below the fold. Instead of autoplaying (which forces the
     browser to download kofe2.mp4 on first paint), we hold off until the
     section is about to enter view, then load and play it. Purely a
     load-timing change — nothing about the visuals changes. */
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const start = () => {
      if (video.dataset.started) return;
      video.dataset.started = "true";
      video.load();
      void video.play().catch(() => undefined);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(section);

    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen w-full items-center justify-center bg-[#f5f5f5] px-4 py-16"
    >
      <div className="relative aspect-video w-full max-w-6xl overflow-hidden bg-black shadow-sm">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          poster="/kofe2-poster.webp"
        >
          <source src="kofe2.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

        <div
          className="absolute top-6 right-8 h-9 w-9 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
          <div className="max-w-4xl">
            <h1 className="overflow-hidden font-bold tracking-tight text-white uppercase">
              <span className="animate-text-reveal block translate-y-full text-[clamp(2rem,5vw,4.7rem)] leading-[0.95]">
              Let’s Build Smarter Everyday Choices With Earnergy
              </span>
              <span className="animate-text-reveal-delay block translate-y-full text-[clamp(2rem,5vw,4.7rem)] leading-[0.95] text-white/70">
              Better Snacking & Daily Energy
              </span>
            </h1>

            <p className="animate-fade-up-delay mx-auto mt-6 max-w-xl translate-y-6 text-sm leading-relaxed text-white/85 opacity-0 md:text-base">
            Whether you are interested in our products, distribution, retail placement, or collaboration, Earnergy is ready to bring functional snacks and beverages to more everyday consumers.
            </p>

            <Link
              to={ROUTES.products}
              className="animate-fade-up-delay-2 mx-auto mt-8 flex translate-y-6 items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black opacity-0 no-underline transition duration-300 hover:bg-white/90"
            >
              Explore Products
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
