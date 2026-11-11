import { ArrowUpRight, Check, ArrowDown, MessageSquare } from "lucide-react";
import { products, type Solution } from "@/content/site";
import { ProductCard } from "@/components/product-card";
import { EnquiryForm } from "@/components/enquiry-form";
export function SolutionPage({
  solution: s,
  campaign = false,
}: {
  solution: Solution;
  campaign?: boolean;
}) {
  const models = products.filter((p) => p.category === s.slug);
  return (
    <main
      id="main-content"
      className={`solution-page ${campaign ? "landing-page" : ""}`}
    >
      <section className="container solution-hero">
        <div>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/solutions/">Solutions</a>
            <span>/</span>
            <span aria-current="page">{s.name}</span>
          </nav>
          <span className="eyebrow">{s.name}</span>
          <h1>
            {s.headline.split("\n").map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p>{s.description}</p>
          <div className="hero-actions">
            <a href="#enquire" className="button">
              Discuss your {s.shortName.toLowerCase()} project{" "}
              <ArrowUpRight size={17} />
            </a>
            <a href="#explore" className="text-link">
              Explore the options <ArrowDown size={16} />
            </a>
          </div>
        </div>
        <div className={`solution-hero-image image-${s.slug}`}>
          <img
            src={s.image}
            alt={s.imageAlt}
            width="1200"
            height="1200"
            fetchPriority="high"
          />
          <div className="image-caption">{s.label}</div>
        </div>
      </section>
      <section className="application-strip">
        <div className="container">
          {s.applications.map((a) => (
            <span key={a}>
              <Check size={15} aria-hidden="true" />
              {a}
            </span>
          ))}
        </div>
      </section>
      <section className="section container" id="explore">
        <div className="section-intro">
          <div>
            <span className="eyebrow">Plan the right configuration</span>
            <h2>Start with the application.</h2>
          </div>
          <p>{s.intro}</p>
        </div>
        <div className="option-grid">
          {s.options.map((o, i) => (
            <article key={o.title}>
              <div className="option-mark" aria-hidden="true" />
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </article>
          ))}
        </div>
      </section>
      {models.length > 0 ? (
        <section className="section catalog-section">
          <div className="container">
            <div className="section-intro">
              <div>
                <span className="eyebrow">Compare the equipment</span>
                <h2>Explore the current models.</h2>
              </div>
              <p>
                Review model-specific information.
                <br />
                Confirm the final configuration in your quotation.
              </p>
            </div>
            <div className="products-grid">
              {models.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="section catalog-section">
          <div className="container category-equipment">
            <div className="category-equipment-images">
              {s.slug === "smart-parking" ? (
                <>
                  <img
                    src="/images/parking-payment.webp"
                    width="1200"
                    height="1200"
                    alt="Parking payment station"
                    loading="lazy"
                  />
                  <img
                    src="/images/parking-anpr.webp"
                    width="900"
                    height="900"
                    alt="Vehicle recognition terminal"
                    loading="lazy"
                  />
                </>
              ) : (
                <img
                  src="/images/access-systems.webp"
                  width="1500"
                  height="600"
                  alt={s.imageAlt}
                  loading="lazy"
                />
              )}
            </div>
            <div>
              <span className="eyebrow">Configured to your brief</span>
              <h2>
                Define the system.
                <br />
                Then select the equipment.
              </h2>
              <p>
                Tell us your workflow, site layout and integration needs.
                Request model documents and a configuration proposal for your
                project.
              </p>
              <a href="#enquire" className="text-link">
                Request your equipment proposal <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
      )}
      <section className="section container project-brief">
        <div>
          <span className="eyebrow">Before you choose</span>
          <h2>
            A few details
            <br />
            make a better brief.
          </h2>
          <p>
            You do not need to have every answer. Start with the information you
            have.
          </p>
        </div>
        <ul>
          {s.planning.map((p, i) => (
            <li key={p}>
              <span>0{i + 1}</span>
              {p}
              <Check size={18} aria-hidden="true" />
            </li>
          ))}
        </ul>
      </section>
      <section className="section faq-section">
        <div className="container faq-grid">
          <div>
            <span className="eyebrow">Useful answers</span>
            <h2>
              Questions
              <br />
              before the quote?
            </h2>
            <MessageSquare size={30} strokeWidth={1.4} aria-hidden="true" />
          </div>
          <div>
            {s.questions.map((q) => (
              <details key={q.q}>
                <summary>
                  {q.q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{q.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section id="enquire" className="section container enquiry-section">
        <div className="enquiry-intro">
          <span className="eyebrow">
            Your {s.shortName.toLowerCase()} project
          </span>
          <h2>
            Let’s work out
            <br />
            the next step.
          </h2>
          <p>
            Share your location and requirements. We will review the equipment
            and configuration you need.
          </p>
          <div className="enquiry-lines">
            {s.applications.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
        </div>
        <EnquiryForm category={s.slug} />
      </section>
      <div className="mobile-sticky-cta">
        <a href="#enquire">
          Discuss your project <ArrowUpRight size={17} />
        </a>
      </div>
    </main>
  );
}
