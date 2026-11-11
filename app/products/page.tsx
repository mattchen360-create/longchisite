import { products, solutions } from "@/content/site";
import { ProductCard } from "@/components/product-card";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Products & Project Equipment",
  "Explore LONGCHI lighting and radar equipment, or discuss a project-specific parking or access configuration.",
  "/products/",
);
export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = "all" } = await searchParams;
  const selected = solutions.find((s) => s.slug === category);
  const filtered = selected
    ? products.filter((p) => p.category === category)
    : products;
  return (
    <main id="main-content" className="container section">
      <div className="page-heading">
        <span className="eyebrow">Equipment & configurations</span>
        <h1>Find your starting point.</h1>
        <p>
          Explore current model information or tell us about the system your
          project needs.
        </p>
      </div>
      <nav className="filter-tabs" aria-label="Filter products">
        <a
          className={!selected ? "active" : ""}
          href="/products/"
          aria-current={!selected ? "page" : undefined}
        >
          All products
        </a>
        {solutions.map((s) => (
          <a
            key={s.slug}
            className={selected?.slug === s.slug ? "active" : ""}
            href={`/products/?category=${s.slug}`}
            aria-current={selected?.slug === s.slug ? "page" : undefined}
          >
            {s.name}
          </a>
        ))}
      </nav>
      {filtered.length ? (
        <div className="products-grid">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        selected && (
          <div className="catalog-empty">
            <img
              src={selected.image}
              width="600"
              height="600"
              alt={selected.imageAlt}
            />
            <div>
              <span className="eyebrow">{selected.name}</span>
              <h2>Start with your requirements.</h2>
              <p>
                Define the application, equipment and integration scope. Request
                model documents and a configuration proposal for your project.
              </p>
              <a
                className="button"
                href={`/solutions/${selected.slug}/#enquire`}
              >
                Discuss your requirements <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        )
      )}
      <aside className="resource-note">
        <h2 style={{ fontSize: 24 }}>Looking across product lines?</h2>
        <p>
          Parking, access, traffic and lighting requirements often come together
          at one site. Share the overall brief and tell us where you need help.
        </p>
        <a href="/contact/" className="text-link">
          Discuss a project <ArrowUpRight size={17} />
        </a>
      </aside>
    </main>
  );
}
