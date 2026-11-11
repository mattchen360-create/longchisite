import type { Metadata } from "next";
import { site } from "@/content/site";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = new URL(path, site.origin).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${site.origin}/images/factory-assembly.webp`,
          alt: "LONGCHI production assembly",
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
