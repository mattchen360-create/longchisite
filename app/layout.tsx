import type { Metadata } from "next";
import { env } from "cloudflare:workers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ConsentManager } from "@/components/consent-manager";
import { site } from "@/content/site";
import "./site.css";
import "./redesign.css";
import "./ambience.css";
import "./atlas.css";
import "./home-sections.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: "LONGCHI SMART | Lighting, Traffic, Parking & Access",
    template: "%s | LONGCHI SMART",
  },
  description:
    "Explore lighting, traffic safety, smart parking and access control solutions. Discuss the equipment for your next project.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <ConsentManager
          googleAdsId={
            (env as unknown as Record<string, string | undefined>).GOOGLE_ADS_ID
          }
          conversionLabel={
            (env as unknown as Record<string, string | undefined>)
              .GOOGLE_ADS_CONVERSION_LABEL
          }
          googleTagId={
            (env as unknown as Record<string, string | undefined>)
              .GOOGLE_TAG_ID ||
            (env as unknown as Record<string, string | undefined>).GOOGLE_ADS_ID
          }
        />
      </body>
    </html>
  );
}
