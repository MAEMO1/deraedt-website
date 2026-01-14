import {
  Hero,
  Services,
  ClientLogos,
  FeaturedProjects,
  AboutTeaser,
  Certifications,
  CTASection,
} from "@/components/marketing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ClientLogos />
      <FeaturedProjects />
      <AboutTeaser />
      <Certifications />
      <CTASection />
    </>
  );
}
