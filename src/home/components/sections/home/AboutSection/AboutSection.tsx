import type { CSSProperties } from "react";
import { BrandMark } from "@home/components/ui/icons";

const reveal = (delay: string): CSSProperties => ({ "--d": delay } as CSSProperties);

export function AboutSection() {
  return (
    <section className="about" aria-labelledby="about-tag">
      <div className="wrap about-inner">
        <BrandMark className="about-mark" useSymbol />

        <div className="about-row about-intro">
          <div className="col-label">
            <p className="tag r2" id="about-tag" style={reveal(".05s")}>
              <span>About Us</span>
            </p>
          </div>
          <div className="col-body">
            <p className="statement r2" style={reveal(".12s")}>
              <span className="ink">
                Earnergy is a consumer product brand focused on creating smart,
                accessible food and beverage solutions for everyday routines.
              </span>
              <span className="dim">
                From functional snacks to energizing drinks, our products are
                crafted to deliver enjoyable taste, practical benefits, and a
                more mindful way to snack and recharge.
              </span>
            </p>
            <div className="stats r2" style={reveal(".24s")}>
              <div className="stat">
                <div className="stat-num">
                  <span className="count" data-count="2">
                    2
                  </span>
                  <span className="unit">LINES</span>
                </div>
                <p className="stat-cap">Functional product categories</p>
              </div>
              <div className="stat">
                <div className="stat-num">
                  <span className="count" data-count="10" data-suffix="+">
                    10+
                  </span>
                  <span className="unit">INGREDIENTS</span>
                </div>
                <p className="stat-cap">Purposeful ingredients across our products</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-row">
          <div className="col-label">
            <h2 className="vm-label r2" style={reveal(".05s")}>
              <span className="ink">Our</span> <span className="dim">Vision</span>
            </h2>
          </div>
          <div className="col-body">
            <h3 className="vm-title r2" style={reveal(".12s")}>
              Creating Smarter Everyday Choices
            </h3>
            <p className="vm-text r2" style={reveal(".2s")}>
              We envision Earnergy as a trusted lifestyle brand that helps people
              make better choices without sacrificing taste or convenience.
              Through thoughtful product development, clean branding, and
              functional ingredients, we aim to make smarter snacking and daily
              energy more accessible to everyone.
            </p>
          </div>
        </div>

        <div className="about-row">
          <div className="col-label">
            <h2 className="vm-label r2" style={reveal(".05s")}>
              <span className="ink">Our</span> <span className="dim">Mission</span>
            </h2>
          </div>
          <div className="col-body">
            <h3 className="vm-title r2" style={reveal(".12s")}>
              Products With Purpose, Made For Real Life
            </h3>
            <p className="vm-text r2" style={reveal(".2s")}>
              Our mission is to create practical, enjoyable, and functional
              products that fit naturally into modern routines. We focus on
              combining quality ingredients, convenient formats, and clear
              benefits so customers can snack smarter, stay energized, and feel
              good about what they consume.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
