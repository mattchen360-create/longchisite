import {
  ArrowUpRight,
  ArrowRight,
  Check,
  MapPin,
  Globe2,
  FileCheck2,
  SlidersHorizontal,
  MessageSquare,
  Send,
} from "lucide-react";
import { site } from "@/content/site";
import { qualityReviews, projectSteps } from "@/content/company";

export function HomeChapterNav() {
  return (
    <nav className="home-chapter-nav" aria-label="Explore this page">
      <div className="container">
        <span>Explore LONGCHI</span>
        <div>
          {[
            ["company", "Company"],
            ["capabilities", "Capabilities"],
            ["solutions", "Solutions"],
            ["quality", "Quality"],
            ["resources", "Resources"],
            ["enquire", "Enquire"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function CompanyOverview() {
  return (
    <section
      className="home-company home-chapter container"
      id="company"
      aria-labelledby="company-title"
    >
      <div className="company-overview-grid">
        <div className="company-overview-copy">
          <span className="eyebrow">Meet LONGCHI SMART</span>
          <h2 id="company-title">
            The people.
            <br />
            The process.
            <br />
            The project ahead.
          </h2>
          <p>
            Good equipment is only part of the story. Get to know the technical
            work, lighting production and project conversations behind LONGCHI.
          </p>
          <p>
            Contact us in Shenzhen to discuss your international project.
            Explore our four product areas and take a closer look at the Hunan
            LONGCHI manufacturing profile.
          </p>
          <a className="text-link" href="/about/">
            Get to know the company{" "}
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
        <div className="company-overview-visual">
          <figure className="company-exterior">
            <img
              src="/images/company/facility.webp"
              alt="Hunan LONGCHI manufacturing facility entrance with blue-roofed buildings and LONGCHI signage"
              width="1600"
              height="720"
              loading="lazy"
            />
            <figcaption>
              Hunan LONGCHI · Manufacturing facility exterior
            </figcaption>
          </figure>
          <div className="company-identity">
            <div>
              <MapPin size={20} aria-hidden="true" />
              <span>International enquiries</span>
              <strong>Shenzhen, China</strong>
              <p>{site.legalName}</p>
            </div>
            <div>
              <span className="company-line-symbol" aria-hidden="true" />
              <span>Manufacturing profile</span>
              <strong>Hunan LONGCHI</strong>
              <p>
                Lighting design, production
                <br />
                and smart application development.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="company-discipline-strip">
        <p>
          From lighting hardware
          <br />
          to smart applications.
        </p>
        <span>Technical development</span>
        <span>Lighting assembly</span>
        <span>Project coordination</span>
        <a
          href="/contact/?topic=company-profile"
          aria-label="Request LONGCHI company information"
        >
          <ArrowUpRight size={25} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function HomeQuality() {
  return (
    <section
      className="home-quality home-chapter"
      id="quality"
      aria-labelledby="quality-title"
    >
      <div className="container home-quality-grid">
        <div className="quality-visual">
          <figure>
            <img
              src="/images/company/testing.webp"
              alt="Rows of LED street lights connected and illuminated on production benches"
              width="1440"
              height="1080"
              loading="lazy"
            />
            <figcaption>
              Lighting checks on the production line · Hunan LONGCHI materials
            </figcaption>
          </figure>
          <div className="quality-caption">
            <FileCheck2 size={26} strokeWidth={1.4} aria-hidden="true" />
            <p>
              Look at the process.
              <br />
              <strong>Then check the details.</strong>
            </p>
          </div>
        </div>
        <div className="quality-copy">
          <span className="eyebrow">Quality & documentation</span>
          <h2 id="quality-title">
            Confidence starts
            <br />
            with what you can review.
          </h2>
          <p>
            See lighting checks in the manufacturing profile. For your own
            project, review the specific equipment, configuration and supporting
            documents before an order.
          </p>
          <div className="quality-review-list">
            {qualityReviews.map((q) => (
              <article key={q.title}>
                <Check size={18} aria-hidden="true" />
                <div>
                  <h3>{q.title}</h3>
                  <p>{q.text}</p>
                </div>
              </article>
            ))}
          </div>
          <a href="/contact/?topic=quality-documents" className="text-link">
            Request quality documents{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function HomeCollaboration() {
  return (
    <section
      className="home-collaboration home-chapter container"
      id="collaboration"
      aria-labelledby="collaboration-title"
    >
      <div className="home-chapter-heading">
        <div>
          <span className="eyebrow">International project conversations</span>
          <h2 id="collaboration-title">
            Based in Shenzhen.
            <br />
            Focused on your site.
          </h2>
        </div>
        <p>
          Planning in Europe, North America or Australia?
          <br />
          Bring the local requirements into the brief.
        </p>
      </div>
      <div className="collaboration-layout">
        <div className="collaboration-board">
          <div className="collaboration-origin">
            <Globe2 size={30} strokeWidth={1.3} aria-hidden="true" />
            <div>
              <span>Start the conversation</span>
              <h3>LONGCHI SMART</h3>
              <p>Shenzhen, China</p>
            </div>
          </div>
          <div className="collaboration-destinations">
            <div>
              <strong>Europe</strong>
              <span>Destination and project documents</span>
            </div>
            <div>
              <strong>North America</strong>
              <span>Units, sign format and supply requirements</span>
            </div>
            <div>
              <strong>Australia</strong>
              <span>Site conditions and installation scope</span>
            </div>
          </div>
          <p className="collaboration-note">
            Project planning regions, shown for enquiry guidance.
          </p>
        </div>
        <div className="collaboration-services">
          {[
            {
              Icon: SlidersHorizontal,
              title: "Technical conversation",
              text: "Discuss the application, existing systems and the configuration you need.",
            },
            {
              Icon: FileCheck2,
              title: "Procurement clarity",
              text: "Confirm model documents, supply scope and commercial terms together.",
            },
            {
              Icon: MessageSquare,
              title: "Direct communication",
              text: "Reach the team by email, WhatsApp or a structured project enquiry.",
            },
          ].map(({ Icon, title, text }) => (
            <article key={title}>
              <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
          <a href="/contact/" className="text-link">
            Talk through your requirements{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function HomeProcess() {
  return (
    <section
      className="home-project-process home-chapter"
      id="process"
      aria-labelledby="process-title"
    >
      <div className="container">
        <div className="home-chapter-heading">
          <div>
            <span className="eyebrow">Working with LONGCHI</span>
            <h2 id="process-title">
              A clear path.
              <br />
              From brief to handover.
            </h2>
          </div>
          <a href="/contact/" className="text-link">
            Start the conversation <Send size={17} aria-hidden="true" />
          </a>
        </div>
        <ol className="home-process-steps">
          {projectSteps.map((s, i) => (
            <li key={s.title}>
              <span className="home-process-number">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <strong>{s.deliverable}</strong>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
