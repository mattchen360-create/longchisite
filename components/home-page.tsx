import { ArrowUpRight, Check } from "lucide-react";
import { site, solutions, products } from "@/content/site";
import { ProductCard } from "@/components/product-card";
import { EnquiryForm } from "@/components/enquiry-form";
import { HomeHero } from "@/components/solution-atlas";
import { HomeSolutions } from "@/components/home-solutions";
export function HomePage() {
  return (
    <main id="main-content">
      <HomeHero />
      <HomeSolutions />
      <section className="project-approach section v2-approach">
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
              From requirements.
              <br />
              To the right equipment.
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
            <h2>Compare the details. Choose with confidence.</h2>
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
            Let’s talk about
            <br />
            your next project.
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
