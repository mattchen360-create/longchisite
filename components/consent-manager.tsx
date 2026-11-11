"use client";
import { useEffect, useState } from "react";
import { attributionKeys, type Consent } from "@/lib/tracking";
const preferenceKey = "longchi-consent-v1";
export function ConsentManager({
  googleTagId,
  googleAdsId,
  conversionLabel,
}: {
  googleTagId?: string;
  googleAdsId?: string;
  conversionLabel?: string;
}) {
  const [visible, setVisible] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  useEffect(() => {
    window.longchiMeasurement = { adsId: googleAdsId, conversionLabel };
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function () {
        window.dataLayer.push(arguments);
      };
    window.gtag("consent", "default", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    const open = () => {
      setVisible(true);
      setCustom(true);
    };
    window.addEventListener("open-cookie-settings", open);
    let saved: Consent | null = null;
    try {
      const parsed = JSON.parse(localStorage.getItem(preferenceKey) || "null");
      if (
        parsed &&
        typeof parsed.analytics === "boolean" &&
        typeof parsed.advertising === "boolean"
      )
        saved = parsed;
    } catch {}
    if (saved) {
      setAnalytics(saved.analytics);
      setAdvertising(saved.advertising);
      applyConsent(saved, googleTagId);
    } else {
      window.longchiConsent = { analytics: false, advertising: false };
      setVisible(true);
    }
    return () => window.removeEventListener("open-cookie-settings", open);
  }, [googleTagId, googleAdsId, conversionLabel]);
  function choose(consent: Consent) {
    applyConsent(consent, googleTagId);
    try {
      localStorage.setItem(
        preferenceKey,
        JSON.stringify({ ...consent, updatedAt: new Date().toISOString() }),
      );
    } catch {}
    setAnalytics(consent.analytics);
    setAdvertising(consent.advertising);
    setVisible(false);
    setCustom(false);
  }
  if (!visible) return null;
  return (
    <section className="cookie-panel" aria-label="Cookie preferences">
      <div>
        <h2>Your privacy choices</h2>
        <p>
          Essential storage keeps your preferences working. Optional tools help
          us understand visits and enquiries.{" "}
          <a href="/privacy/">Privacy notice</a>.
        </p>
      </div>
      {custom && (
        <div className="cookie-toggles">
          <label>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />{" "}
            Analytics
          </label>
          <label>
            <input
              type="checkbox"
              checked={advertising}
              onChange={(e) => setAdvertising(e.target.checked)}
            />{" "}
            Advertising measurement
          </label>
        </div>
      )}
      <div className="cookie-actions">
        <button
          onClick={() => choose({ analytics: false, advertising: false })}
        >
          Essential only
        </button>
        {custom ? (
          <button onClick={() => choose({ analytics, advertising })}>
            Save choices
          </button>
        ) : (
          <button onClick={() => setCustom(true)}>Manage choices</button>
        )}
        <button
          className="cookie-accept"
          onClick={() => choose({ analytics: true, advertising: true })}
        >
          Accept optional
        </button>
      </div>
    </section>
  );
}
function applyConsent(consent: Consent, tagId?: string) {
  window.longchiConsent = consent;
  window.gtag?.("consent", "update", {
    ad_storage: consent.advertising ? "granted" : "denied",
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_user_data: consent.advertising ? "granted" : "denied",
    ad_personalization: "denied",
  });
  if (consent.advertising) {
    const params = new URLSearchParams(location.search);
    const data: Record<string, string> = {};
    for (const key of attributionKeys) {
      const value = params.get(key);
      if (value) data[key] = value.slice(0, 240);
    }
    if (Object.keys(data).length) {
      window.longchiSessionAttribution = {
        ...data,
        landing_page: location.pathname,
      };
      try {
        sessionStorage.setItem(
          "longchi-attribution",
          JSON.stringify(window.longchiSessionAttribution),
        );
      } catch {}
    }
  } else {
    window.longchiSessionAttribution = {};
    try {
      sessionStorage.removeItem("longchi-attribution");
    } catch {}
  }
  if (
    (consent.analytics || consent.advertising) &&
    tagId &&
    /^(G|AW)-[A-Z0-9]+$/.test(tagId) &&
    !document.getElementById("longchi-google-tag")
  ) {
    const script = document.createElement("script");
    script.id = "longchi-google-tag";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`;
    document.head.appendChild(script);
    window.gtag?.("js", new Date());
    window.gtag?.("config", tagId, { allow_ad_personalization_signals: false });
    const adsId = window.longchiMeasurement?.adsId;
    if (adsId && /^AW-\d+$/.test(adsId) && adsId !== tagId) {
      window.gtag?.("config", adsId, {
        allow_ad_personalization_signals: false,
      });
    }
  }
}
