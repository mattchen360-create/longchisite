"use client";
import { useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { applications } from "@/content/home";
import { solutions } from "@/content/site";
import { track } from "@/lib/tracking";

export function HomeApplications() {
  const [active, setActive] = useState(0);
  const app = applications[active];
  function select(index: number) {
    setActive(index);
    track("explore_application", { application: applications[index].slug });
  }
  function keyNav(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let n: number;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft")
      n = (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = 3;
    else return;
    e.preventDefault();
    select(n);
    document.getElementById(`application-tab-${n}`)?.focus();
  }
  return (
    <section
      className="home-applications home-chapter"
      id="applications"
      aria-labelledby="applications-title"
    >
      <div className="container">
        <div className="home-chapter-heading">
          <div>
            <span className="eyebrow">Around your application</span>
            <h2 id="applications-title">
              Different places.
              <br />A considered approach.
            </h2>
          </div>
          <p>
            Start with how your site works.
            <br />
            Then bring the right questions to the table.
          </p>
        </div>
        <div
          className="application-tabs"
          role="tablist"
          aria-label="Explore applications"
        >
          {applications.map((v, i) => (
            <button
              type="button"
              role="tab"
              key={v.slug}
              id={`application-tab-${i}`}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              aria-controls="application-panel"
              onClick={() => select(i)}
              onKeyDown={(e) => keyNav(e, i)}
            >
              {v.name}
            </button>
          ))}
        </div>
        <div
          className="application-feature"
          id="application-panel"
          role="tabpanel"
          aria-labelledby={`application-tab-${active}`}
          tabIndex={0}
        >
          <figure>
            <img
              src={app.scene}
              alt={app.alt}
              width="1536"
              height="1024"
              loading="lazy"
            />
            <figcaption>Illustrative application</figcaption>
          </figure>
          <div className="application-copy" key={app.slug}>
            <h3>{app.title}</h3>
            <p>{app.description}</p>
            <div className="application-lines">
              {app.lines.map((slug) => (
                <a href={`/solutions/${slug}/`} key={slug}>
                  {solutions.find((s) => s.slug === slug)?.shortName}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              ))}
            </div>
            <h4>What to consider</h4>
            <ul>
              {app.questions.map((q) => (
                <li key={q}>
                  <Check size={14} aria-hidden="true" />
                  {q}
                </li>
              ))}
            </ul>
            <a
              className="text-link"
              href={`/contact/?application=${app.slug}&lines=${app.lines.join(",")}`}
            >
              Discuss a project like this{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
