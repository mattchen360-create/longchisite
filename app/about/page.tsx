import { ArrowUpRight } from "lucide-react";
import {
  CompanyOverview,
  HomeQuality,
  HomeCollaboration,
} from "@/components/home-company";
import { HomeCapabilities } from "@/components/home-capabilities";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About LONGCHI SMART | Company & Capabilities",
  "Get to know LONGCHI SMART: company information, technical workspaces, lighting manufacturing, quality documentation and international project enquiries.",
  "/about/",
);
export default function About() {
  return (
    <main id="main-content">
      <section className="container section">
        <div className="page-heading">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span aria-current="page">About LONGCHI</span>
          </nav>
          <span className="eyebrow">Company & capabilities</span>
          <h1>
            Get to know
            <br />
            the work behind LONGCHI.
          </h1>
          <p>
            Meet the company, explore the manufacturing profile and start a
            conversation about the project ahead.
          </p>
        </div>
      </section>
      <CompanyOverview />
      <HomeCapabilities />
      <HomeQuality />
      <HomeCollaboration />
      <section className="container section">
        <div className="home-chapter-heading">
          <div>
            <span className="eyebrow">Start the conversation</span>
            <h2>
              Questions about LONGCHI?
              <br />
              Speak with us directly.
            </h2>
          </div>
          <a href="/contact/?topic=company-profile" className="button">
            Request company information{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
