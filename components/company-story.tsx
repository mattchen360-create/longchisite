import {
  ArrowUpRight,
  Check,
  Compass,
  MessageSquare,
  Play,
} from "lucide-react";
import { site } from "@/content/site";
import { directContact } from "@/content/contact";
import { CompanyArchive, FactoryExperience } from "@/components/company-experience";
function Photo({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <figure className={`story-photo ${className}`}>
      <div className="story-photo-window">
        <img src={src} alt={alt} width="1600" height="1000" loading="lazy" />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="story-link" href={href}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
export function CompanyPortrait() {
  return (
    <section className="company-portrait story-section" id="company">
      <div className="container company-portrait-layout">
        <div className="story-copy">
          <p className="story-label">The company behind the conversation</p>
          <h2>
            Get to know
            <br />
            LONGCHI SMART.
          </h2>
          <p className="story-lead">
            Lighting expertise. A wider view of smart places.
          </p>
          <p>
            Our company profile brings together lighting design and production
            with smart applications for roads, parking and building entrances.
            Explore the technical work, manufacturing materials and people
            behind it.
          </p>
          <p>
            International project enquiries are handled by {site.legalName}. The
            manufacturing story presented here comes from the Hunan LONGCHI
            company materials.
          </p>
          <Link href="/about/">Explore our company</Link>
        </div>
        <div className="company-portrait-visual">
          <Photo
            src="/images/company/facility.webp"
            alt="Hunan LONGCHI manufacturing facility and entrance"
            caption="Hunan LONGCHI manufacturing profile"
          />
          <div className="company-portrait-note">
            <strong>Shenzhen</strong>
            <span>International project enquiries</span>
            <strong>Hunan</strong>
            <span>Manufacturing profile and company materials</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export function CompanyHistory() {
  return <CompanyArchive />;
}
export function FactoryStory() {
  return <FactoryExperience />;
}
export function EngineeringStory() {
  return (
    <section className="engineering-story story-section" id="engineering">
      <div className="container engineering-story-layout">
        <Photo
          src="/images/company/engineering.webp"
          alt="Technical workspace with people, computers, a test meter and lighting hardware"
          caption="Technical workspace · Hunan LONGCHI materials"
        />
        <div className="story-copy">
          <p className="story-label">Technical work</p>
          <h2>
            Better questions.
            <br />
            Clearer decisions.
          </h2>
          <p>
            Lighting components, installation conditions and smart application
            requirements need a considered technical discussion. Bring your
            layout and operating goals into the conversation.
          </p>
          <dl className="engineering-topics">
            <div>
              <dt>Equipment</dt>
              <dd>Power, mounting, housing and lighting requirements.</dd>
            </div>
            <div>
              <dt>Application</dt>
              <dd>Identification, vehicle flow and site operation.</dd>
            </div>
            <div>
              <dt>Interfaces</dt>
              <dd>Existing systems and the connections to review.</dd>
            </div>
          </dl>
          <Link href="/contact/?topic=technical-review">
            Talk through the technical details
          </Link>
        </div>
      </div>
    </section>
  );
}
export function WorkshopFilm() {
  return (
    <section className="workshop-film story-section" id="workshop-film">
      <div className="container">
        <div className="story-heading">
          <div>
            <p className="story-label">From the workshop</p>
            <h2>
              A moving picture
              <br />
              of the work.
            </h2>
          </div>
          <p>
            A short look at the supplied manufacturing footage.
            <br />
            Play the original sequence at your own pace.
          </p>
        </div>
        <video
          controls
          playsInline
          preload="none"
          poster="/images/company-story/workshop-poster.webp"
          aria-label="Hunan LONGCHI manufacturing workshop video"
        >
          <source src="/videos/lighting-workshop.mp4" type="video/mp4" />
          Your browser does not support this video.{" "}
          <a href="/videos/lighting-workshop.mp4">Open the workshop film</a>.
        </video>
        <div className="workshop-film-caption">
          <span>
            <Play size={15} aria-hidden="true" />
            27-second workshop film
          </span>
          <span>Supplied Hunan LONGCHI manufacturing materials</span>
        </div>
      </div>
    </section>
  );
}
export function QualityStory() {
  return (
    <section className="quality-story story-section" id="quality">
      <div className="container quality-story-layout">
        <div className="story-copy">
          <p className="story-label">Attention to the details</p>
          <h2>
            Quality starts
            <br />
            with what you can see.
          </h2>
          <p>
            Connected luminaires, illuminated benches and a review of the
            selected configuration. These are the lighting checks visible in the
            company photography.
          </p>
          <ul>
            {[
              "Review the exact model and components",
              "Check the proposed operating conditions",
              "Confirm the documents your project requires",
            ].map((s) => (
              <li key={s}>
                <Check size={18} aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
          <Link href="/contact/?topic=quality-documents">
            Discuss quality requirements
          </Link>
        </div>
        <Photo
          src="/images/company/testing.webp"
          alt="LED street lights connected and illuminated on production benches"
          caption="Lighting checks · Hunan LONGCHI company photography"
        />
      </div>
    </section>
  );
}
export function CredentialsStory() {
  return (
    <section className="credentials-story story-section" id="credentials">
      <div className="container credentials-layout">
        <div className="certificate-frame">
          <img
            src="/images/company-story/high-tech-certificate.webp"
            alt="Archived high-tech enterprise certificate naming Hunan LONGCHI, issued 8 December 2023"
            width="1232"
            height="1800"
            loading="lazy"
          />
        </div>
        <div className="story-copy">
          <p className="story-label">Company evidence</p>
          <h2>
            See the document.
            <br />
            Know the scope.
          </h2>
          <p>
            The company archive includes a high-tech enterprise certificate
            issued to 湖南省龙弛智慧照明科技有限公司. Its issue date is 8
            December 2023, with a stated three-year term.
          </p>
          <dl className="credential-facts">
            <div>
              <dt>Named holder</dt>
              <dd>Hunan LONGCHI</dd>
            </div>
            <div>
              <dt>Archive reference</dt>
              <dd>GR202343005931</dd>
            </div>
            <div>
              <dt>Issued</dt>
              <dd>8 December 2023</dd>
            </div>
          </dl>
          <p className="story-source">
            This is a dated company document. Product conformity and current
            applicable documents are checked for the selected model and
            destination. The Shenzhen enquiry entity is separate.
          </p>
          <Link href="/contact/?topic=quality-documents">
            Request the relevant company documents
          </Link>
        </div>
      </div>
    </section>
  );
}
export function PeopleStory() {
  return (
    <section className="people-story story-section" id="people">
      <div className="container">
        <div className="people-story-heading">
          <p className="story-label">People behind the work</p>
          <h2>
            Good projects begin
            <br />
            with a conversation.
          </h2>
          <p>
            Technical discussion, production work and project communication each
            bring a different perspective. Tell us what matters for the people
            installing and operating your site.
          </p>
        </div>
        <Photo
          src="/images/company/team.webp"
          alt="People at computers with lighting components in the technical workspace"
          caption="A view of the technical workspace · Hunan LONGCHI company materials"
        />
        <div className="people-story-values">
          <div>
            <h3>Understand the application.</h3>
            <p>Start with how the site will be used.</p>
          </div>
          <div>
            <h3>Work through the details.</h3>
            <p>Bring drawings, constraints and questions.</p>
          </div>
          <div>
            <h3>Agree the next step.</h3>
            <p>Make the scope clear before an order.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export function TechnicalExchange() {
  return (
    <section className="exchange-story story-section" id="technical-exchange">
      <div className="container">
        <div className="story-heading">
          <div>
            <p className="story-label">Ideas in discussion</p>
            <h2>
              From the meeting room
              <br />
              to the road.
            </h2>
          </div>
          <p>
            Photographs from supplied road-weather monitoring technical exchange
            materials.
          </p>
        </div>
        <div className="exchange-story-grid">
          <article>
            <Photo
              src="/images/company-story/technical-meeting.webp"
              alt="People discussing technical work around a conference table"
              caption="Technical discussion · Supplied company archive"
            />
            <h3>Bring different perspectives together.</h3>
            <p>
              The supplied archive records a technical discussion around
              road-weather monitoring. A shared understanding of the problem
              comes before equipment choices.
            </p>
          </article>
          <article>
            <Photo
              src="/images/company-story/field-discussion.webp"
              alt="People reviewing a wet roadway outdoors with umbrellas"
              caption="Roadside discussion · Supplied company archive"
            />
            <h3>Keep the real conditions in view.</h3>
            <p>
              Road layout, exposure and operating conditions give context to
              technical discussions. Share the conditions your project needs to
              address.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
export function ExhibitionStory() {
  return (
    <section className="exhibition-story story-section" id="exhibitions">
      <div className="container exhibition-story-layout">
        <Photo
          src="/images/company-story/exhibition.webp"
          alt="Hunan LONGCHI-branded exhibition booth with visitors and roadside display equipment"
          caption="15th China International Road Traffic Security Products Expo · Supplied exhibition archive"
        />
        <div className="story-copy">
          <p className="story-label">Out in the industry</p>
          <h2>
            Meet. Discuss.
            <br />
            Look closer.
          </h2>
          <p>
            Roadside equipment on display. Visitors asking questions. The Hunan
            LONGCHI exhibition archive offers another view of the company and
            its traffic application work.
          </p>
          <p>
            Continue the conversation with our international enquiry team, or
            follow the updates on our official channels.
          </p>
          <div className="exhibition-story-links">
            <a
              href="https://www.facebook.com/longchismart/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
              <ArrowUpRight size={17} />
            </a>
            <a
              href="https://www.youtube.com/@longchismart"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
              <ArrowUpRight size={17} />
            </a>
          </div>
          <Link href="/contact/">Meet the project enquiry team</Link>
        </div>
      </div>
    </section>
  );
}
export function ConfigurationStory() {
  const areas = [
    {
      title: "Lighting configuration",
      text: "Power, mounting, optics and the proposed control requirements.",
    },
    {
      title: "Traffic requirements",
      text: "Display content, speed units, power and installation conditions.",
    },
    {
      title: "Parking workflows",
      text: "Entry lanes, recognition, payment and the operator’s process.",
    },
    {
      title: "Access requirements",
      text: "Passage layout, identification and interfaces to review.",
    },
  ];
  return (
    <section className="configuration-story story-section" id="configuration">
      <div className="container">
        <div className="story-heading">
          <div>
            <p className="story-label">A considered configuration</p>
            <h2>
              Your site sets
              <br />
              the starting point.
            </h2>
          </div>
          <p>
            Discuss options around the application.
            <br />
            Availability and compatibility are confirmed before quotation.
          </p>
        </div>
        <div className="configuration-story-grid">
          {areas.map((a, i) => (
            <article key={a.title}>
              <img
                src={
                  [
                    "/images/led-ab80.webp",
                    "/images/radar-ld01.webp",
                    "/images/parking-barrier.webp",
                    "/images/access-systems.webp",
                  ][i]
                }
                alt={a.title + " equipment"}
                width="400"
                height="340"
                loading="lazy"
              />
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </article>
          ))}
        </div>
        <Link href="/contact/?topic=technical-review">
          Discuss a configuration
        </Link>
      </div>
    </section>
  );
}
export function MarketsStory() {
  return (
    <section className="markets-story story-section" id="markets">
      <div className="container">
        <div className="markets-story-heading">
          <Compass size={35} strokeWidth={1.3} aria-hidden="true" />
          <p className="story-label">International project enquiries</p>
          <h2>
            Different markets.
            <br />
            Local requirements.
          </h2>
          <p>
            Planning in Europe, North America or Australia? Build the
            destination, operating conditions and requested documents into your
            brief.
          </p>
        </div>
        <div className="market-regions">
          {[
            {
              name: "Europe",
              text: "Site requirements, installation conditions and the product documents your project needs.",
            },
            {
              name: "North America",
              text: "Electrical requirements, display units and local documentation to review.",
            },
            {
              name: "Australia",
              text: "Outdoor exposure, operating needs and the proposed installation and supply scope.",
            },
          ].map((m) => (
            <article key={m.name}>
              <h3>{m.name}</h3>
              <p>{m.text}</p>
            </article>
          ))}
        </div>
        <Link href="/contact/">Discuss your destination</Link>
      </div>
    </section>
  );
}
export function SupportStory() {
  return (
    <section className="support-story story-section" id="support">
      <div className="container support-story-layout">
        <div className="story-copy">
          <p className="story-label">Plan beyond the equipment</p>
          <h2>
            Make the handover
            <br />
            part of the brief.
          </h2>
          <p>
            Equipment is one part of the conversation. Define the installation
            information, operating documents and support arrangements that your
            team will need.
          </p>
          <Link href="/contact/?topic=delivery-planning">
            Plan the handover and support
          </Link>
        </div>
        <div className="support-story-list">
          {[
            {
              title: "Installation information",
              text: "Request the dimensions, mounting and wiring details for the equipment being proposed.",
            },
            {
              title: "Operating documents",
              text: "Identify the manuals and configuration information needed by the site team.",
            },
            {
              title: "Support arrangements",
              text: "Confirm warranty terms, contact routes and the agreed support scope in your quotation.",
            },
          ].map((s) => (
            <article key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
          <a
            href={directContact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquare size={20} />
            Start a conversation on WhatsApp
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
