import { ArrowUpRight, FileText, MessageSquare, Plus } from "lucide-react";
import { products, site } from "@/content/site";
import { DownloadLink } from "@/components/download-link";
import { homeQuestions } from "@/content/home";

export function HomeResources() {
  const documents = products.filter((p) => p.download).slice(0, 3);
  return (
    <section
      className="home-resources home-chapter container"
      id="resources"
      aria-labelledby="resources-title"
    >
      <div className="home-chapter-heading">
        <div>
          <span className="eyebrow">Open the details</span>
          <h2 id="resources-title">
            Technical documents
            <br />
            for your review.
          </h2>
        </div>
        <a href="/resources/" className="text-link">
          All technical resources <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
      <div className="home-resource-layout">
        <div className="home-document-list">
          {documents.map((p) => (
            <article key={p.slug}>
              <div className="home-file-icon">
                <FileText size={25} strokeWidth={1.4} aria-hidden="true" />
                <span>{p.download!.endsWith(".pdf") ? "PDF" : "DOCX"}</span>
              </div>
              <div>
                <h3>
                  <a href={`/products/${p.slug}/`}>{p.model}</a>
                </h3>
                <p>{p.title}</p>
              </div>
              <DownloadLink href={p.download!} model={p.model} />
            </article>
          ))}
        </div>
        <aside className="home-company-request">
          <FileText size={35} strokeWidth={1.2} aria-hidden="true" />
          <h3>
            Taking a closer look
            <br />
            at LONGCHI?
          </h3>
          <p>
            Ask for company information, relevant facility details and the
            documents your procurement team needs.
          </p>
          <a href="/contact/?topic=company-profile" className="text-link">
            Request company information{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </aside>
      </div>
    </section>
  );
}

export function HomeFAQ() {
  return (
    <section
      className="home-faq home-chapter"
      id="questions"
      aria-labelledby="questions-title"
    >
      <div className="container home-faq-grid">
        <div>
          <span className="eyebrow">Before we get started</span>
          <h2 id="questions-title">
            Questions about
            <br />
            working with us.
          </h2>
          <p>
            Looking into the company, the equipment or the way we work? Start
            here, or speak with us directly.
          </p>
          <a href={`mailto:${site.email}`} className="text-link">
            <MessageSquare size={17} aria-hidden="true" />
            Ask our team <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="home-faq-list">
          {homeQuestions.map((q) => (
            <details key={q.q}>
              <summary>
                {q.q}
                <Plus size={18} aria-hidden="true" />
              </summary>
              <p>{q.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
