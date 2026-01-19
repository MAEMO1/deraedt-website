import { Header, Footer, CookieBanner } from "@/components/shared";
import { ScrollProgress, ScrollToTopWithProgress } from "@/components/animations";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <ScrollToTopWithProgress />
    </>
  );
}
