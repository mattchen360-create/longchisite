"use client";
import { ArrowUpRight } from "lucide-react";
import { applications } from "@/content/home";
import { solutions } from "@/content/site";
import { track } from "@/lib/tracking";

export function HomeApplications() {
  const ordered = [
    applications[1],
    applications[0],
    applications[2],
    applications[3],
  ];
  return (
    <section
      className="application-atlas prem-chapter"
      id="applications"
      aria-labelledby="applications-title"
    >
      <div className="container">
        <div className="prem-chapter-heading">
          <div>
            <p className="prem-label">Places we plan around</p>
            <h2 id="applications-title">
              Every site has
              <br />
              its own rhythm.
            </h2>
          </div>
          <p>
            Explore the places behind the equipment.
            <br />
            Bring your application into the project brief.
          </p>
        </div>
        <div className="application-atlas-grid">
          {ordered.map((app, i) => (
            <article
              className={`application-atlas-card application-atlas-card-${i}`}
              key={app.slug}
            >
              <a
                href={`/contact/?application=${app.slug}&lines=${app.lines.join(",")}`}
                aria-describedby={`application-description-${app.slug}`}
                onClick={() =>
                  track("open_application_brief", { application: app.slug })
                }
              >
                <img
                  src={app.scene}
                  alt={app.alt}
                  width="1536"
                  height="1024"
                  loading="lazy"
                />
                <div className="application-atlas-copy">
                  <h3>{app.name}</h3>
                  {i === 0 && <p>{app.description}</p>}
                  <span className="application-atlas-lines">
                    {app.lines
                      .map(
                        (slug) =>
                          solutions.find((s) => s.slug === slug)?.shortName,
                      )
                      .join(" / ")}
                  </span>
                  <span className="application-atlas-action">
                    Plan this application
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </span>
                </div>
                <p
                  id={`application-description-${app.slug}`}
                  className="sr-only"
                >
                  {app.questions.join(". ")}
                </p>
              </a>
            </article>
          ))}
        </div>
        <p className="application-atlas-note">
          Application scenes are illustrative. Equipment and any system
          connections are reviewed for your project.
        </p>
      </div>
    </section>
  );
}
