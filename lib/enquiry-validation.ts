const categories = new Set([
  "smart-lighting",
  "traffic-safety",
  "smart-parking",
  "access-control",
  "multiple",
  "company-enquiry",
]);
export type ValidatedEnquiry = {
  name: string;
  email: string;
  category: string;
  country: string;
  message: string;
  model: string;
  sourcePath: string;
  idempotencyKey: string;
  attribution: Record<string, string>;
  measurementConsent: { analytics: boolean; advertising: boolean };
};
export function validateEnquiry(input: unknown): ValidatedEnquiry {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Please check your enquiry details.");
  const data = input as Record<string, unknown>;
  const str = (key: string, max: number) => {
    const value = data[key];
    if (value == null) return "";
    if (typeof value !== "string" || value.length > max)
      throw new Error(`Please check the ${key} field.`);
    return value.trim();
  };
  const name = str("name", 100),
    email = str("email", 200),
    category = str("category", 40),
    country = str("country", 80),
    message = str("message", 4000),
    model = str("model", 80),
    sourcePath = str("sourcePath", 200),
    idempotencyKey = str("idempotencyKey", 80);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Please enter a valid email address.");
  if (!categories.has(category))
    throw new Error("Please select a product line.");
  if (!country) throw new Error("Please enter your project country.");
  if (data.contactConsent !== "yes")
    throw new Error(
      "Please confirm permission to contact you about your enquiry.",
    );
  if (!/^[a-f0-9-]{36}$/i.test(idempotencyKey))
    throw new Error("Please refresh the page and try again.");
  const consent = data.measurementConsent as
    Record<string, unknown> | undefined;
  const measurementConsent = {
    analytics: consent?.analytics === true,
    advertising: consent?.advertising === true,
  };
  const attribution: Record<string, string> = {};
  if (
    measurementConsent.advertising &&
    data.attribution &&
    typeof data.attribution === "object"
  ) {
    const incoming = data.attribution as Record<string, unknown>;
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "wbraid",
      "gbraid",
      "msclkid",
      "landing_page",
    ]) {
      if (typeof incoming[key] === "string")
        attribution[key] = incoming[key].slice(0, 240);
    }
  }
  return {
    name,
    email,
    category,
    country,
    message,
    model,
    sourcePath: sourcePath.startsWith("/") ? sourcePath : "/",
    idempotencyKey,
    attribution,
    measurementConsent,
  };
}
