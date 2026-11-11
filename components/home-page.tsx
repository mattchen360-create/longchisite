import { ArrowUpRight } from "lucide-react";
import { site, solutions } from "@/content/site";
import { EnquiryForm } from "@/components/enquiry-form";
import { PremiumHero } from "@/components/premium-hero";
import { PremiumIntro } from "@/components/premium-intro";
import {
  PremiumSolutions,
  PremiumWork,
  PremiumDelivery,
} from "@/components/premium-sections";
import { EquipmentExplorer } from "@/components/equipment-explorer";
import { HomeApplications } from "@/components/home-applications";
import { HomeResources, HomeFAQ } from "@/components/home-resources";
import { ProjectPlanner } from "@/components/project-planner";
export function HomePage() {
  return (
    <main id="main-content" className="premium-home">
      <PremiumHero />
      <PremiumIntro />
      <PremiumSolutions />
      <PremiumWork />
      <section
        className="prem-equipment prem-chapter container"
        id="equipment"
        aria-labelledby="prem-equipment-title"
      >
        <div className="prem-chapter-heading">
          <div>
            <p className="prem-label">The equipment, up close</p>
            <h2 id="prem-equipment-title">
              Explore the detail.
              <br />
              Choose with context.
            </h2>
          </div>
          <p>
            Real models. Supplied specifications.
            <br />
            Compare what matters for your application.
          </p>
        </div>
        <EquipmentExplorer />
      </section>
      <HomeApplications />
      <PremiumDelivery />
      <ProjectPlanner />
      <HomeResources />
      <HomeFAQ />
      <section
        className="section container enquiry-section prem-enquiry"
        id="enquire"
      >
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
