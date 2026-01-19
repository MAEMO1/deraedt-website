import { Header, Footer, CookieBanner, ScrollToTop } from "@/components/shared";
import { ScrollProgress, ScrollToTopWithProgress } from "@/components/animations";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <ScrollToTopWithProgress />
    </>
  );
}
