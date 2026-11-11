"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { solutions } from "@/content/site";
export function SiteHeader() {
  const path = usePathname(),
    campaign = path.startsWith("/lp/");
  const [mega, setMega] = useState(false),
    [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null),
    trigger = useRef<HTMLButtonElement>(null),
    panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!mega) return;
    const outside = (e: PointerEvent) => {
      if (!(e.target as Element).closest(".prem-menu-group")) setMega(false);
    };
    document.addEventListener("pointerdown", outside);
    const close = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && !document.querySelector("dialog[open]")) {
        setMega(false);
        trigger.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [mega]);
  function closeDrawer() {
    drawer.current?.close();
    setOpen(false);
  }
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header
        className={`site-header prem-site-header ${scrolled ? "is-scrolled" : ""}`}
      >
        <div className="container header-inner">
          <a href="/" className="brand" aria-label="LONGCHI SMART home">
            <img
              src="/images/logo.png"
              alt="LONGCHI SMART"
              width="1774"
              height="887"
            />
          </a>
          <nav
            className="desktop-nav prem-main-nav"
            aria-label="Main navigation"
          >
            <a href="/" aria-current={path === "/" ? "page" : undefined}>
              Home
            </a>
            {campaign ? (
              <a href="#explore">Explore solutions</a>
            ) : (
              <>
                <div
                  className="prem-menu-group"
                  onBlur={(e) => {
                    if (
                      !e.currentTarget.contains(e.relatedTarget as Node | null)
                    )
                      setMega(false);
                  }}
                >
                  <button
                    className="prem-menu-trigger"
                    type="button"
                    ref={trigger}
                    aria-expanded={mega}
                    aria-controls="prem-solutions-menu"
                    onClick={() => setMega((v) => !v)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setMega(true);
                        requestAnimationFrame(() =>
                          panel.current
                            ?.querySelector<HTMLAnchorElement>("a")
                            ?.focus(),
                        );
                      }
                    }}
                  >
                    Solutions
                    <ChevronDown size={15} aria-hidden="true" />
                  </button>
                  {mega && (
                    <div
                      className="prem-mega"
                      id="prem-solutions-menu"
                      ref={panel}
                    >
                      <div className="container prem-mega-inner">
                        <div className="prem-mega-intro">
                          <span>Built around your site</span>
                          <h2>
                            Where does your
                            <br />
                            project begin?
                          </h2>
                          <a href="/solutions/" onClick={() => setMega(false)}>
                            All solutions
                            <ArrowUpRight size={18} aria-hidden="true" />
                          </a>
                        </div>
                        <div className="prem-mega-lines">
                          {solutions.map((s) => (
                            <a
                              href={`/solutions/${s.slug}/`}
                              key={s.slug}
                              onClick={() => setMega(false)}
                            >
                              <img
                                src={s.image}
                                alt=""
                                width="180"
                                height="150"
                                loading="lazy"
                              />
                              <strong>{s.name}</strong>
                              <span>{s.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <a
                  href="/products/"
                  aria-current={
                    path.startsWith("/products") ? "page" : undefined
                  }
                >
                  Products
                </a>
                <a
                  href="/about/"
                  aria-current={path.startsWith("/about") ? "page" : undefined}
                >
                  Company
                </a>
                <a
                  href="/resources/"
                  aria-current={
                    path.startsWith("/resources") ? "page" : undefined
                  }
                >
                  Resources
                </a>
              </>
            )}
          </nav>
          <a
            className="mobile-home-link"
            href="/"
            aria-label="Home"
            aria-current={path === "/" ? "page" : undefined}
          >
            Home
          </a>
          <a
            className="button button-small header-cta"
            href={campaign ? "#enquire" : "/contact/"}
          >
            Discuss a project
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          {!campaign && (
            <button
              className="mobile-menu-toggle"
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="prem-mobile-menu"
              onClick={() => {
                drawer.current?.showModal();
                setOpen(true);
              }}
            >
              <Menu size={23} aria-hidden="true" />
            </button>
          )}
        </div>
      </header>
      <dialog
        className="prem-mobile-drawer"
        id="prem-mobile-menu"
        ref={drawer}
        aria-label="Mobile navigation"
        onClose={() => setOpen(false)}
      >
        <div className="prem-drawer-head">
          <img
            src="/images/logo.png"
            alt="LONGCHI SMART"
            width="150"
            height="75"
          />
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeDrawer}
            autoFocus
          >
            <X size={25} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          <a className="prem-drawer-home" href="/" onClick={closeDrawer}>
            Home
          </a>
          <p>Solutions</p>
          {solutions.map((s) => (
            <a
              href={`/solutions/${s.slug}/`}
              key={s.slug}
              onClick={closeDrawer}
            >
              {s.name}
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          ))}
          <div className="prem-drawer-secondary">
            <a href="/products/" onClick={closeDrawer}>
              Products
            </a>
            <a href="/about/" onClick={closeDrawer}>
              Company
            </a>
            <a href="/resources/" onClick={closeDrawer}>
              Resources
            </a>
          </div>
          <a className="button" href="/contact/" onClick={closeDrawer}>
            Discuss your project
          </a>
        </nav>
      </dialog>
    </>
  );
}
