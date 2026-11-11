import { notFound } from "next/navigation";
import { getSolution, solutions } from "@/content/site";
import { SolutionPage } from "@/components/solution-page";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSolution(slug);
  return s
    ? {
        ...pageMetadata(
          `${s.name} for Your Project`,
          s.description,
          `/solutions/${slug}/`,
        ),
        robots: { index: false, follow: true },
      }
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();
  return <SolutionPage solution={s} campaign />;
}
