"use client";
import { useState, type KeyboardEvent } from "react";
import { solutions } from "@/content/site";
import { solutionVisuals } from "@/content/visuals";
import { track } from "@/lib/tracking";

const slides = [
  {
    title: "Lighting for\nroads and\nshared spaces.",
    text: "LED street lighting, outdoor spaces and the details that make a project work.",
    cta: "Explore lighting",
    position: "68% center",
  },
  {
    title: "Radar signs\nand roadside\nsystems.",
    text: "Compare radar speed displays, vehicle capture and roadside warning equipment.",
    cta: "Explore traffic safety",
    position: "76% center",
  },
  {
    title: "Parking systems.\nFrom entrance\nto exit.",
    text: "Plan parking entrances around your vehicle flow, recognition and operating needs.",
    cta: "Explore parking",
    position: "60% center",
  },
  {
    title: "Access control\nfor buildings\nand sites.",
    text: "Pedestrian gates, identity terminals and access requirements, considered together.",
    cta: "Explore access control",
    position: "center",
  },
];

export function HomeBanner() {
  const [active, setActive] = useState(0);
  const s = solutions[active],
    slide = slides[active],
    visual = solutionVisuals[s.slug];
  function select(i: number) {
    setActive(i);
    track("explore_product_line", {
      product_line: solutions[i].slug,
      placement: "home_banner",
    });
  }
  function keyboard(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next: number;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft")
      next = (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 3;
    else return;
    e.preventDefault();
    select(next);
    document.getElementById(`banner-tab-${next}`)?.focus();
  }
  return (
    <section className="home-banner" aria-label="LONGCHI product line banner">
      <div
        className="banner-stage"
        id="banner-panel"
        role="tabpanel"
        aria-labelledby={`banner-tab-${active}`}
        tabIndex={0}
      >
        <div className="banner-copy">
          <p className="banner-category">LONGCHI SMART / {s.name}</p>
          <h1>
            {slide.title.split("\n").map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className="banner-description">{slide.text}</p>
          <div className="banner-actions">
            <a className="button" href={`/solutions/${s.slug}/`}>
              {slide.cta}
            </a>
            <a className="banner-company-link" href="/about/">
              Meet LONGCHI
            </a>
          </div>
        </div>
        <figure className="banner-image">
          <img
            src={visual.scene}
            alt={visual.alt}
            width="1536"
            height="1024"
            fetchPriority="high"
            style={{ objectPosition: slide.position }}
          />
          <figcaption>Application illustration</figcaption>
        </figure>
      </div>
      <div className="banner-selector">
        <div className="container">
          <span>Explore our product lines</span>
          <div role="tablist" aria-label="Banner product lines">
            {solutions.map((v, i) => (
              <button
                type="button"
                role="tab"
                key={v.slug}
                id={`banner-tab-${i}`}
                aria-selected={active === i}
                aria-controls="banner-panel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => keyboard(e, i)}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
