import type { CSSProperties } from "react";
import { GALLERY_ITEMS } from "@home/constants/gallery";
import { useGalleryCarousel } from "@home/hooks";

const reveal = (delay: string): CSSProperties => ({ "--d": delay } as CSSProperties);

const GALLERY_TOTAL = String(GALLERY_ITEMS.length).padStart(2, "0");

export function GallerySection() {
  const { sectionRef, trackRef, prevRef, nextRef, curRef } = useGalleryCarousel();

  return (
    <section className="gallery" aria-labelledby="gallery-tag" ref={sectionRef}>
      <div className="wrap gallery-inner">
        <div className="gallery-head">
          <p className="tag r2" id="gallery-tag" style={reveal(".05s")}>
            <span>Our Gallery</span>
          </p>
          <p className="g-count r2" style={reveal(".1s")}>
            ( <span className="g-cur" ref={curRef}>01</span> /{" "}
            <span className="g-tot">{GALLERY_TOTAL}</span> )
          </p>
          <div className="g-nav r2" style={reveal(".15s")}>
            <button
              type="button"
              className="g-btn prev"
              ref={prevRef}
              aria-label="Previous images"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 6l-6 6 6 6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="g-btn next"
              ref={nextRef}
              aria-label="Next images"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="gtrack-wrap r2g">
          <div className="gallery-track" id="gtrack" ref={trackRef}>
            {GALLERY_ITEMS.map((item) => (
              <figure key={item.src} className="g-card">
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
