"use client";
import {
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { bannerSlides } from "@/content/banner";

export function CorporateHero({
  activeSlide,
  onSlideChange,
}: { activeSlide?: number; onSlideChange?: (index: number) => void } = {}) {
  const [internal, setInternal] = useState(0);
  const [transition, setTransition] = useState<{
    previous: number | null;
    direction: number;
  }>({ previous: null, direction: 1 });
  const requestedDirection = useRef<number | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const active = activeSlide ?? internal,
    slide = bannerSlides[active];
  const last = useRef(active);
  useLayoutEffect(() => {
    if (last.current !== active) {
      setTransition({
        previous: last.current,
        direction:
          requestedDirection.current ?? (active > last.current ? 1 : -1),
      });
      last.current = active;
      requestedDirection.current = null;
    }
  }, [active]);
  function select(index: number) {
    const next = (index + bannerSlides.length) % bannerSlides.length;
    if (next === active) return;
    requestedDirection.current = index < active ? -1 : 1;
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
      data-direction={transition.direction < 0 ? "previous" : "next"}
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
        <div className="home-carousel-images">
          {bannerSlides.map((item, i) => (
            <div
              key={item.image}
              className={`home-carousel-image-layer ${i === active ? "is-current" : i === transition.previous ? "is-outgoing" : ""}`}
              aria-hidden={i !== active}
            >
              <img
                className="home-carousel-image"
                src={item.image}
                alt={i === active ? item.alt : ""}
                width="1914"
                height="1000"
                fetchPriority={i === 0 ? "high" : "low"}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
        <div className="home-carousel-shade" aria-hidden="true" />
        <div className="container home-carousel-copy" key={active}>
          <p>{slide.label}</p>
          <h1>
            <span className="home-carousel-line">
              <span>{slide.title[0]}</span>
            </span>
            <span className="home-carousel-line">
              <span>{slide.title[1]}</span>
            </span>
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
            <span
              className="home-carousel-indicator"
              aria-hidden="true"
              style={{ transform: `translateX(${active * 100}%)` }}
            />
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
