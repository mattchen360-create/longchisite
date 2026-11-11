import { Mail, ArrowUpRight } from "lucide-react";
import { site, getSolution } from "@/content/site";
import { EnquiryForm } from "@/components/enquiry-form";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Discuss Your Project",
  "Contact LONGCHI SMART about lighting, traffic safety, parking and access requirements. Request a project-specific equipment quotation.",
  "/contact/",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return (
    <main id="main-content" className="container section contact-grid">
      <div>
        <div className="page-heading">
          <span className="eyebrow">Contact our team</span>
          <h1>
            Let’s make
            <br />
            the next step clear.
          </h1>
          <p>
            Tell us what you are planning, where it will be installed and which
            product lines you need.
          </p>
        </div>
        <div className="contact-details">
          <div>
            <h2>Email</h2>
            <a href={`mailto:${site.email}`} className="text-link">
              <Mail size={17} />
              {site.email}
            </a>
          </div>
          <div>
            <h2>Phone & WhatsApp</h2>
            <a href={`tel:+${site.whatsapp}`}>{site.phone}</a>
            <br />
            <a
              className="text-link"
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 10 }}
            >
              Open WhatsApp <ArrowUpRight size={16} />
            </a>
          </div>
          <div>
            <h2>Office</h2>
            <p>{site.address}</p>
          </div>
          <div>
            <h2>Company</h2>
            <p>{site.legalName}</p>
          </div>
        </div>
      </div>
      <EnquiryForm
        category={category && getSolution(category) ? category : ""}
      />
    </main>
  );
}
