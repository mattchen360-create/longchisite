"use client";
import { useState } from "react";
import { applications } from "@/content/home";
import { projectCountries, projectSchedules } from "@/content/project-planner";
import { solutions } from "@/content/site";
import { track } from "@/lib/tracking";

export function ProjectPlanner() {
  const [application, setApplication] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [country, setCountry] = useState("");
  const [schedule, setSchedule] = useState("");
  const chosen = applications.find((a) => a.slug === application);
  const params = new URLSearchParams();
  if (chosen) params.set("application", chosen.slug);
  if (lines.length) {
    params.set("category", lines.length === 1 ? lines[0] : "multiple");
    params.set("lines", lines.join(","));
  }
  if (country) params.set("country", country);
  if (schedule) params.set("schedule", schedule);
  function chooseApplication(value: string) {
    setApplication(value);
    const a = applications.find((v) => v.slug === value);
    if (a) setLines([...a.lines]);
  }
  return (
    <section
      className="home-project-planner home-chapter"
      id="project-planner"
      aria-labelledby="planner-title"
    >
      <div className="container">
        <div className="home-chapter-heading">
          <div>
            <span className="eyebrow">Your project, in focus</span>
            <h2 id="planner-title">
              Build a clearer
              <br />
              project brief.
            </h2>
          </div>
          <p>
            Choose a starting point. Adjust what you need.
            <br />
            Take the details into a conversation with LONGCHI.
          </p>
        </div>
        <div className="planner-layout">
          <div className="planner-controls">
            <label>
              <span id="planner-application-label">Application</span>
              <select
                aria-labelledby="planner-application-label"
                value={application}
                onChange={(e) => chooseApplication(e.target.value)}
              >
                <option value="">Not sure yet / choose later</option>
                {applications.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
            <fieldset>
              <legend>Product lines</legend>
              <p>
                An application suggests product lines. Adjust them for your
                site.
              </p>
              <div className="planner-lines">
                {solutions.map((s) => (
                  <label key={s.slug}>
                    <input
                      type="checkbox"
                      checked={lines.includes(s.slug)}
                      onChange={() =>
                        setLines((current) =>
                          current.includes(s.slug)
                            ? current.filter((v) => v !== s.slug)
                            : [...current, s.slug],
                        )
                      }
                    />
                    {s.name}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="planner-field-pair">
              <label>
                <span id="planner-country-label">Project country</span>
                <select
                  aria-labelledby="planner-country-label"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Other / choose later</option>
                  {projectCountries.slice(0, -1).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label>
                <span id="planner-schedule-label">Planned timing</span>
                <select
                  aria-labelledby="planner-schedule-label"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                >
                  <option value="">Choose later</option>
                  {projectSchedules.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="planner-summary">
            <span>Enquiry overview</span>
            <h3>{chosen?.name || "Your next project"}</h3>
            <dl>
              <div>
                <dt>Equipment areas</dt>
                <dd>
                  {lines.length
                    ? solutions
                        .filter((s) => lines.includes(s.slug))
                        .map((s) => s.name)
                        .join(", ")
                    : "Choose at least one product line to start."}
                </dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{country || "To be confirmed"}</dd>
              </div>
              <div>
                <dt>Timing</dt>
                <dd>{schedule || "To be confirmed"}</dd>
              </div>
            </dl>
            {lines.length ? (
              <a
                className="button"
                href={`/contact/?${params}`}
                onClick={() =>
                  track("open_project_brief", {
                    product_lines: lines.join(","),
                    application: application || "unspecified",
                  })
                }
              >
                Continue to enquiry
              </a>
            ) : (
              <button type="button" className="button" disabled>
                Continue to enquiry
              </button>
            )}
            <p>
              You can edit the brief and add quantities or site details on the
              next page. Equipment compatibility is reviewed for your project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
