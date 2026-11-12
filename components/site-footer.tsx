"use client";
import { ArrowUpRight, Mail } from "lucide-react";
import { site, solutions } from "@/content/site";
import { directContact } from "@/content/contact";
import {
  SocialLinks,
  WeChatButton,
  WhatsAppIcon,
} from "@/components/contact-tools";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <a href="/" className="brand">
            <img
              src="/images/logo.png"
              width="1774"
              height="887"
              alt="LONGCHI SMART"
            />
          </a>
          <p>
            Lighting. Traffic. Parking. Access.
            <br />
            Built around your project.
          </p>
          <a className="text-link" href={`mailto:${site.email}`}>
            <Mail size={17} aria-hidden="true" />
            {site.email}
          </a>
        </div>
        <div>
          <h2>Our solutions</h2>
          {solutions.map((s) => (
            <a key={s.slug} href={`/solutions/${s.slug}/`}>
              {s.name}
            </a>
          ))}
        </div>
        <div>
          <h2>Explore</h2>
          <a href="/">Home</a>
          <a href="/products/">Products</a>
          <a href="/about/">About LONGCHI</a>
          <a href="/resources/">Technical resources</a>
          <a href="/contact/">
            Project enquiries <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-contact">
          <h2>Let’s talk</h2>
          <div className="footer-contact-channels">
            <a
              href={directContact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={20} />
              <span>WhatsApp</span>
            </a>
            <WeChatButton />
          </div>
          <a href={`tel:+${site.whatsapp}`}>{site.phone}</a>
          <SocialLinks />
          <p>{site.address}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <small>
          © {new Date().getFullYear()} {site.legalName}
        </small>
        <div>
          <a href="/privacy/">Privacy notice</a>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event("open-cookie-settings"))
            }
          >
            Cookie settings
          </button>
        </div>
      </div>
    </footer>
  );
}
