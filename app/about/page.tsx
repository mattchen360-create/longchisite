import { ArrowUpRight } from "lucide-react";
import { HomeCollaboration } from "@/components/home-company";
import { PremiumWork, PremiumDelivery } from "@/components/premium-sections";
import { PremiumIntro } from "@/components/premium-intro";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About LONGCHI SMART | Company & Capabilities",
  "Get to know LONGCHI SMART: company information, technical workspaces, lighting manufacturing, quality documentation and international project enquiries.",
  "/about/",
);
export default function About() {
  return (
    <main id="main-content">
      <section className="prem-about-masthead">
        <img
          src="/images/factory-assembly.webp"
          alt="Lighting assembly from Hunan LONGCHI company photography"
          width="1600"
          height="1000"
          fetchPriority="high"
        />
        <div className="container">
          <div className="page-heading">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <span aria-current="page">About LONGCHI</span>
            </nav>
            <span className="eyebrow">Company & capabilities</span>
            <h1>Meet LONGCHI.</h1>
            <p>
              Meet the company, explore the manufacturing profile and start a
              conversation about the project ahead.
            </p>
          </div>
        </div>
        <small>Hunan LONGCHI manufacturing photography</small>
      </section>
      <PremiumIntro />
      <PremiumWork />
      <HomeCollaboration />
      <PremiumDelivery />
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
