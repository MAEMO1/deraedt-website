import {
  Hero,
  Services,
  ClientLogos,
  FeaturedProjects,
  AboutTeaser,
} from "@/components/marketing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Services />
      <FeaturedProjects />
      <AboutTeaser />
    </>
  );
}
