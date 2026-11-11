import { ArrowUpRight, Check } from "lucide-react";
import { solutions, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About LONGCHI SMART",
  "Meet LONGCHI SMART and explore our project approach across smart lighting, traffic safety, smart parking and access control.",
  "/about/",
);
export default function About() {
  return (
    <main id="main-content">
      <section className="container section">
        <div className="page-heading">
          <span className="eyebrow">About LONGCHI SMART</span>
          <h1>
            Practical technology.
            <br />A project-focused approach.
          </h1>
          <p>
            We bring together four product lines to help you define equipment
            requirements for roads, parking areas, entrances and managed spaces.
          </p>
        </div>
        <img
          src="/images/factory-assembly.webp"
          width="1600"
          height="738"
          alt="Lighting assembly work at the manufacturing facility"
          className="about-hero-image"
        />
        <div className="about-grid section">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2>
              From the application
              <br />
              to the equipment.
            </h2>
          </div>
          <div>
            <p>
              {site.legalName} supports international project enquiries across
              lighting, traffic safety, parking and access control.
            </p>
            <p>
              Our starting point is your application. We discuss installation
              conditions, operating requirements and integration needs, then
              help define the products and configuration to review.
            </p>
            <p>
              Ask us for the model documents, project-specific information and
              commercial scope you need to make an informed decision.
            </p>
            <a href="/contact/" className="text-link" style={{ marginTop: 25 }}>
              Talk to the team <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <section className="section spec-section">
        <div className="container approach-grid">
          <div>
            <span className="eyebrow">A clear project brief</span>
            <h2>The details matter.</h2>
            <p style={{ marginTop: 24, fontSize: 14 }}>
              Different sites need different answers. Before you commit to
              equipment, review the configuration and confirm what is included.
            </p>
            <ul className="check-list">
              <li>
                <Check /> Model-specific specifications
              </li>
              <li>
                <Check /> Installation and operating requirements
              </li>
              <li>
                <Check /> Requested documents and integration scope
              </li>
              <li>
                <Check /> Quotation, supply scope and commercial terms
              </li>
            </ul>
          </div>
          <div className="approach-image">
            <img
              src="/images/factory-line.webp"
              width="1200"
              height="900"
              loading="lazy"
              alt="Lighting assembly production line"
            />
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-intro">
          <div>
            <span className="eyebrow">Four product lines</span>
            <h2>Find where your project starts.</h2>
          </div>
        </div>
        <div className="option-grid">
          {solutions.map((s) => (
            <a
              key={s.slug}
              href={`/solutions/${s.slug}/`}
              className="resource-item"
            >
              <div>
                <h3>{s.name}</h3>
                <p>{s.label}</p>
              </div>
              <ArrowUpRight size={22} />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
