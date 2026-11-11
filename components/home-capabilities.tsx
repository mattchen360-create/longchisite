"use client";
import { useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Check, Wrench, Factory, Users } from "lucide-react";
import { companyCapabilities } from "@/content/company";
const icons = [Wrench, Factory, Users];
export function HomeCapabilities() {
  const [active, setActive] = useState(1);
  const current = companyCapabilities[active];
  function keyNav(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let n: number;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft")
      n = (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = 2;
    else return;
    e.preventDefault();
    setActive(n);
    document.getElementById(`capability-tab-${n}`)?.focus();
  }
  return (
    <section
      className="home-capabilities home-chapter"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="container">
        <div className="home-chapter-heading">
          <div>
            <span className="eyebrow">Inside LONGCHI</span>
            <h2 id="capabilities-title">
              Practical expertise.
              <br />
              Visible in the work.
            </h2>
          </div>
          <p>
            Technical workspaces. Lighting production.
            <br />
            People bringing the details together.
          </p>
        </div>
        <div
          className="capability-tabs"
          role="tablist"
          aria-label="Company capabilities"
        >
          {companyCapabilities.map((c, i) => {
            const Icon = icons[i];
            return (
              <button
                type="button"
                role="tab"
                id={`capability-tab-${i}`}
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                aria-controls="capability-panel"
                key={c.key}
                onClick={() => setActive(i)}
                onKeyDown={(e) => keyNav(e, i)}
              >
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                {c.name}
              </button>
            );
          })}
        </div>
        <div
          className="capability-feature"
          id="capability-panel"
          role="tabpanel"
          aria-labelledby={`capability-tab-${active}`}
          tabIndex={0}
        >
          <figure>
            <img
              src={current.image}
              alt={current.alt}
              width="1600"
              height={active === 1 ? 738 : 900}
              loading="lazy"
            />
            <figcaption>{current.caption}</figcaption>
          </figure>
          <div className="capability-copy" key={current.key}>
            <h3>{current.title}</h3>
            <p>{current.description}</p>
            <ul>
              {current.points.map((p) => (
                <li key={p}>
                  <Check size={15} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <a className="text-link" href={current.link}>
              {current.action}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <p className="company-entity-note">
          Facility and workspace photography: Hunan LONGCHI company materials.
          International enquiries: Shenzhen Longchi Smart Technology Co., Ltd.
        </p>
      </div>
    </section>
  );
}
