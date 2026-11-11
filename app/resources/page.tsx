import { products } from "@/content/site";
import { DownloadLink } from "@/components/download-link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Technical Resources & Specifications",
  "Download supplied model specifications and request the documents you need for your lighting, traffic, parking or access project.",
  "/resources/",
);
export default function Resources() {
  return (
    <main id="main-content" className="container section">
      <div className="page-heading">
        <span className="eyebrow">Technical resources</span>
        <h1>
          The details
          <br />
          behind the equipment.
        </h1>
        <p>
          Review the supplied model specifications. For a project-specific
          configuration or additional documentation, ask our team.
        </p>
      </div>
      <div className="resource-list">
        {products
          .filter((p) => p.download)
          .map((p) => (
            <article className="resource-item" key={p.slug}>
              <img
                src={p.image}
                width="120"
                height="120"
                alt={p.model}
                loading="lazy"
              />
              <div>
                <h2>
                  <a href={`/products/${p.slug}/`}>{p.model}</a>
                </h2>
                <p>
                  {p.title} ·{" "}
                  {p.download!.endsWith("pdf") ? "PDF" : "Word document"}
                </p>
              </div>
              <DownloadLink href={p.download!} model={p.model} />
            </article>
          ))}
      </div>
      <aside className="resource-note">
        <h2 style={{ fontSize: 26 }}>Need something specific?</h2>
        <p>
          Tell us the model, destination country and documents you need.
          Availability and applicability will be confirmed for the equipment
          proposed.
        </p>
        <a className="text-link" href="/contact/">
          Request project documents <ArrowUpRight size={17} />
        </a>
      </aside>
    </main>
  );
}
