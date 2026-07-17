import { useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, BrandMark } from "@home/components/ui/icons";
import { ROUTES } from "@home/constants/routes";
import { SERVICES } from "@home/constants/services";

const reveal = (delay: string): CSSProperties => ({ "--d": delay } as CSSProperties);

function ServiceArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServicesSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayIndex = hoveredIndex ?? selectedIndex;
  const display = displayIndex !== null ? SERVICES[displayIndex] : null;

  return (
    <section className="services" aria-labelledby="services-tag">
      <div className="wrap services-inner">
        <div className="services-head">
          <p className="tag r2" id="services-tag" style={reveal(".05s")}>
            <span>Our Services</span>
          </p>
          <h2 className="headline">
            <span className="l1 r2" style={reveal(".1s")}>
            Smart Products For Everyday Living
            </span>
            <span className="l2 r2" style={reveal(".3s")}>
            Crafted For Better Snacking & Daily Energy
            </span>
          </h2>
        </div>

        <div className="services-body">
          <div className="svc-preview-col">
            <div
              className={`svc-preview${displayIndex !== null ? " active" : ""}`}
              aria-hidden="true"
            >
              {display?.image ? (
                <img src={display.image} alt={display.title} />
              ) : (
                <span className="ph">
                  <BrandMark />
                  <b>{display?.number ?? "01"}</b>
                </span>
              )}
            </div>
          </div>

          <ul className="svc-list">
            {SERVICES.map((service, index) => {
              const isSelected = selectedIndex === index;
              const isHovered = hoveredIndex === index;

              return (
                <li
                  key={service.number}
                  className={`svc-row${isSelected ? " is-selected" : ""}${isHovered ? " is-hovered" : ""}`}
                >
                  <div
                    className="svc-row-inner r2"
                    style={reveal(service.revealDelay)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isSelected}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                    onClick={() => setSelectedIndex(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedIndex(index);
                      }
                    }}
                  >
                    <span className="svc-no">({service.number})</span>
                    <span className="svc-title">{service.title}</span>
                    <span className="svc-arrow" aria-hidden="true">
                      <ServiceArrowIcon />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="svc-more r2" style={reveal(".1s")}>
          <Link to={ROUTES.products} className="cta">
            Explore Products
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
