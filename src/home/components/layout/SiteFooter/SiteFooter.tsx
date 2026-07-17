import { Link } from "react-router-dom";
import {
  FOOTER_ADDRESS,
  FOOTER_EMAIL,
  FOOTER_PHONE,
  FOOTER_SERVICES,
  FOOTER_SITEMAP,
  FOOTER_SOCIAL,
} from "@home/constants/footer";
import { SITE_LOGO, SITE_NAME } from "@home/constants/navigation";
import { SocialIcon } from "@home/components/ui/icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div className="footer-brand">
          <Link className="footer-logo" to="/" aria-label={`${SITE_NAME} home`}>
            <img
              src={SITE_LOGO}
              alt={SITE_NAME}
              width={2482}
              height={788}
              decoding="async"
            />
          </Link>
          <address className="footer-address">
            <span>{FOOTER_ADDRESS.line1}</span>
            <span>{FOOTER_ADDRESS.line2}</span>
          </address>
          <div className="footer-social">
            {FOOTER_SOCIAL.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                target="_blank"
                rel="noreferrer"
              >
                <SocialIcon name={item.label} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-block">
            <p className="footer-label">Phone Number</p>
            <a className="footer-value" href={`tel:${FOOTER_PHONE.replace(/\s/g, "")}`}>
              {FOOTER_PHONE}
            </a>
          </div>
          <div className="footer-block">
            <p className="footer-label">Our Services</p>
            <ul className="footer-links">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-block">
            <p className="footer-label">Email Us</p>
            <a className="footer-value" href={`mailto:${FOOTER_EMAIL}`}>
              {FOOTER_EMAIL}
            </a>
          </div>
          <div className="footer-block">
            <p className="footer-label">Our Site Map</p>
            <ul className="footer-links">
              {FOOTER_SITEMAP.map((item) => (
                <li key={item.label}>
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <p>© Copyright {SITE_NAME}, {year}. All rights reserved.</p>
      </div>
    </footer>
  );
}
