/** Application combinations describe discussion starting points, not pre-validated integrated systems. */
export const applications = [
  {
    slug: "industrial-campus",
    name: "Industrial parks",
    title: "One site. Many daily journeys.",
    description:
      "Consider the road outside, vehicles arriving, staff entering and the lighting between buildings. Build a coordinated brief before choosing equipment.",
    scene: "/images/redesign/campus-hero.webp",
    alt: "Illustrative landscaped industrial campus and outdoor roads",
    lines: [
      "smart-lighting",
      "traffic-safety",
      "smart-parking",
      "access-control",
    ],
    questions: [
      "Site layout and operating hours",
      "Vehicle and pedestrian flow",
      "Existing systems and connections",
    ],
  },
  {
    slug: "commercial-property",
    name: "Commercial property",
    title: "Make the arrival part of the plan.",
    description:
      "Bring the parking entrance, visitor journey and building access into the same conversation. Review each product line against the property's operating needs.",
    scene: "/images/redesign/parking-scene.webp",
    alt: "Illustrative commercial property parking entrance",
    lines: ["smart-parking", "access-control", "smart-lighting"],
    questions: [
      "Entry and exit lane arrangement",
      "Visitor, tenant and operator workflow",
      "Recognition, payment and access interfaces",
    ],
  },
  {
    slug: "managed-campus",
    name: "Campuses & facilities",
    title: "Think beyond the front door.",
    description:
      "Plan for the people who use your site every day: arrivals, accessible passages, outdoor routes and controlled entrances.",
    scene: "/images/redesign/access-scene.webp",
    alt: "Illustrative campus building lobby and pedestrian gates",
    lines: ["access-control", "smart-lighting", "traffic-safety"],
    questions: [
      "Entrance layout and passage needs",
      "Preferred identification method",
      "Road and outdoor lighting requirements",
    ],
  },
  {
    slug: "road-project",
    name: "Roadside projects",
    title: "Start with the road itself.",
    description:
      "Discuss speed feedback, vehicle capture and outdoor lighting around actual installation conditions. Product selection follows the site and the intended use.",
    scene: "/images/redesign/traffic-scene.webp",
    alt: "Illustrative roadside speed feedback installation",
    lines: ["traffic-safety", "smart-lighting"],
    questions: [
      "Road layout and mounting positions",
      "Speed units, display wording and power",
      "Local project documentation",
    ],
  },
];

export const contactTopics: Record<string, { label: string; message: string }> =
  {
    "company-profile": {
      label: "Company information",
      message:
        "I would like to learn more about LONGCHI.\n\nCompany background / facilities information needed: \nProject country: \nProduct areas of interest: ",
    },
    "technical-review": {
      label: "Technical project review",
      message:
        "I would like to discuss a technical project review.\n\nApplication and site conditions: \nModels / product lines: \nDrawings, interfaces or configuration requirements: ",
    },
    "quality-documents": {
      label: "Quality and project documents",
      message:
        "I would like to review quality and project documents.\n\nModel / proposed equipment: \nDestination country: \nTest reports, certificates or documents required: ",
    },
  };

export const homeQuestions = [
  {
    q: "Who handles my international enquiry?",
    a: "International enquiries through this website are handled by Shenzhen Longchi Smart Technology Co., Ltd. Contact our team directly by email, phone or WhatsApp. Manufacturing photographs identify the Hunan LONGCHI operation separately.",
  },
  {
    q: "Can we discuss a project before selecting a model?",
    a: "Yes. Start with the application, location, quantities and installation conditions. A drawing, lane layout or list of operating requirements can help define which equipment and configurations to review.",
  },
  {
    q: "Can I combine several product lines in one enquiry?",
    a: "Yes. Use the product-line selection below our product range to add lighting, traffic, parking and access requirements to one brief. Each product and any connection between systems still needs a project-specific review.",
  },
  {
    q: "Can I request custom configurations or integration?",
    a: "Tell us the changes, identification methods, power supply, display format or existing platform involved. Availability, technical compatibility and the scope of any custom work are confirmed before quotation.",
  },
  {
    q: "Which certificates and reports are available?",
    a: "Specify the selected model, destination country and documents your project needs. We will check the relevant files and their applicability. Company credentials and product reports apply to their named holder, model and scope.",
  },
  {
    q: "What about quantities, lead times and after-sales arrangements?",
    a: "Share your required quantities and schedule. Minimum order requirements, lead time, warranty and after-sales scope depend on the equipment and commercial agreement, and should be confirmed in your quotation.",
  },
];
