import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/content/site";
import { solutionVisuals } from "@/content/visuals";
export function HomeSolutions() {
  return (
    <section id="solutions" className="section container v2-solution-section">
      <div className="v2-section-heading">
        <div>
          <span className="eyebrow">Four product lines</span>
          <h2>
            The right equipment.
            <br />
            For the way your site works.
          </h2>
        </div>
        <p>
          From street lighting to the entrance gate.
          <br />
          Explore each line, compare the options,
          <br />
          and bring us your project requirements.
        </p>
      </div>
      <div className="v2-solution-grid">
        {solutions.map((s) => {
          const v = solutionVisuals[s.slug];
          return (
            <article className="v2-solution-tile" key={s.slug}>
              <a className="v2-tile-image" href={`/solutions/${s.slug}/`}>
                <img
                  src={v.scene}
                  alt={v.alt}
                  width="1536"
                  height="1024"
                  loading="lazy"
                />
                <span className="v2-tile-tag">{s.label}</span>
                <span className="v2-tile-arrow">
                  <ArrowUpRight size={23} aria-hidden="true" />
                </span>
              </a>
              <div className="v2-tile-body">
                <div>
                  <h3>
                    <a href={`/solutions/${s.slug}/`}>{s.name}</a>
                  </h3>
                  <p>{v.detail}</p>
                </div>
                <a
                  href={`/solutions/${s.slug}/`}
                  className="v2-tile-product"
                  aria-label={`View ${s.name} equipment`}
                >
                  <img
                    src={s.image}
                    width="180"
                    height="180"
                    alt={s.imageAlt}
                    loading="lazy"
                  />
                </a>
              </div>
            </article>
          );
        })}
      </div>
      <p className="v2-illustration-note">
        Application scenes are illustrative. Equipment and configuration are
        confirmed for your project.
      </p>
    </section>
  );
}
