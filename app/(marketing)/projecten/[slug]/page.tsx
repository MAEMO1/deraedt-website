import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Building, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FEATURED_PROJECTS } from "@/lib/constants";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabels: Record<string, string> = {
  erfgoed: "Erfgoed",
  onderwijs: "Onderwijs",
  zorg: "Zorg",
  residentieel: "Residentieel",
  infrastructuur: "Infrastructuur",
  overheid: "Overheid",
};

export async function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project niet gevonden",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-[#1E3A5F]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="container-custom relative z-10 flex h-full flex-col justify-end pb-12">
          <Link
            href="/projecten"
            className="mb-6 inline-flex items-center text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar projecten
          </Link>
          <Badge className="mb-4 w-fit bg-white/20 text-white hover:bg-white/30">
            {categoryLabels[project.category] || project.category}
          </Badge>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="aspect-video overflow-hidden rounded-2xl bg-gray-100">
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  Project afbeelding
                </div>
              </div>

              <div className="mt-8 prose max-w-none">
                <h2 className="text-2xl font-bold text-[#1E3A5F]">
                  Over dit project
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  {project.description}
                </p>

                <h3 className="mt-8 text-xl font-semibold text-[#1E3A5F]">
                  Projectdetails
                </h3>
                <p className="mt-4 text-gray-600">
                  Dit project werd uitgevoerd met de hoogste kwaliteitsstandaarden
                  en binnen de afgesproken termijn. Ons team van ervaren
                  vakmensen heeft elke fase van het project met zorg en precisie
                  uitgevoerd.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-gray-100 bg-[#F7FAFC] p-6">
                <h3 className="text-lg font-semibold text-[#1E3A5F]">
                  Projectgegevens
                </h3>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="mt-0.5 h-5 w-5 text-[#4299E1]" />
                    <div>
                      <div className="text-sm text-gray-500">Opdrachtgever</div>
                      <div className="font-medium text-[#1E3A5F]">
                        {project.client}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-5 w-5 text-[#4299E1]" />
                    <div>
                      <div className="text-sm text-gray-500">Jaar</div>
                      <div className="font-medium text-[#1E3A5F]">
                        {project.year}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-[#4299E1]" />
                    <div>
                      <div className="text-sm text-gray-500">Categorie</div>
                      <div className="font-medium text-[#1E3A5F]">
                        {categoryLabels[project.category] || project.category}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button asChild className="w-full">
                    <Link href="/contact">Contact opnemen</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
