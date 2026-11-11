export const site = {
  name: "LONGCHI SMART",
  legalName: "Shenzhen Longchi Smart Technology Co., Ltd.",
  origin: "https://longchi-smart-sem.bentpumpkin4.chatgpt.site",
  email: "matt@longchismart.com",
  phone: "+86 173 0446 6938",
  whatsapp: "8617304466938",
  address:
    "9th Floor, Building A6, Yintian Industrial Zone, Xixiang Street, Bao’an District, Shenzhen, China",
};
export type Solution = {
  slug: string;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  label: string;
  intro: string;
  applications: string[];
  options: { title: string; text: string }[];
  questions: { q: string; a: string }[];
  planning: string[];
};
export const solutions: Solution[] = [
  {
    slug: "smart-lighting",
    name: "Smart lighting",
    shortName: "Lighting",
    label: "Roads & outdoor spaces",
    headline: "LED street lighting.\nFor your next project.",
    description:
      "Explore LED street lighting and discuss the power, optics and control requirements for your next outdoor project.",
    image: "/images/led-ab80.webp",
    imageAlt: "LONGCHI LC-LED-AB80 LED street light",
    intro:
      "Start with your road layout, mounting height and lighting goals. Compare available luminaires and define the configuration your project needs.",
    applications: [
      "Roads & streets",
      "Industrial parks",
      "Campus roads",
      "Outdoor parking areas",
    ],
    options: [
      {
        title: "LED street lights",
        text: "Compare current luminaire models by rated power, construction and protection rating.",
      },
      {
        title: "Solar lighting projects",
        text: "Discuss the operating schedule, location and power requirements before selecting a solar configuration.",
      },
      {
        title: "Lighting control",
        text: "Define dimming, scheduling and monitoring needs so the control scope can be confirmed with your quotation.",
      },
    ],
    planning: [
      "Road layout and installation location",
      "Pole height and mounting dimensions",
      "Power supply and operating schedule",
      "Photometric files and market documentation required",
    ],
    questions: [
      {
        q: "How do I choose the right street light?",
        a: "Share the road width, pole spacing, mounting height and application. The appropriate wattage and optics depend on the layout rather than wattage alone.",
      },
      {
        q: "Can I request project-specific documentation?",
        a: "Tell us which photometric files, test reports or market documents you need. Availability and applicability will be confirmed for the selected model.",
      },
      {
        q: "Are all configurations available for every model?",
        a: "Options vary by model. Check the product specifications and confirm the final power supply, controls and accessories in your quotation.",
      },
    ],
  },
  {
    slug: "traffic-safety",
    name: "Traffic safety",
    shortName: "Traffic",
    label: "Roads & vehicle movement",
    headline: "Radar speed signs.\nSelected for your site.",
    description:
      "Radar speed feedback displays and camera-equipped roadside systems, selected around your location and application.",
    image: "/images/radar-ld01.webp",
    imageAlt: "LONGCHI LC-JTP-LD01 radar speed feedback sign",
    intro:
      "A simple speed display and a camera-equipped system solve different needs. Compare the options, then confirm the display, power and installation requirements for your site.",
    applications: [
      "Private roads",
      "Industrial sites",
      "Campus entrances",
      "Roadside warning projects",
    ],
    options: [
      {
        title: "Radar speed feedback",
        text: "Show drivers their detected speed with a clearly visible roadside display.",
      },
      {
        title: "Camera-equipped systems",
        text: "Explore models that combine radar measurement with vehicle image and plate capture.",
      },
      {
        title: "Roadside warning",
        text: "Discuss display messages, site conditions and warning requirements for your application.",
      },
    ],
    planning: [
      "Country and installation environment",
      "Speed units and sign wording required",
      "Display-only or vehicle-capture requirement",
      "Power supply, pole and network availability",
    ],
    questions: [
      {
        q: "Do all speed displays include a camera?",
        a: "No. The LD display models and camera-equipped CS systems have different functions. Check each model page and describe whether you need driver feedback, vehicle capture or both.",
      },
      {
        q: "Can the sign be used in my country?",
        a: "Tell us your country, speed units and required sign format. Suitability, radio requirements and project-specific approvals must be confirmed before an order. This website does not claim universal approval for enforcement use.",
      },
      {
        q: "Is solar power available?",
        a: "Some configurations support an optional DC supply for solar or battery projects. The selected model, panel, battery capacity and operating schedule need to be confirmed together.",
      },
    ],
  },
  {
    slug: "smart-parking",
    name: "Smart parking",
    shortName: "Parking",
    label: "Vehicle entry & parking",
    headline: "Parking systems.\nA better way in and out.",
    description:
      "Bring vehicle entry, barrier control and payment requirements into one project brief.",
    image: "/images/parking-barrier.webp",
    imageAlt: "Vehicle parking barrier with boom arm",
    intro:
      "Whether you are planning a single entrance or a larger car park, start with the vehicle flow and operating process. Review the equipment and integration scope around those needs.",
    applications: [
      "Commercial car parks",
      "Residential entrances",
      "Industrial premises",
      "Campus parking",
    ],
    options: [
      {
        title: "Vehicle barriers",
        text: "Define lane width, vehicle flow and installation conditions for your barrier selection.",
      },
      {
        title: "Recognition & entry",
        text: "Discuss number plate recognition, RFID or other entry methods and the required controller connections.",
      },
      {
        title: "Payment & operation",
        text: "Map out the ticketing or payment process, operator workflow and systems that need to connect.",
      },
    ],
    planning: [
      "Number of entry and exit lanes",
      "Vehicle recognition or ticketing preference",
      "Payment and management workflow",
      "Existing equipment and integration requirements",
    ],
    questions: [
      {
        q: "Can you help plan an entrance configuration?",
        a: "Send the number of lanes, lane widths, traffic flow and preferred entry method. We can review the required equipment and prepare a project-specific proposal.",
      },
      {
        q: "Will a system connect to my payment provider?",
        a: "Payment and software integration are project-specific. Provide the provider, country and technical requirements so compatibility and scope can be checked before quotation.",
      },
      {
        q: "Where can I find the full specifications?",
        a: "Request the relevant model specifications and configuration details with your enquiry. Parking equipment is quoted to your project requirements.",
      },
    ],
  },
  {
    slug: "access-control",
    name: "Access control",
    shortName: "Access",
    label: "People & controlled spaces",
    headline: "Access control.\nEvery entrance considered.",
    description:
      "Discuss pedestrian gates, identity terminals and access requirements for buildings and managed sites.",
    image: "/images/access-systems.webp",
    imageAlt:
      "Category illustration of pedestrian gates and face recognition terminals",
    intro:
      "A useful access plan starts with the people using it. Define the entry process, passage requirements and existing systems before choosing the equipment.",
    applications: [
      "Office buildings",
      "Industrial sites",
      "Education facilities",
      "Managed public entrances",
    ],
    options: [
      {
        title: "Pedestrian gates",
        text: "Plan lane widths, passage direction and expected pedestrian flow.",
      },
      {
        title: "Identity & entry terminals",
        text: "Discuss card, face recognition or other identification needs with your preferred access process.",
      },
      {
        title: "System coordination",
        text: "Specify the existing controller, management platform and entry or exit connections you need.",
      },
    ],
    planning: [
      "Entrance layout and passage width",
      "Expected pedestrian flow",
      "Preferred identification method",
      "Accessibility and existing system requirements",
    ],
    questions: [
      {
        q: "Which access products are suitable for my project?",
        a: "Share your entrance layout, expected traffic and preferred identity method. The equipment and configuration will be selected against those requirements.",
      },
      {
        q: "Can I keep my existing access platform?",
        a: "Tell us the platform, controller and available interfaces. Integration must be confirmed for the specific equipment before quotation.",
      },
      {
        q: "Are the images specific product specifications?",
        a: "The image illustrates the product category. Request the model documents, dimensions and configuration for the equipment proposed for your site.",
      },
    ],
  },
];
export type Product = {
  slug: string;
  model: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  highlights: string[];
  specs: [string, string][];
  download?: string;
};
export const products: Product[] = [
  {
    slug: "lc-led-ab80",
    model: "LC-LED-AB80",
    title: "80 W LED street light",
    category: "smart-lighting",
    image: "/images/led-ab80.webp",
    summary:
      "An AC-powered street luminaire with 80 Bridgelux 3030 LEDs and an ADC12 die-cast aluminium housing.",
    highlights: [
      "80 W rated power",
      "80 Bridgelux 3030 LEDs",
      "IP65 enclosure",
    ],
    specs: [
      ["Rated power", "80 W"],
      ["LED quantity", "80 pcs"],
      ["Colour temperature", "5000 K"],
      ["Colour rendering index", "Ra 70"],
      ["Housing", "ADC12 die-cast aluminium"],
      ["Protection rating", "IP65"],
      ["Dimensions", "505 × 210 × 105 mm"],
      ["Net weight", "2.3 kg"],
    ],
  },
  {
    slug: "lc-led-aa50",
    model: "LC-LED-AA50",
    title: "LED street luminaire",
    category: "smart-lighting",
    image: "/images/led-aa50.webp",
    summary:
      "A street lighting range with power configurations specified in the supplied model documentation.",
    highlights: [
      "30 / 50 / 100 W options",
      "Bridgelux 3030 LEDs",
      "IP66 enclosure",
    ],
    specs: [
      ["Power options", "30 / 50 / 100 W; confirm configuration"],
      ["Input voltage", "85–265 VAC"],
      ["LED quantity", "50 pcs in documented configuration"],
      ["Colour temperature", "5000 K"],
      ["Protection rating", "IP66"],
      ["Dimensions", "520 × 210 × 80 mm"],
    ],
  },
  {
    slug: "lc-led-4a1",
    model: "LC-LED-4A1",
    title: "30 W modular street light",
    category: "smart-lighting",
    image: "/images/led-4a1.webp",
    summary:
      "The 30 W, 24-LED configuration in the 4A street lighting range. Other wattages are separate configurations.",
    highlights: [
      "30 W configuration",
      "24 Bridgelux 3030 LEDs",
      "AC 85–265 V input",
    ],
    specs: [
      ["This configuration", "30 W / 24 LEDs"],
      ["LED source", "Bridgelux SMD 3030"],
      ["Input voltage", "AC 85–265 V"],
      ["Power factor", "≥ 0.97"],
      ["Surge protection", "6 kV"],
      ["Series wattages", "30 / 40 / 60 / 90 / 120 / 150 W"],
    ],
  },
  {
    slug: "lc-jtp-ld01",
    model: "LC-JTP-LD01",
    title: "Radar speed feedback display",
    category: "traffic-safety",
    image: "/images/radar-ld01.webp",
    summary:
      "A display-focused radar unit with a reflective speed-limit decal and a three-digit speed readout.",
    highlights: [
      "24 GHz radar",
      "Three-digit speed display",
      "Reflective speed-limit decal",
    ],
    specs: [
      ["Radar", "24 GHz RF radar"],
      ["Speed range", "1–199 km/h"],
      ["Measurement distance", "1–150 m"],
      ["Specified accuracy", "±5 km/h"],
      ["Enclosure", "850 × 450 × 100 mm"],
      ["Standard supply", "AC 100–240 V"],
      [
        "Optional supply",
        "DC 12 V for solar/battery projects; confirm configuration",
      ],
    ],
    download: "/downloads/lc-jtp-ld01-specification.docx",
  },
  {
    slug: "lc-jtp-ld02",
    model: "LC-JTP-LD02",
    title: "Radar display with warning lights",
    category: "traffic-safety",
    image: "/images/radar-ld02.webp",
    summary:
      "A three-digit radar speed display with selectable speed-limit display arrangements and warning lights.",
    highlights: [
      "24 GHz radar",
      "LED or decal speed limit",
      "Warning light configuration",
    ],
    specs: [
      ["Radar", "24 GHz RF radar"],
      ["Speed range", "1–180 km/h"],
      ["Measurement distance", "1–100 m"],
      ["Specified accuracy", "±5 km/h"],
      ["Enclosure", "1100 × 600 × 100 mm"],
      ["Standard supply", "AC 100–240 V"],
    ],
    download: "/downloads/lc-jtp-ld02-specification.docx",
  },
  {
    slug: "lc-jtp-cs02h",
    model: "LC-JTP-CS02H",
    title: "Radar & plate capture system",
    category: "traffic-safety",
    image: "/images/radar-cs02h.webp",
    summary:
      "A camera-equipped roadside system combining radar speed measurement, vehicle capture and an information display.",
    highlights: [
      "4 MP LPR camera",
      "24.15 GHz radar",
      "LED information display",
    ],
    specs: [
      ["Camera resolution", "2560 × 1440"],
      ["Radar", "24.15 GHz"],
      ["Radar speed range", "1–250 km/h"],
      ["Specified radar error", "±1 km/h"],
      ["Camera lane coverage", "1–3 lanes"],
      ["Enclosure", "955 × 530 × 105 mm"],
    ],
    download: "/downloads/lc-jtp-cs02h-specification.pdf",
  },
  {
    slug: "lc-jtp-cs06h",
    model: "LC-JTP-CS06H",
    title: "Radar capture & message display",
    category: "traffic-safety",
    image: "/images/radar-cs06h.webp",
    summary:
      "A roadside radar and vehicle-capture system with a P5 full-colour information display.",
    highlights: ["4 MP camera", "P5 full-colour display", "24.15 GHz radar"],
    specs: [
      ["Camera resolution", "2560 × 1440"],
      ["Radar speed range", "1–250 km/h"],
      ["Specified radar error", "±1 km/h"],
      ["Information display", "P5 full-colour"],
      ["Enclosure", "1200 × 690 × 115 mm"],
      ["Standard supply", "AC 100–240 V"],
      ["System power", "80 W; power-saving mode 60 W"],
    ],
    download: "/downloads/lc-jtp-cs06h-specification.docx",
  },
];
export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
