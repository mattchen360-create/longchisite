"use client";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { solutions } from "@/content/site";
export function CorporateHero({ variant = 0 }: { variant?: number }) {
  return (
    <section
      className={`corporate-hero corporate-hero-${variant}`}
      aria-label="Meet LONGCHI SMART"
    >
      {variant === 0 ? (
        <div className="corporate-hero-brand">
          <div className="corporate-hero-copy">
            <p>LONGCHI SMART</p>
            <h1>
              Meet LONGCHI.
              <br />
              Build with us.
            </h1>
            <div className="corporate-hero-description">
              Lighting, traffic, parking and access.
              <br />
              Meet the people and the work behind your next project.
            </div>
            <div className="corporate-hero-actions">
              <a className="button" href="#company">
                Discover LONGCHI
                <ArrowUpRight size={18} />
              </a>
              <a href="/contact/">Talk to our team</a>
            </div>
          </div>
          <figure className="corporate-hero-main-photo">
            <img
              src="/images/factory-assembly.webp"
              alt="Lighting assembly from Hunan LONGCHI company photography"
              width="1600"
              height="1000"
              fetchPriority="high"
            />
            <figcaption>Hunan LONGCHI · Lighting assembly</figcaption>
          </figure>
          <figure className="corporate-hero-inset">
            <img
              src="/images/company/engineering.webp"
              alt="Technical workspace with people and lighting components"
              width="1600"
              height="900"
            />
            <figcaption>A closer look at the technical work</figcaption>
          </figure>
        </div>
      ) : variant === 1 ? (
        <div className="corporate-hero-immersive">
          <img
            src="/images/factory-line.webp"
            alt="Supplied photograph of the lighting manufacturing line"
            width="1600"
            height="1000"
            fetchPriority="high"
          />
          <div className="container">
            <p>Inside LONGCHI</p>
            <h1>
              See the work.
              <br />
              Meet the company.
            </h1>
            <p>
              Technical conversations. Lighting production.
              <br />A clearer start to your project.
            </p>
            <a className="button" href="#factory">
              Explore the manufacturing story
              <ArrowUpRight size={18} />
            </a>
          </div>
          <span>Hunan LONGCHI manufacturing photography</span>
        </div>
      ) : (
        <div className="corporate-hero-disciplines">
          <div className="container">
            <p>LONGCHI SMART</p>
            <h1>
              Four disciplines.
              <br />A world of possibilities.
            </h1>
            <p>
              Lighting, traffic safety, parking and access control.
              <br />
              Start with your site. Meet the company behind the conversation.
            </p>
            <a className="button" href="#solutions">
              Explore our four product lines
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="corporate-hero-scene-strip">
            {[
              "campus-hero",
              "traffic-scene",
              "parking-scene",
              "access-scene",
            ].map((name, i) => (
              <a href={`/solutions/${solutions[i].slug}/`} key={name}>
                <img
                  src={`/images/redesign/${name}.webp`}
                  alt={`Illustrative ${solutions[i].name.toLowerCase()} application`}
                  width="1536"
                  height="1024"
                />
                <span>
                  {solutions[i].shortName}
                  <ArrowUpRight size={18} />
                </span>
              </a>
            ))}
          </div>
          <small>Application scenes are illustrative.</small>
        </div>
      )}
      <div className="corporate-hero-foot container">
        <span>Lighting. Traffic. Parking. Access.</span>
        <a href="#company">
          Get to know us
          <ArrowDown size={17} />
        </a>
      </div>
    </section>
  );
}
