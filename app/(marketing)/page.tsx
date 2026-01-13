import {
  Hero,
  Services,
  FeaturedProjects,
  AboutTeaser,
  CertificateBar,
  CTASection,
} from "@/components/marketing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      <AboutTeaser />
      <CertificateBar />
      <CTASection />
    </>
  );
}
