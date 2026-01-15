import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Building2, Tag, ArrowRight } from "lucide-react";
import { FEATURED_PROJECTS, PROJECT_CATEGORIES } from "@/lib/constants";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

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
  const projectIndex = FEATURED_PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = FEATURED_PROJECTS[(projectIndex + 1) % FEATURED_PROJECTS.length];

  if (!project) {
    notFound();
  }

  const categoryLabel = PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label || project.category;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-[#0C0C0C] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover image-cinematic"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/50 to-[#0C0C0C]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C]/70 to-transparent" />
        </div>

        <div className="container-wide relative pb-20 pt-48">
          {/* Back link */}
          <Link
            href="/projecten"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar projecten
          </Link>

          {/* Category */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#9A6B4C]" />
            <span className="label-overline">{categoryLabel}</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-[0.95] tracking-[-0.02em] max-w-3xl">
            {project.title}
          </h1>

          {/* Meta info */}
          <div className="mt-8 flex flex-wrap items-center gap-8 text-white/50">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-[#9A6B4C]" />
              <span>{project.client}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#9A6B4C]" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-[#9A6B4C]" />
              <span>{categoryLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-spacing bg-[#FAF7F2] relative">
        <div className="absolute inset-0 grid-blueprint opacity-40" />

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden bg-[#0C0C0C]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-[#9A6B4C]" />
                  <span className="label-overline">Over dit project</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl text-[#0C0C0C]">
                  Projectomschrijving
                </h2>

                <div className="mt-8 space-y-6 text-[#6B6560] leading-relaxed">
                  <p className="text-lg">{project.description}</p>
                  <p>
                    Dit project werd uitgevoerd met de hoogste kwaliteitsstandaarden
                    en binnen de afgesproken termijn. Ons team van ervaren
                    vakmensen heeft elke fase van het project met zorg en precisie
                    uitgevoerd.
                  </p>
                  <p>
                    Bij De Raedt hechten wij groot belang aan transparante communicatie
                    met onze opdrachtgevers. Gedurende het volledige project blijven
                    wij in nauw contact om de voortgang te bespreken en eventuele
                    wijzigingen tijdig door te voeren.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-white p-8 border border-[#0C0C0C]/5">
                <h3 className="font-display text-xl text-[#0C0C0C] mb-6">
                  Projectgegevens
                </h3>

                <div className="space-y-6">
                  <div className="pb-4 border-b border-[#0C0C0C]/5">
                    <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-1">
                      Opdrachtgever
                    </div>
                    <div className="font-semibold text-[#0C0C0C]">
                      {project.client}
                    </div>
                  </div>

                  <div className="pb-4 border-b border-[#0C0C0C]/5">
                    <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-1">
                      Jaar
                    </div>
                    <div className="font-semibold text-[#0C0C0C]">
                      {project.year}
                    </div>
                  </div>

                  <div className="pb-4 border-b border-[#0C0C0C]/5">
                    <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-1">
                      Categorie
                    </div>
                    <div className="font-semibold text-[#0C0C0C]">
                      {categoryLabel}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-1">
                      Status
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="font-semibold text-[#0C0C0C]">Afgerond</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[#0C0C0C]/5">
                  <Link
                    href="/projectplanner"
                    className="group flex items-center justify-center gap-3 w-full bg-[#9A6B4C] text-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#7A5339]"
                  >
                    Start uw project
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-3 w-full mt-3 border border-[#0C0C0C]/20 text-[#0C0C0C] px-6 py-4 text-sm font-medium transition-all duration-300 hover:bg-[#0C0C0C] hover:text-white hover:border-[#0C0C0C]"
                  >
                    Contact opnemen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="py-24 bg-[#0C0C0C] relative">
        <div className="absolute inset-0 texture-stone opacity-30" />

        <div className="container-wide relative">
          <div className="text-center mb-12">
            <span className="label-overline">Volgend Project</span>
          </div>

          <Link href={`/projecten/${nextProject.slug}`} className="group block">
            <div className="relative aspect-[21/9] overflow-hidden">
              <Image
                src={nextProject.image}
                alt={nextProject.title}
                fill
                className="object-cover image-cinematic transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0C0C0C]/60 group-hover:bg-[#0C0C0C]/40 transition-colors duration-500" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">
                    {nextProject.title}
                  </h3>
                  <p className="mt-4 text-white/50">{nextProject.client}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[#9A6B4C]">
                    <span className="text-sm font-semibold uppercase tracking-[0.15em]">
                      Bekijk project
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
