export type Consent = { analytics: boolean; advertising: boolean };
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    longchiConsent?: Consent;
    longchiSessionAttribution?: Record<string, string>;
    longchiMeasurement?: { adsId?: string; conversionLabel?: string };
  }
}
export const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "msclkid",
];
export function track(
  event: string,
  fields: Record<string, string | number> = {},
) {
  if (typeof window === "undefined") return;
  const consent = window.longchiConsent;
  if (
    !consent?.analytics &&
    !(event === "generate_lead" && consent?.advertising)
  )
    return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...fields });
  if (consent.analytics) window.gtag?.("event", event, fields);
  const config = window.longchiMeasurement;
  if (
    event === "generate_lead" &&
    consent.advertising &&
    config?.adsId &&
    /^AW-\d+$/.test(config.adsId) &&
    config.conversionLabel &&
    /^[A-Za-z0-9_-]+$/.test(config.conversionLabel)
  ) {
    window.gtag?.("event", "conversion", {
      send_to: `${config.adsId}/${config.conversionLabel}`,
      transaction_id: fields.lead_reference,
    });
  }
}
export function readAttribution() {
  if (typeof window === "undefined") return {};
  const result: Record<string, string> = {};
  if (window.longchiConsent?.advertising) {
    try {
      Object.assign(
        result,
        JSON.parse(sessionStorage.getItem("longchi-attribution") || "{}"),
      );
    } catch {}
    Object.assign(result, window.longchiSessionAttribution || {});
  }
  return result;
}
