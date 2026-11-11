"use client";
import { useState, type KeyboardEvent } from "react";
import { ArrowUpRight, ArrowRight, Lightbulb, Route, CarFront, ScanLine, Plus, Check, X, Layers } from "lucide-react";
import { solutions } from "@/content/site";
import { track } from "@/lib/tracking";

const icons = [Lightbulb, Route, CarFront, ScanLine];
const zones = [
  { x: 29, y: 64, title: "After sunset. Still in view.", text: "Explore LED luminaires for roads, outdoor parking and the spaces between buildings.", equipment: "LED street lighting", tag: "LC-LED-AB80", detail: "Compare power, optics and installation requirements." },
  { x: 91, y: 30, title: "A clearer signal on the road.", text: "Compare speed feedback displays and camera-equipped radar systems for your application.", equipment: "Radar speed feedback", tag: "LC-JTP-LD01", detail: "Define display, speed units and power supply." },
  { x: 64, y: 65, title: "Arrive. Park. Move on.", text: "Plan the equipment around your parking entrance, vehicle flow and operating requirements.", equipment: "Parking equipment", tag: "Barrier equipment", detail: "Confirm barriers, recognition and entry workflow." },
  { x: 32, y: 45, title: "Every entrance has a purpose.", text: "Discuss pedestrian gates, identity terminals and the access workflow your site needs.", equipment: "Pedestrian access", tag: "Equipment range", detail: "Select gate format and confirm integration scope." },
];

export function HomeHero() {
  const [active, setActive] = useState(0);
  const [brief, setBrief] = useState<string[]>([]);
  const s = solutions[active];
  const zone = zones[active];
  const included = brief.includes(s.slug);
  const briefHref = brief.length ? `/contact/?category=${brief.length === 1 ? brief[0] : "multiple"}&lines=${brief.join(",")}` : "/contact/";
  function choose(i: number) {
    setActive(i);
    track("explore_product_line", { product_line: solutions[i].slug });
  }
  function toggle(slug: string) {
    setBrief((current) => current.includes(slug) ? current.filter((v) => v !== slug) : [...current, slug]);
  }
  function navigateTabs(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next: number;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") next = (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 3;
    else return;
    e.preventDefault(); choose(next);
    document.getElementById(`atlas-tab-${next}`)?.focus();
  }
  return (
    <section className="atlas-hero" aria-label="Explore LONGCHI equipment">
      <div className="container">
        <div className="atlas-intro">
          <div>
            <p className="atlas-label"><span aria-hidden="true" /> Equipment for the places we share</p>
            <h1>One place.<br /><span>Four possibilities.</span></h1>
          </div>
          <div className="atlas-intro-side">
            <p>Lighting. Traffic. Parking. Access.<br />Explore the equipment around your site.<br />Build a brief around what you need.</p>
            <a className="button atlas-quote" href="/contact/">Discuss your project <ArrowUpRight size={19} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="atlas-workspace">
          <div className="atlas-tabs" role="tablist" aria-label="Choose a product line">
            {solutions.map((solution, i) => {
              const Icon = icons[i];
              return <button type="button" key={solution.slug} role="tab" id={`atlas-tab-${i}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} aria-controls="atlas-product-panel" onClick={() => choose(i)} onKeyDown={(e) => navigateTabs(e, i)}>
                <Icon size={21} strokeWidth={1.7} aria-hidden="true" /><span>{solution.name}</span><span className="atlas-tab-dot" aria-hidden="true" />
              </button>;
            })}
          </div>
          <div className="atlas-display">
            <div className={`atlas-scene atlas-zone-${active}`}>
              <img src="/images/redesign/campus-atlas.webp" alt="Illustrative architectural model showing road lighting, a roadside display, a parking barrier and pedestrian gates around an office campus" width="1536" height="1024" fetchPriority="high" />
              <div className="atlas-scene-caption"><span className="atlas-caption-line" aria-hidden="true" /><span>Explore a smarter site</span><small>Select a hotspot</small></div>
              {solutions.map((solution, i) => {
                const Icon = icons[i];
                return <button type="button" className={`atlas-pin ${active === i ? "is-active" : ""}`} key={solution.slug} style={{ left: `${zones[i].x}%`, top: `${zones[i].y}%` }} aria-label={`Explore ${solution.name} on the campus`} aria-pressed={active === i} onClick={() => choose(i)}>
                  <span className="atlas-pin-core"><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span><span className="atlas-pin-name">{solution.shortName}</span>
                </button>;
              })}
              <p className="atlas-disclaimer">Illustrative concept · Equipment shown separately</p>
            </div>
            <div className="atlas-product-panel" id="atlas-product-panel" role="tabpanel" aria-labelledby={`atlas-tab-${active}`} tabIndex={0}>
              <div key={s.slug} className="atlas-product-content">
                <p className="atlas-panel-label">{s.label}</p>
                <h2>{zone.title}</h2>
                <p className="atlas-panel-description">{zone.text}</p>
                <a className="atlas-equipment" href={`/solutions/${s.slug}/`} aria-label={`View ${zone.equipment}`}>
                  <img src={s.image} alt={s.imageAlt} width="260" height="230" />
                  <span>{zone.tag}<ArrowUpRight size={17} aria-hidden="true" /></span>
                </a>
                <p className="atlas-equipment-note">{zone.detail}</p>
                <a className="text-link atlas-range-link" href={`/solutions/${s.slug}/`}>Explore {s.shortName.toLowerCase()} <ArrowRight size={17} aria-hidden="true" /></a>
              </div>
              <button type="button" className={`atlas-add ${included ? "is-added" : ""}`} aria-pressed={included} onClick={() => toggle(s.slug)}>{included ? <Check size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}{included ? "Added to your brief" : "Add to project brief"}</button>
            </div>
          </div>
          <div className="atlas-brief">
            <div className="atlas-brief-label"><Layers size={19} aria-hidden="true" /><div><strong>Your project brief</strong><span aria-live="polite">{brief.length ? `${brief.length} product ${brief.length === 1 ? "line" : "lines"} selected` : "Select one line, or combine several."}</span></div></div>
            <div className="atlas-brief-chips">{brief.map((slug) => {
              const line = solutions.find((v) => v.slug === slug)!;
              return <button key={slug} type="button" aria-label={`Remove ${line.name} from brief`} onClick={() => toggle(slug)}>{line.shortName}<X size={13} aria-hidden="true" /></button>;
            })}</div>
            <a href={briefHref} className="atlas-brief-action" onClick={() => track("open_project_brief", { product_lines: brief.join(",") || "general" })}>{brief.length ? "Continue with this brief" : "Start your project"}<ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="atlas-footer-note"><span>From the road to the front door.</span><a href="#solutions">Discover the four product lines <ArrowRight size={15} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
