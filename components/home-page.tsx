import { ArrowUpRight } from "lucide-react";
import { site, solutions } from "@/content/site";
import { EnquiryForm } from "@/components/enquiry-form";
import { HomeHero } from "@/components/solution-atlas";
import { HomeSolutions } from "@/components/home-solutions";
import {
  HomeChapterNav,
  CompanyOverview,
  HomeQuality,
  HomeCollaboration,
  HomeProcess,
} from "@/components/home-company";
import { HomeCapabilities } from "@/components/home-capabilities";
import { HomeApplications } from "@/components/home-applications";
import { HomeResources, HomeFAQ } from "@/components/home-resources";
export function HomePage() {
  return (
    <main id="main-content">
      <HomeHero />
      <HomeChapterNav />
      <CompanyOverview />
      <HomeCapabilities />
      <HomeSolutions />
      <HomeApplications />
      <HomeQuality />
      <HomeCollaboration />
      <HomeProcess />
      <HomeResources />
      <HomeFAQ />
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
