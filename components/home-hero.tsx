"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Lightbulb,
  Route,
  CarFront,
  ScanLine,
  Check,
} from "lucide-react";
import { solutions } from "@/content/site";
import { solutionVisuals } from "@/content/visuals";
const icons = [Lightbulb, Route, CarFront, ScanLine];
export function HomeHero() {
  const [selected, setSelected] = useState(0);
  const s = solutions[selected];
  const visual = solutionVisuals[s.slug];
  return (
    <section className="v2-hero">
      <div className="container v2-hero-main">
        <div className="v2-hero-copy">
          <div className="v2-kicker">
            <span />
            Equipment for the places we share
          </div>
          <h1>
            Lighting. Traffic.
            <br />
            Parking. Access.
          </h1>
          <p className="v2-hero-lede">
            Four product lines.
            <br />
            Built around your project.
          </p>
          <p className="v2-hero-description">
            Find equipment for roads, car parks and controlled entrances. Start
            with your application. We’ll help define the right configuration.
          </p>
          <div className="v2-hero-actions">
            <a className="button v2-primary" href="/contact/">
              Get a project quote <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a className="text-link" href="#solutions">
              Explore our range <ArrowRight size={19} aria-hidden="true" />
            </a>
          </div>
          <div className="v2-hero-assurance">
            <span>
              <Check size={15} aria-hidden="true" />
              Model-specific specifications
            </span>
            <span>
              <Check size={15} aria-hidden="true" />
              Project configuration support
            </span>
          </div>
        </div>
        <div className="v2-hero-visual">
          <div className="v2-hero-photo">
            <img
              key={visual.scene}
              src={visual.scene}
              alt={visual.alt}
              width="1536"
              height="1024"
              fetchPriority="high"
            />
            <span className="v2-scene-note">Illustrative application</span>
          </div>
          <div className="v2-visual-card" aria-live="polite">
            <div>
              <span>{s.name}</span>
              <h2>{visual.title}</h2>
              <p>{visual.detail}</p>
            </div>
            <a href={`/solutions/${s.slug}/`} aria-label={`Explore ${s.name}`}>
              <ArrowUpRight size={25} aria-hidden="true" />
            </a>
          </div>
          <div className="v2-yellow-corner" aria-hidden="true" />
        </div>
      </div>
      <div
        className="container v2-hero-tabs"
        role="tablist"
        aria-label="Explore four product lines"
      >
        {solutions.map((solution, i) => {
          const Icon = icons[i];
          return (
            <button
              key={solution.slug}
              type="button"
              role="tab"
              id={`solution-tab-${i}`}
              tabIndex={selected === i ? 0 : -1}
              aria-selected={selected === i}
              aria-controls="solution-visual-panel"
              onClick={() => setSelected(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const n = (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                  setSelected(n);
                  document.getElementById(`solution-tab-${n}`)?.focus();
                }
              }}
            >
              <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <strong>{solution.name}</strong>
                <span>{solution.label}</span>
              </div>
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          );
        })}
      </div>
      <div
        id="solution-visual-panel"
        role="tabpanel"
        aria-labelledby={`solution-tab-${selected}`}
        className="sr-only"
      >
        {s.name}: {visual.detail}
      </div>
    </section>
  );
}
