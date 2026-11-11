import {
  ArrowUpRight,
  ArrowDown,
  MoveRight,
  Check,
  Route,
  CarFront,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";
import { site, solutions, products } from "@/content/site";
import { SolutionCard } from "@/components/solution-card";
import { ProductCard } from "@/components/product-card";
import { EnquiryForm } from "@/components/enquiry-form";
export function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero container">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span />
            Connected thinking. Practical solutions.
          </div>
          <h1>
            Smarter spaces.
            <br />
            From the road
            <br />
            to the entrance.
          </h1>
          <p>
            Lighting, traffic safety, parking and access control.
            <br className="desktop-break" /> Four product lines. Your project at
            the centre.
          </p>
          <div className="hero-actions">
            <a href="/solutions/" className="button">
              Find your solution <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href="/contact/" className="text-link">
              Talk to our team <MoveRight size={18} aria-hidden="true" />
            </a>
          </div>
          <a className="hero-scroll" href="#solutions">
            <ArrowDown size={16} aria-hidden="true" /> Explore the four product
            lines
          </a>
        </div>
        <div className="hero-stage" aria-label="LONGCHI product lines">
          <div className="stage-line" />
          <div className="stage-label stage-label-top">
            <Lightbulb size={15} aria-hidden="true" /> Illuminate
          </div>
          <div className="stage-main">
            <img
              src="/images/led-ab80.webp"
              alt="LONGCHI LED street light"
              width="1200"
              height="1200"
              fetchPriority="high"
            />
          </div>
          <div className="stage-radar">
            <img
              src="/images/radar-ld01.webp"
              alt="LONGCHI radar speed feedback sign"
              width="1200"
              height="1200"
              fetchPriority="high"
            />
          </div>
          <div className="stage-parking">
            <img
              src="/images/parking-barrier.webp"
              alt="Vehicle parking barrier"
              width="900"
              height="900"
            />
          </div>
          <div className="stage-label stage-label-bottom">
            <CarFront size={15} aria-hidden="true" /> Welcome
          </div>
          <div className="stage-note">
            <span className="stage-note-dot" />
            Designed around real places.
          </div>
        </div>
      </section>
      <div className="pillar-strip">
        <div className="container">
          {[
            { icon: Lightbulb, text: "Smart lighting" },
            { icon: Route, text: "Traffic safety" },
            { icon: CarFront, text: "Smart parking" },
            { icon: ShieldCheck, text: "Access control" },
          ].map((v, i) => (
            <a href={`/solutions/${solutions[i].slug}/`} key={v.text}>
              <v.icon size={21} aria-hidden="true" />
              <span>{v.text}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <section id="solutions" className="section container">
        <div className="section-intro">
          <div>
            <span className="eyebrow">Our solutions</span>
            <h2>
              Every part of your site.
              <br />
              Considered together.
            </h2>
          </div>
          <p>
            Start with the challenge you need to solve.
            <br />
            Explore the equipment, define the requirements,
            <br />
            and build a clear project brief with us.
          </p>
        </div>
        <div className="solutions-grid">
          {solutions.map((s) => (
            <SolutionCard key={s.slug} solution={s} />
          ))}
        </div>
      </section>
      <section className="project-approach section">
        <div className="container approach-grid">
          <div className="approach-image">
            <img
              src="/images/factory-assembly.webp"
              width="1600"
              height="738"
              alt="Staff working on lighting assembly at the manufacturing facility"
              loading="lazy"
            />
            <span>From requirements to equipment.</span>
          </div>
          <div className="approach-copy">
            <span className="eyebrow">The project comes first</span>
            <h2>
              Less guesswork.
              <br />A better starting point.
            </h2>
            <p>
              Choosing equipment starts with understanding the place it needs to
              work. Share your layout, operating conditions and priorities. We
              will help turn those details into a practical equipment
              discussion.
            </p>
            <ul className="check-list">
              <li>
                <Check aria-hidden="true" /> Discuss the application and
                installation
              </li>
              <li>
                <Check aria-hidden="true" /> Compare models and configuration
                options
              </li>
              <li>
                <Check aria-hidden="true" /> Confirm the documents your project
                needs
              </li>
            </ul>
            <a href="/about/" className="text-link">
              Meet LONGCHI SMART <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-intro">
          <div>
            <span className="eyebrow">Inside the range</span>
            <h2>A closer look at the equipment.</h2>
          </div>
          <a href="/products/" className="text-link">
            Explore products <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="products-grid home-products">
          {[products[0], products[3], products[5]].map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
      <section className="section process-section">
        <div className="container">
          <div className="section-intro">
            <div>
              <span className="eyebrow">A clear way forward</span>
              <h2>
                From your idea
                <br />
                to a defined project.
              </h2>
            </div>
            <p>
              Whether you are specifying one product line
              <br />
              or several, start with what your site needs.
            </p>
          </div>
          <div className="process-grid">
            {[
              {
                title: "Tell us about your site",
                text: "Share the application, location, quantity and any drawings or requirements.",
              },
              {
                title: "Review the right options",
                text: "Discuss suitable products, configuration choices and the documentation required.",
              },
              {
                title: "Confirm the project scope",
                text: "Agree on selected models, supply scope and commercial details in your quotation.",
              },
            ].map((step, i) => (
              <div key={step.title} className="process-step">
                <span>0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container enquiry-section" id="enquire">
        <div className="enquiry-intro">
          <span className="eyebrow">Let’s build the brief</span>
          <h2>
            Your next project
            <br />
            starts with a conversation.
          </h2>
          <p>
            One product line or a complete site requirement. Tell us what you
            are planning.
          </p>
          <a href={`mailto:${site.email}`} className="text-link">
            {site.email} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <div className="enquiry-lines">
            {solutions.map((s) => (
              <span key={s.slug}>{s.name}</span>
            ))}
          </div>
        </div>
        <EnquiryForm />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.legalName,
            brand: site.name,
            url: site.origin,
            email: site.email,
            telephone: site.phone,
            logo: `${site.origin}/images/logo.png`,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
