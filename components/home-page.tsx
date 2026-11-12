import { ArrowUpRight } from "lucide-react";
import { site, solutions } from "@/content/site";
import { EnquiryForm } from "@/components/enquiry-form";
import { HomeComposition } from "@/components/home-composition";
import { HomeMotion } from "@/components/home-motion";
import {
  PremiumSolutions,
  PremiumDelivery,
} from "@/components/premium-sections";
import { HomeApplications } from "@/components/home-applications";
import { HomeFAQ } from "@/components/home-resources";
import { ProjectPlanner } from "@/components/project-planner";
import {
  CompanyPortrait,
  CompanyHistory,
  FactoryStory,
  EngineeringStory,
  WorkshopFilm,
  QualityStory,
  CredentialsStory,
  PeopleStory,
  TechnicalExchange,
  ExhibitionStory,
  ConfigurationStory,
  MarketsStory,
  SupportStory,
} from "@/components/company-story";
function HomeEnquiry() {
  return (
    <section
      className="section container enquiry-section prem-enquiry"
      id="enquire"
    >
      <div className="enquiry-intro">
        <span className="eyebrow">Meet the project enquiry team</span>
        <h2>
          Your next project.
          <br />
          Let’s talk.
        </h2>
        <p>
          Company questions, technical requirements or equipment for a complete
          site. Start the conversation with LONGCHI.
        </p>
        <a href={`mailto:${site.email}`} className="text-link">
          {site.email}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <div className="enquiry-lines">
          {solutions.map((s) => (
            <span key={s.slug}>{s.name}</span>
          ))}
        </div>
      </div>
      <EnquiryForm />
    </section>
  );
}
export function HomePage({ review = false }: { review?: boolean } = {}) {
  const sections = [
    { id: "company", node: <CompanyPortrait /> },
    { id: "history", node: <CompanyHistory /> },
    { id: "factory", node: <FactoryStory /> },
    { id: "engineering", node: <EngineeringStory /> },
    { id: "film", node: <WorkshopFilm /> },
    { id: "quality", node: <QualityStory /> },
    { id: "credentials", node: <CredentialsStory /> },
    { id: "people", node: <PeopleStory /> },
    { id: "exchange", node: <TechnicalExchange /> },
    { id: "exhibition", node: <ExhibitionStory /> },
    { id: "solutions", node: <PremiumSolutions /> },
    { id: "applications", node: <HomeApplications /> },
    { id: "configuration", node: <ConfigurationStory /> },
    { id: "markets", node: <MarketsStory /> },
    { id: "delivery", node: <PremiumDelivery /> },
    { id: "support", node: <SupportStory /> },
    { id: "planner", node: <ProjectPlanner /> },
    { id: "questions", node: <HomeFAQ /> },
    { id: "enquiry", node: <HomeEnquiry /> },
  ];
  return (
    <main
      id="main-content"
      className={`premium-home company-first-home ${review ? "home-review" : ""}`}
    >
      <HomeComposition sections={sections} review={review} />
      <HomeMotion />
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
