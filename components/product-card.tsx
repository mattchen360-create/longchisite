import type { Product } from "@/content/site";
import { ArrowUpRight } from "lucide-react";
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <a className="product-card" href={`/products/${p.slug}/`}>
      <div className="product-card-image">
        <img
          src={p.image}
          alt={`${p.model} ${p.title}`}
          width="600"
          height="600"
          loading="lazy"
        />
      </div>
      <div className="product-card-copy">
        <span>{p.model}</span>
        <h3>{p.title}</h3>
        <p>{p.highlights.slice(0, 2).join(" · ")}</p>
        <ArrowUpRight size={21} aria-hidden="true" />
      </div>
    </a>
  );
}
