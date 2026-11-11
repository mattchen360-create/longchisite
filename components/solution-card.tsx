import { ArrowUpRight } from "lucide-react";
import type { Solution } from "@/content/site";
import { solutionVisuals } from "@/content/visuals";
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
          src={solutionVisuals[s.slug].scene}
          width="1536"
          height="1024"
          alt={solutionVisuals[s.slug].alt}
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
