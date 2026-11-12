"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { CompanyGallery } from "@/components/company-gallery";

const archive = [
  {
    year: "2018",
    title: "The beginning in Hunan.",
    text: "The company profile records the establishment of Hunan LONGCHI in Pingjiang, Hunan, with a focus on lighting and smart applications.",
    image: "/images/company/facility.webp",
    alt: "Manufacturing facility exterior supplied with the Hunan LONGCHI company profile",
    caption: "Company profile · Supplied facility photography",
    fit: "cover",
  },
  {
    year: "2023",
    title: "A documented milestone.",
    text: "The archived high-tech enterprise certificate names the Hunan company and carries an issue date of 8 December 2023.",
    image: "/images/company-story/high-tech-certificate.webp",
    alt: "Archived high-tech enterprise certificate naming Hunan LONGCHI, issued 8 December 2023",
    caption: "Archived certificate · Hunan company",
    fit: "contain",
  },
  {
    year: "2025",
    title: "Meeting the industry.",
    text: "Company exhibition materials include the 15th China International Road Traffic Security Products Expo in Wuhan.",
    image: "/images/company-story/exhibition.webp",
    alt: "LONGCHI exhibition display from the supplied company archive",
    caption: "Exhibition photography · Company archive",
    fit: "cover",
  },
] as const;

const workshop = [
  {
    label: "Assembly",
    title: "Lighting, taking shape.",
    text: "People, prepared components and lighting products at assembly workstations. A closer view of the work behind the manufacturing profile.",
    image: "/images/factory-assembly.webp",
    alt: "People assembling lighting products along Hunan LONGCHI workstations",
    detail: "Assembly workstations",
  },
  {
    label: "Production floor",
    title: "A view along the line.",
    text: "Materials and products in progress on the manufacturing floor. Discuss the model, configuration and supply scope for your own project.",
    image: "/images/factory-line.webp",
    alt: "Supplied photograph of the Hunan LONGCHI lighting production line",
    detail: "Manufacturing floor",
  },
  {
    label: "Lighting checks",
    title: "Look at the details.",
    text: "Connected luminaires and illuminated benches show the lighting checks visible in the company photography. Request documents for the exact equipment being proposed.",
    image: "/images/company/testing.webp",
    alt: "LED street lights connected and illuminated on production benches",
    detail: "Connected lighting equipment",
  },
] as const;

function tabKeys(
  e: KeyboardEvent<HTMLButtonElement>,
  index: number,
  count: number,
  prefix: string,
  select: (next: number) => void,
) {
  let next: number;
  if (e.key === "ArrowRight") next = (index + 1) % count;
  else if (e.key === "ArrowLeft") next = (index + count - 1) % count;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = count - 1;
  else return;
  e.preventDefault();
  select(next);
  document.getElementById(`${prefix}-${next}`)?.focus();
}

export function CompanyArchive() {
  const [active, setActive] = useState(0);
  const item = archive[active];
  return (
    <section className="company-history story-section company-archive" id="history" aria-labelledby="company-archive-title">
      <div className="container">
        <div className="archive-heading">
          <h2 id="company-archive-title">The LONGCHI archive.</h2>
          <p>Selected moments from the Hunan company story.</p>
        </div>
        <div className="archive-layout">
          <div className="archive-narrative">
            <div className="archive-years" role="tablist" aria-label="Company archive years">
              {archive.map((entry, i) => (
                <button type="button" role="tab" id={`archive-year-${i}`} key={entry.year}
                  aria-selected={active === i} aria-controls="archive-panel" tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)} onKeyDown={e => tabKeys(e, i, archive.length, "archive-year", setActive)}>
                  {entry.year}
                </button>
              ))}
            </div>
            <div className="archive-copy" id="archive-panel" role="tabpanel" aria-labelledby={`archive-year-${active}`} tabIndex={0}>
              <div className="archive-copy-inner" key={item.year}>
                <span className="archive-year" aria-hidden="true">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
            <a className="archive-link" href="/about/">Meet the company <ArrowUpRight size={20} aria-hidden="true" /></a>
          </div>
          <figure className={`archive-visual archive-visual-${item.fit}`}>
            {item.fit === "contain" ? (
              <svg key={item.image} viewBox="0 0 1800 1232" role="img" aria-label={item.alt} className="archive-document">
                <image href={item.image} width="1232" height="1800" transform="translate(0 1232) rotate(-90)" />
              </svg>
            ) : (
              <img key={item.image} src={item.image} alt={item.alt} width="1600" height="1000" loading="lazy" />
            )}
            <figcaption>{item.caption}</figcaption>
          </figure>
        </div>
        <p className="archive-source">These historical materials refer to Hunan LONGCHI. International enquiries are handled by Shenzhen Longchi Smart Technology Co., Ltd.</p>
      </div>
    </section>
  );
}

export function FactoryExperience() {
  const [active, setActive] = useState(0);
  const item = workshop[active];
  return (
    <section className="factory-story story-section workshop-experience" id="factory" aria-labelledby="workshop-title">
      <div className="container">
        <div className="workshop-heading">
          <div><p className="story-label">Hunan LONGCHI manufacturing</p><h2 id="workshop-title">Inside the workshop.</h2></div>
          <a className="story-link" href="/contact/?topic=company-profile">Discuss the manufacturing profile <ArrowUpRight size={20} aria-hidden="true" /></a>
        </div>
        <div className="workshop-stage">
          <div className="workshop-image-frame">
            {workshop.map((entry, i) => (
              <img key={entry.image} className={active === i ? "is-current" : ""} src={entry.image}
                alt={active === i ? entry.alt : ""} aria-hidden={active !== i} width="1600" height="1000" loading="lazy" />
            ))}
            <CompanyGallery currentImage={item.image} />
          </div>
          <div className="workshop-information" id="workshop-panel" role="tabpanel" aria-labelledby={`workshop-view-${active}`} tabIndex={0}>
            <div key={item.label} className="workshop-copy">
              <p>{item.detail}</p><h3>{item.title}</h3><p>{item.text}</p>
            </div>
            <div className="workshop-view-controls" role="group" aria-label="Workshop photographs">
              <span className="sr-only" role="status">Workshop view: {item.label}</span>
              <span aria-hidden="true">{active + 1} / {workshop.length}</span>
              <button type="button" aria-label="Previous workshop view" onClick={() => setActive((active + workshop.length - 1) % workshop.length)}><ArrowLeft size={21} aria-hidden="true" /></button>
              <button type="button" aria-label="Next workshop view" onClick={() => setActive((active + 1) % workshop.length)}><ArrowRight size={21} aria-hidden="true" /></button>
            </div>
          </div>
        </div>
        <div className="workshop-tabs" role="tablist" aria-label="Explore the workshop">
          {workshop.map((entry, i) => (
            <button type="button" role="tab" id={`workshop-view-${i}`} key={entry.label}
              aria-controls="workshop-panel" aria-selected={active === i} tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)} onKeyDown={e => tabKeys(e, i, workshop.length, "workshop-view", setActive)}>
              <strong>{entry.label}</strong><ArrowUpRight size={20} aria-hidden="true" />
            </button>
          ))}
        </div>
        <p className="workshop-source">Original photography supplied in the Hunan LONGCHI company materials.</p>
      </div>
    </section>
  );
}
