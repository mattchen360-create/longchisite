import { notFound } from "next/navigation";
import { ArrowUpRight, Download, Check } from "lucide-react";
import { products, getProduct, getSolution, site } from "@/content/site";
import { EnquiryForm } from "@/components/enquiry-form";
import { ProductCard } from "@/components/product-card";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  return p
    ? pageMetadata(`${p.model} ${p.title}`, p.summary, `/products/${slug}/`)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const s = getSolution(p.category)!;
  return (
    <main id="main-content">
      <div className="container">
        <nav
          className="breadcrumbs"
          style={{ paddingTop: 30, marginBottom: 0 }}
          aria-label="Breadcrumb"
        >
          <a href="/">Home</a>
          <span>/</span>
          <a href="/products/">Products</a>
          <span>/</span>
          <span aria-current="page">{p.model}</span>
        </nav>
        <section className="product-hero">
          <div className="product-hero-image">
            <img
              src={p.image}
              width="1200"
              height="1200"
              alt={`${p.model} ${p.title}`}
              fetchPriority="high"
            />
          </div>
          <div>
            <span className="eyebrow">{s.name}</span>
            <div className="product-model">{p.model}</div>
            <h1>{p.title}</h1>
            <p>{p.summary}</p>
            <ul className="check-list">
              {p.highlights.map((h) => (
                <li key={h}>
                  <Check size={16} aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="hero-actions">
              <a className="button" href="#enquire">
                Enquire about this model <ArrowUpRight size={17} />
              </a>
              {p.download && (
                <a className="text-link" href={p.download} download>
                  <Download size={16} /> Specifications
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
      <section className="section spec-section">
        <div className="container spec-layout">
          <div>
            <span className="eyebrow">Model-specific information</span>
            <h2>Technical overview.</h2>
            <p className="spec-note">
              Values are drawn from the supplied model specification. Final
              configuration, accessories and suitability for your country or
              application must be confirmed in your quotation.
            </p>
            {p.category === "traffic-safety" && (
              <p className="spec-note">
                Speed units, display format, installation and any approval
                requirements should be confirmed for the destination. Published
                speed ranges use the units in the supplied specification.
              </p>
            )}
          </div>
          <table>
            <caption className="sr-only">
              {p.model} technical specifications
            </caption>
            <tbody>
              {p.specs.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section id="enquire" className="section container enquiry-section">
        <div className="enquiry-intro">
          <span className="eyebrow">Your {p.model} project</span>
          <h2>
            Make this model
            <br />
            part of your plan.
          </h2>
          <p>
            Tell us your project country, quantity and installation needs. We
            will review the configuration and documents required.
          </p>
          {p.download && (
            <a href={p.download} download className="text-link">
              <Download size={17} /> Download the supplied specification
            </a>
          )}
        </div>
        <EnquiryForm category={p.category} model={p.model} />
      </section>
      <section className="section spec-section">
        <div className="container">
          <div className="section-intro">
            <div>
              <span className="eyebrow">Continue exploring</span>
              <h2>Other models to consider.</h2>
            </div>
            <a className="text-link" href={`/solutions/${s.slug}/`}>
              Explore {s.name.toLowerCase()} <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="products-grid">
            {products
              .filter(
                (other) =>
                  other.category === p.category && other.slug !== p.slug,
              )
              .slice(0, 3)
              .map((other) => (
                <ProductCard key={other.slug} product={other} />
              ))}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${p.model} ${p.title}`,
            description: p.summary,
            model: p.model,
            image: `${site.origin}${p.image}`,
            brand: { "@type": "Brand", name: site.name },
            url: `${site.origin}/products/${p.slug}/`,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
