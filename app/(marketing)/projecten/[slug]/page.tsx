import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Building2,
  Tag,
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
  Target,
  Award,
} from "lucide-react";
import { FEATURED_PROJECTS, PROJECT_CATEGORIES } from "@/lib/constants";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Project KPIs - these would typically come from a CMS or database
const projectKPIs = {
  planning: "100%",
  planningLabel: "Planning gehaald",
  safety: "0",
  safetyLabel: "Veiligheidsincidenten",
  quality: "100%",
  qualityLabel: "Eerste-keer-goed",
  satisfaction: "9.2",
  satisfactionLabel: "Klanttevredenheid",
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

          {/* Scope badge */}
          {project.scope && (
            <div className="inline-flex items-center gap-2 bg-[#9A6B4C] text-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] mb-6">
              <Shield className="w-3.5 h-3.5" />
              {project.scope}
            </div>
          )}

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

      {/* KPI Bar - Procurement Scorable */}
      <section className="bg-[#0C0C0C] border-t border-white/10">
        <div className="container-wide py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                <Clock className="w-4 h-4" />
              </div>
              <div className="font-display text-3xl text-white">{projectKPIs.planning}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1">
                {projectKPIs.planningLabel}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                <Shield className="w-4 h-4" />
              </div>
              <div className="font-display text-3xl text-white">{projectKPIs.safety}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1">
                {projectKPIs.safetyLabel}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                <Target className="w-4 h-4" />
              </div>
              <div className="font-display text-3xl text-white">{projectKPIs.quality}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1">
                {projectKPIs.qualityLabel}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                <Award className="w-4 h-4" />
              </div>
              <div className="font-display text-3xl text-white">{projectKPIs.satisfaction}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1">
                {projectKPIs.satisfactionLabel}
              </div>
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

              {/* Challenge Section */}
              <div className="mt-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-[#9A6B4C]" />
                  <span className="label-overline">De Uitdaging</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl text-[#0C0C0C]">
                  Projectomschrijving
                </h2>

                <div className="mt-8 space-y-6 text-[#6B6560] leading-relaxed">
                  <p className="text-lg">{project.description}</p>
                  <p>
                    Dit project vereiste een grondige aanpak met aandacht voor de specifieke
                    eisen van de opdrachtgever. De uitdaging lag in het combineren van
                    kwaliteit, veiligheid en efficiëntie binnen de gestelde termijn.
                  </p>
                </div>
              </div>

              {/* Approach Section */}
              <div className="mt-16">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-[#9A6B4C]" />
                  <span className="label-overline">Onze Aanpak</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl text-[#0C0C0C]">
                  Hoe wij dit project aanpakten
                </h2>

                <div className="mt-8 space-y-4">
                  {[
                    "Grondige voorbereiding en planning in overleg met de opdrachtgever",
                    "Inzet van ervaren vakmensen met relevante expertise",
                    "Strikte naleving van veiligheidsprotocollen (VCA**)",
                    "Wekelijkse voortgangsrapportage en transparante communicatie",
                    "Kwaliteitscontroles conform ISO 9001 standaarden",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#9A6B4C] flex-shrink-0 mt-0.5" />
                      <span className="text-[#6B6560]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results Section */}
              <div className="mt-16">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-[#9A6B4C]" />
                  <span className="label-overline">Resultaat</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl text-[#0C0C0C]">
                  Wat wij bereikten
                </h2>

                <div className="mt-8 grid sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 border border-[#0C0C0C]/5">
                    <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-2">
                      Planning
                    </div>
                    <div className="font-display text-2xl text-[#0C0C0C]">
                      Binnen termijn
                    </div>
                    <p className="mt-2 text-sm text-[#6B6560]">
                      Project opgeleverd volgens afgesproken planning
                    </p>
                  </div>
                  <div className="bg-white p-6 border border-[#0C0C0C]/5">
                    <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-2">
                      Veiligheid
                    </div>
                    <div className="font-display text-2xl text-[#0C0C0C]">
                      0 incidenten
                    </div>
                    <p className="mt-2 text-sm text-[#6B6560]">
                      Volledige naleving VCA** veiligheidsprotocollen
                    </p>
                  </div>
                  <div className="bg-white p-6 border border-[#0C0C0C]/5">
                    <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-2">
                      Kwaliteit
                    </div>
                    <div className="font-display text-2xl text-[#0C0C0C]">
                      ISO 9001
                    </div>
                    <p className="mt-2 text-sm text-[#6B6560]">
                      Alle werken conform kwaliteitsstandaarden
                    </p>
                  </div>
                  <div className="bg-white p-6 border border-[#0C0C0C]/5">
                    <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-2">
                      Hinderbeperking
                    </div>
                    <div className="font-display text-2xl text-[#0C0C0C]">
                      Minimaal
                    </div>
                    <p className="mt-2 text-sm text-[#6B6560]">
                      Efficiënte fasering voor minimale overlast
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Project Details Card */}
                <div className="bg-white p-8 border border-[#0C0C0C]/5">
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

                    {project.scope && (
                      <div className="pb-4 border-b border-[#0C0C0C]/5">
                        <div className="text-[10px] text-[#9A6B4C] uppercase tracking-[0.2em] mb-1">
                          Projecttype
                        </div>
                        <div className="font-semibold text-[#0C0C0C]">
                          {project.scope}
                        </div>
                      </div>
                    )}

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

                {/* Certifications Card */}
                <div className="bg-[#0C0C0C] p-8 text-white">
                  <h3 className="font-display text-lg mb-4">
                    Kwaliteitsgarantie
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-[#9A6B4C]" />
                      Klasse 6 erkend
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-[#9A6B4C]" />
                      ISO 9001 gecertificeerd
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-[#9A6B4C]" />
                      VCA** veiligheid
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-[#9A6B4C]" />
                      CO₂-Prestatieladder niveau 3
                    </div>
                  </div>
                  <Link
                    href="/procurement"
                    className="inline-flex items-center gap-2 text-[#9A6B4C] text-sm font-semibold mt-6 hover:text-[#BA8B6C] transition-colors"
                  >
                    Alle certificaten
                    <ArrowRight className="w-3 h-3" />
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
