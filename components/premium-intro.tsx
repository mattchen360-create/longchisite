import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
export function PremiumIntro() {
  return (
    <section
      className="prem-intro prem-chapter"
      id="company"
      aria-labelledby="prem-intro-title"
    >
      <div className="container prem-intro-layout">
        <div className="prem-intro-heading">
          <p className="prem-label">Meet LONGCHI SMART</p>
          <h2 id="prem-intro-title">
            From the road
            <br />
            to the front door.
          </h2>
          <a className="prem-text-link" href="/about/">
            Get to know LONGCHI
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
        <div className="prem-intro-copy">
          <p className="prem-intro-lead">
            Places work better when their equipment is considered together.
          </p>
          <p>
            Explore lighting, traffic safety, parking and access control around
            the way your site operates. We help turn application requirements
            into an equipment discussion.
          </p>
          <div className="prem-company-details">
            <div>
              <span>International enquiries</span>
              <strong>Shenzhen, China</strong>
              <p>{site.legalName}</p>
            </div>
            <div>
              <span>Manufacturing profile</span>
              <strong>Hunan LONGCHI</strong>
              <p>
                Lighting design, production and smart application development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
