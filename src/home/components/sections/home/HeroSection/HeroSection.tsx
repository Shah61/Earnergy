import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@home/components/ui/icons";
import { ROUTES } from "@home/constants/routes";

const reveal = (delay: string): CSSProperties => ({ "--d": delay } as CSSProperties);

function VideoBanner() {
  return (
    <section className="video-band" aria-label="Showreel">
      <div className="video-stage">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/animation5-poster.webp"
        >
          <source src="/animation6.mp4" type="video/mp4" />
        </video>
        <div className="video-curtain" aria-hidden="true" />
        <img
          src="/logo.webp"
          alt=""
          className="video-watermark"
          aria-hidden="true"
          decoding="async"
        />
      </div>
    </section>
  );
}

export function HeroSection() {
  return (
    <main className="hero">
      <div className="wrap hero-grid">
        <div className="hero-left">
          <p className="eyebrow reveal" style={reveal(".45s")}>
            Smart Products
          </p>
          <p className="lead reveal" style={reveal(".58s")}>
            Built on purposeful ingredients, practical benefits, and everyday
            convenience, Earnergy creates food and beverage products designed for
            smarter modern living.
          </p>
          <Link to={ROUTES.products} className="cta reveal" style={reveal(".72s")}>
            Explore Products
            <ArrowRightIcon />
          </Link>
        </div>

        <div className="hero-right">
          <h1 className="headline">
            <span className="l1 reveal" style={reveal(".1s")}>
              Smarter Choices
            </span>
            <span className="l2 reveal" style={reveal(".35s")}>
              For Everyday Energy
            </span>
          </h1>
          <p className="hero-copy reveal" style={reveal(".6s")}>
            We develop functional snacks and beverages that combine taste,
            convenience, and better-for-you ingredients to support busy
            lifestyles.
          </p>
        </div>
      </div>

      <VideoBanner />
    </main>
  );
}
