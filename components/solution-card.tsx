import { ArrowUpRight } from "lucide-react";
import type { Solution } from "@/content/site";
export function SolutionCard({ solution: s }: { solution: Solution }) {
  return (
    <a
      href={`/solutions/${s.slug}/`}
      className={`solution-card solution-${s.slug}`}
    >
      <div className="solution-card-top">
        <span>{s.label}</span>
        <ArrowUpRight size={23} aria-hidden="true" />
      </div>
      <div className="solution-card-image">
        <img
          src={s.image}
          width="600"
          height="600"
          alt={s.imageAlt}
          loading="lazy"
        />
      </div>
      <h3>{s.name}</h3>
      <p>{s.description}</p>
      <span className="card-link">
        Explore {s.shortName.toLowerCase()} <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}
