"use client";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/content/site";
import { track } from "@/lib/tracking";
const equipmentNames = [
  "LC-LED-AB80",
  "LC-JTP-LD01",
  "Parking equipment",
  "Access equipment",
];
export function PremiumHero() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const s = solutions[active];
  function select(i: number) {
    setActive(i);
    track("explore_product_line", {
      product_line: solutions[i].slug,
      placement: "premium_hero",
    });
  }
  function keys(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let n: number;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft")
      n = (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = 3;
    else return;
    e.preventDefault();
    select(n);
    document.getElementById(`prem-hero-tab-${n}`)?.focus();
  }
  function pointer(e: PointerEvent<HTMLDivElement>) {
    if (
      e.pointerType !== "mouse" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const r = e.currentTarget.getBoundingClientRect(),
      x = ((e.clientX - r.left) / r.width - 0.5) * 2,
      y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      stage.current?.style.setProperty("--pointer-x", String(x));
      stage.current?.style.setProperty("--pointer-y", String(y));
    });
  }
  function reset() {
    cancelAnimationFrame(frame.current);
    stage.current?.style.setProperty("--pointer-x", "0");
    stage.current?.style.setProperty("--pointer-y", "0");
  }
  return (
    <section className="prem-hero" aria-label="LONGCHI SMART introduction">
      <div
        className="prem-hero-stage"
        ref={stage}
        onPointerMove={pointer}
        onPointerLeave={reset}
      >
        <img
          className="prem-hero-scene"
          src="/images/premium/blue-hour-campus.webp"
          width="1914"
          height="822"
          fetchPriority="high"
          alt="Illustrative blue-hour campus with illuminated roads and a modern building entrance"
        />
        <div className="prem-hero-shade" aria-hidden="true" />
        <div className="prem-hero-content container">
          <p className="prem-hero-context">
            Lighting. Traffic. Parking. Access.
          </p>
          <h1>
            <span>Built for</span>
            <span>smarter places.</span>
          </h1>
          <p className="prem-hero-intro">
            Equipment, technical detail and project support.
            <br />
            From the road to the building entrance.
          </p>
          <div className="prem-hero-actions">
            <a className="button" href="#solutions">
              Explore our solutions{" "}
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a href="/contact/" className="prem-white-link">
              Discuss a project
            </a>
          </div>
        </div>
        <div
          className="prem-hero-product"
          id="prem-hero-panel"
          role="tabpanel"
          aria-labelledby={`prem-hero-tab-${active}`}
        >
          <p>{s.name}</p>
          <a
            href={`/solutions/${s.slug}/`}
            aria-label={`Explore ${s.name} equipment`}
          >
            <img
              key={s.slug}
              src={s.image}
              alt={s.imageAlt}
              width="300"
              height="230"
            />
            <div>
              <strong>{equipmentNames[active]}</strong>
              <ArrowUpRight size={20} aria-hidden="true" />
            </div>
          </a>
        </div>
        <span className="prem-hero-illustration">Illustrative application</span>
      </div>
      <div className="prem-hero-choices">
        <div
          className="container"
          role="tablist"
          aria-label="Banner product lines"
        >
          {solutions.map((v, i) => (
            <button
              type="button"
              role="tab"
              id={`prem-hero-tab-${i}`}
              key={v.slug}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              aria-controls="prem-hero-panel"
              onClick={() => select(i)}
              onKeyDown={(e) => keys(e, i)}
            >
              <strong>{v.shortName}</strong>
              <span>{v.label}</span>
              <ArrowUpRight size={21} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
