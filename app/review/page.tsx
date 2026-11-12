import { HomePage } from "@/components/home-page";
export const metadata = {
  title: "首页板块筛选 | LONGCHI",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};
export default function HomeReview() {
  return <HomePage review />;
}
