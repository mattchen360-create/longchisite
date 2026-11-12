"use client";
import { useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { solutions } from "@/content/site";
import { solutionVisuals } from "@/content/visuals";
import { companyCapabilities } from "@/content/company";
import { CompanyGallery } from "@/components/company-gallery";
import { track } from "@/lib/tracking";
function moveTab(
  e: KeyboardEvent<HTMLButtonElement>,
  i: number,
  count: number,
  prefix: string,
  select: (n: number) => void,
) {
  let n: number;
  if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (i + 1) % count;
  else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
    n = (i + count - 1) % count;
  else if (e.key === "Home") n = 0;
  else if (e.key === "End") n = count - 1;
  else return;
  e.preventDefault();
  select(n);
  document.getElementById(`${prefix}-${n}`)?.focus();
}

export function PremiumSolutions() {
  const [active, setActive] = useState(0),
    s = solutions[active],
    v = solutionVisuals[s.slug];
  function select(i: number) {
    setActive(i);
    track("explore_solution", { product_line: solutions[i].slug });
  }
  return (
    <section
      className="prem-solutions prem-chapter"
      id="solutions"
      aria-labelledby="prem-solutions-title"
    >
      <div className="container">
        <div className="prem-chapter-heading">
          <div>
            <p className="prem-label">Our solutions</p>
            <h2 id="prem-solutions-title">
              Different disciplines.
              <br />
              One project conversation.
            </h2>
          </div>
          <p>
            Choose your starting point.
            <br />
            We’ll help define the equipment around it.
          </p>
        </div>
        <div className="prem-solution-layout">
          <div
            className="prem-solution-index"
            role="tablist"
            aria-label="Explore solution disciplines"
            aria-orientation="vertical"
          >
            {solutions.map((line, i) => (
              <button
                type="button"
                role="tab"
                id={`prem-solution-tab-${i}`}
                key={line.slug}
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                aria-controls="prem-solution-panel"
                onClick={() => select(i)}
                onKeyDown={(e) => moveTab(e, i, 4, "prem-solution-tab", select)}
              >
                <span>
                  <strong>{line.name}</strong>
                  <small>{line.label}</small>
                  {active === i && <p>{line.description}</p>}
                </span>
                <ArrowUpRight size={24} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div
            className="prem-solution-panel"
            id="prem-solution-panel"
            role="tabpanel"
            aria-labelledby={`prem-solution-tab-${active}`}
            tabIndex={0}
          >
            <div className="prem-solution-visual">
              <img
                key={v.scene}
                className="prem-solution-scene"
                src={v.scene}
                alt={v.alt}
                width="1536"
                height="1024"
                loading="lazy"
              />
              <span className="prem-image-note">Illustrative application</span>
            </div>
            <a href={`/solutions/${s.slug}/`} className="prem-solution-action">
              <span>
                Explore {s.shortName.toLowerCase()}
                <ArrowUpRight size={19} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const work = [
  ...companyCapabilities,
  {
    key: "quality",
    name: "Quality & documentation",
    title: "Details you can review.",
    description:
      "Lighting checks are part of the manufacturing photographs. For your project, review the equipment, operating conditions and relevant reports before confirming the supply.",
    image: "/images/company/testing.webp",
    alt: "LED street lights connected and illuminated on production benches",
    caption: "Lighting checks · Hunan LONGCHI company photography",
    points: [
      "Model-specific parameters",
      "Installation and operating conditions",
      "Requested reports and certificates",
    ],
    link: "/contact/?topic=quality-documents",
    action: "Discuss quality documents",
  },
];
export function PremiumWork() {
  const [active, setActive] = useState(1),
    current = work[active];
  return (
    <section
      className="prem-work prem-chapter"
      id="capabilities"
      aria-labelledby="prem-work-title"
    >
      <div className="container">
        <div className="prem-chapter-heading">
          <div>
            <p className="prem-label">Inside LONGCHI</p>
            <h2 id="prem-work-title">
              Real people.
              <br />
              Practical work.
            </h2>
          </div>
          <p>
            A closer look at technical development,
            <br />
            lighting production and the details behind them.
          </p>
        </div>
        <div className="prem-work-layout">
          <figure className="prem-work-photo">
            <img
              key={current.image}
              src={current.image}
              alt={current.alt}
              width="1600"
              height="1000"
              loading="lazy"
            />
            <CompanyGallery currentImage={current.image} />
            <figcaption>{current.caption}</figcaption>
          </figure>
          <div className="prem-work-index">
            <div
              role="tablist"
              aria-label="Company capabilities"
              aria-orientation="vertical"
            >
              {work.map((item, i) => (
                <button
                  type="button"
                  role="tab"
                  key={item.key}
                  id={`prem-work-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls="prem-work-panel"
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) =>
                    moveTab(e, i, work.length, "prem-work-tab", setActive)
                  }
                >
                  {item.name}
                  {active === i ? (
                    <Minus size={20} aria-hidden="true" />
                  ) : (
                    <Plus size={20} aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
            <div
              id="prem-work-panel"
              role="tabpanel"
              aria-labelledby={`prem-work-tab-${active}`}
              tabIndex={0}
              key={current.key}
            >
              <h3>{current.title}</h3>
              <p>{current.description}</p>
              <ul>
                {current.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <a className="prem-white-link" href={current.link}>
                {current.action}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <p className="prem-work-source">
          Manufacturing and workspace photography: Hunan LONGCHI company
          materials. International enquiries: Shenzhen Longchi Smart Technology
          Co., Ltd.
        </p>
      </div>
    </section>
  );
}

const delivery = [
  {
    name: "Brief",
    title: "Start with the site.",
    text: "Tell us the destination, application, quantities and the way the site needs to operate. Drawings and installation conditions help make the discussion concrete.",
    points: [
      "Application and country",
      "Required quantities and schedule",
      "Site layouts and operating conditions",
    ],
  },
  {
    name: "Configuration",
    title: "Review the proposed equipment.",
    text: "Compare the right models and identify power, mounting, interfaces and documents that need to be confirmed for your project.",
    points: [
      "Selected models and options",
      "Mounting, power and interfaces",
      "Relevant technical documents",
    ],
  },
  {
    name: "Supply scope",
    title: "Agree what is included.",
    text: "Define the equipment, accessories, quantities and commercial terms in your quotation. Confirm the scope before placing an order.",
    points: [
      "Equipment and accessories",
      "Quotation and commercial terms",
      "Agreed configuration and quantities",
    ],
  },
  {
    name: "Delivery & handover",
    title: "Plan the route to your site.",
    text: "Share the destination, required delivery date, packaging and document needs. Shipping arrangements, timing and support scope are confirmed for the order.",
    points: [
      "Destination and delivery requirements",
      "Packaging and shipping documents",
      "Agreed handover and support scope",
    ],
  },
];
export function PremiumDelivery() {
  const [active, setActive] = useState(0),
    stage = delivery[active];
  return (
    <section
      className="prem-delivery prem-chapter"
      id="delivery"
      aria-labelledby="prem-delivery-title"
    >
      <div className="container">
        <div className="prem-chapter-heading">
          <div>
            <p className="prem-label">From a question to a defined project</p>
            <h2 id="prem-delivery-title">
              Considered from brief
              <br />
              through to handover.
            </h2>
          </div>
          <p>
            Planning for Europe, North America or Australia?
            <br />
            Bring local and delivery requirements into the brief.
          </p>
        </div>
        <div
          className="prem-delivery-tabs"
          role="tablist"
          aria-label="Project delivery stages"
        >
          {delivery.map((d, i) => (
            <button
              type="button"
              role="tab"
              key={d.name}
              id={`prem-delivery-tab-${i}`}
              aria-selected={active === i}
              aria-controls="prem-delivery-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) =>
                moveTab(e, i, 4, "prem-delivery-tab", setActive)
              }
            >
              <span>0{i + 1}</span>
              <strong>{d.name}</strong>
            </button>
          ))}
        </div>
        <div
          className="prem-delivery-content"
          id="prem-delivery-panel"
          role="tabpanel"
          aria-labelledby={`prem-delivery-tab-${active}`}
          tabIndex={0}
        >
          <div>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
          </div>
          <div>
            <ul>
              {stage.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <a className="button" href="/contact/?topic=delivery-planning">
              Discuss project delivery{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
