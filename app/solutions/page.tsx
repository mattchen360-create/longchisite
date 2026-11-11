import { solutions } from "@/content/site";
import { SolutionCard } from "@/components/solution-card";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Four Product Lines for Your Project",
  "Explore LONGCHI smart lighting, traffic safety, smart parking and access control. Find the right starting point for your site.",
  "/solutions/",
);
export default function Solutions() {
  return (
    <main id="main-content" className="container section">
      <div className="page-heading">
        <span className="eyebrow">Our solutions</span>
        <h1>
          Four product lines.
          <br />
          One project-minded approach.
        </h1>
        <p>Explore the equipment and tell us what your site needs.</p>
      </div>
      <div className="solutions-grid">
        {solutions.map((s) => (
          <SolutionCard key={s.slug} solution={s} />
        ))}
      </div>
    </main>
  );
}
