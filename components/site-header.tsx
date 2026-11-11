"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { solutions } from "@/content/site";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const campaign = path.startsWith("/lp/");
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a href="/" className="brand" aria-label="LONGCHI SMART home">
            <img
              src="/images/logo.png"
              alt="LONGCHI SMART"
              width="1774"
              height="887"
            />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {campaign ? (
              <a href="#explore">Explore solutions</a>
            ) : (
              <>
                <div className="nav-group">
                  <a href="/solutions/">
                    Our solutions <span aria-hidden="true">⌄</span>
                  </a>
                  <div className="nav-dropdown">
                    {solutions.map((s) => (
                      <a key={s.slug} href={`/solutions/${s.slug}/`}>
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
                <a href="/products/">Products</a>
                <a href="/about/">About us</a>
                <a href="/resources/">Resources</a>
              </>
            )}
          </nav>
          <a
            className="button button-small header-cta"
            href={campaign ? "#enquire" : "/contact/"}
          >
            Discuss your project <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          {!campaign && (
            <button
              className="mobile-menu-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={23} /> : <Menu size={23} />}
            </button>
          )}
        </div>
        {open && !campaign && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {solutions.map((s) => (
              <a
                key={s.slug}
                href={`/solutions/${s.slug}/`}
                onClick={() => setOpen(false)}
              >
                {s.name}
              </a>
            ))}
            <a href="/products/">All products</a>
            <a href="/about/">About us</a>
            <a href="/resources/">Resources</a>
            <a href="/contact/">Contact</a>
          </nav>
        )}
      </header>
    </>
  );
}
