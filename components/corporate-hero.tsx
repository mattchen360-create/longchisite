"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { bannerSlides } from "@/content/banner";

export function CorporateHero({
  activeSlide,
  onSlideChange,
}: { activeSlide?: number; onSlideChange?: (index: number) => void } = {}) {
  const [internal, setInternal] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  const active = activeSlide ?? internal,
    slide = bannerSlides[active];
  function select(index: number) {
    const next = (index + bannerSlides.length) % bannerSlides.length;
    setInternal(next);
    onSlideChange?.(next);
  }
  function keys(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let n: number;
    if (e.key === "ArrowRight") n = (i + 1) % 4;
    else if (e.key === "ArrowLeft") n = (i + 3) % 4;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = 3;
    else return;
    e.preventDefault();
    select(n);
    document.getElementById(`home-banner-tab-${n}`)?.focus();
  }
  return (
    <section
      className="home-carousel"
      aria-label="LONGCHI highlights"
      aria-roledescription="carousel"
    >
      <div
        className="home-carousel-stage"
        id="home-banner-panel"
        role="tabpanel"
        aria-labelledby={`home-banner-tab-${active}`}
        aria-live="polite"
        onTouchStart={(e) => {
          const t = e.touches[0];
          start.current = { x: t.clientX, y: t.clientY };
        }}
        onTouchEnd={(e) => {
          const t = e.changedTouches[0],
            s = start.current;
          start.current = null;
          if (s) {
            const x = t.clientX - s.x,
              y = t.clientY - s.y;
            if (Math.abs(x) > 55 && Math.abs(x) > Math.abs(y) * 1.4)
              select(active + (x < 0 ? 1 : -1));
          }
        }}
      >
        <img
          key={slide.image}
          className="home-carousel-image"
          src={slide.image}
          alt={slide.alt}
          width="1914"
          height="1000"
          fetchPriority="high"
        />
        <div className="home-carousel-shade" aria-hidden="true" />
        <div className="container home-carousel-copy">
          <p>{slide.label}</p>
          <h1>
            {slide.title[0]}
            <br />
            {slide.title[1]}
          </h1>
          <p className="home-carousel-description">{slide.description}</p>
          <div className="home-carousel-actions">
            <a href={slide.href} className="button">
              {slide.action}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href="/contact/">Talk to our team</a>
          </div>
        </div>
        <span className="home-carousel-caption">{slide.caption}</span>
      </div>
      <div className="home-carousel-controls">
        <div className="container">
          <div
            className="home-carousel-tabs"
            role="tablist"
            aria-label="Choose a banner"
          >
            {bannerSlides.map((s, i) => (
              <button
                type="button"
                role="tab"
                id={`home-banner-tab-${i}`}
                key={s.label}
                aria-selected={active === i}
                aria-controls="home-banner-panel"
                aria-label={`Banner ${i + 1}: ${s.label}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => keys(e, i)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{s.label}</strong>
              </button>
            ))}
          </div>
          <div
            className="home-carousel-arrows"
            role="group"
            aria-label="Banner navigation"
          >
            <button
              type="button"
              aria-label="Previous banner"
              onClick={() => select(active - 1)}
            >
              <ArrowLeft size={21} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next banner"
              onClick={() => select(active + 1)}
            >
              <ArrowRight size={21} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
