import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowLeft,
  Calendar,
  Building2,
  Tag,
  ArrowRight,
  CheckCircle,
  Shield,
} from "lucide-react";
import { FEATURED_PROJECTS, PROJECT_CATEGORIES } from "@/lib/constants";

interface ProjectPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug, locale } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);
  const t = await getTranslations({ locale, namespace: 'projectDetail' });

  if (!project) {
    return {
      title: t('notFound'),
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'projectDetail' });
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);
  const projectIndex = FEATURED_PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = FEATURED_PROJECTS[(projectIndex + 1) % FEATURED_PROJECTS.length];

  if (!project) {
    notFound();
  }

  const categoryLabel = PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label || project.category;
  const approachItems = [
    t('approach.items.0'),
    t('approach.items.1'),
    t('approach.items.2'),
    t('approach.items.3'),
    t('approach.items.4'),
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-[#112337] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-[#112337]/50 to-[#112337]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#112337]/70 to-transparent" />
        </div>

        <div className="container-wide relative pb-20 pt-48">
          {/* Back link */}
          <Link
            href="/projecten"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToProjects')}
          </Link>

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Scope badge */}
            {project.scope && (
              <div className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-semibold">
                <Shield className="w-4 h-4" />
                {project.scope}
              </div>
            )}

            {/* Category */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              {categoryLabel}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            {project.title}
          </h1>

          {/* Meta info */}
          <div className="mt-8 flex flex-wrap items-center gap-8 text-white/50">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-[#204CE5]" />
              <span>{project.client}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#204CE5]" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-[#204CE5]" />
              <span>{categoryLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-spacing bg-[#F5F5F5]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden rounded-xl bg-[#112337]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Challenge Section */}
              <div className="mt-12">
                <span className="label-overline">{t('challenge.badge')}</span>

                <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
                  {t('challenge.title')}
                </h2>

                <div className="mt-8 space-y-6 text-[#686E77] leading-relaxed">
                  <p className="text-lg">{project.description}</p>
                  <p>{t('challenge.description')}</p>
                </div>
              </div>

              {/* Approach Section */}
              <div className="mt-16">
                <span className="label-overline">{t('approach.badge')}</span>

                <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
                  {t('approach.title')}
                </h2>

                <div className="mt-8 space-y-4">
                  {approachItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#204CE5] flex-shrink-0 mt-0.5" />
                      <span className="text-[#686E77]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results Section */}
              <div className="mt-16">
                <span className="label-overline">{t('results.badge')}</span>

                <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#112337]">
                  {t('results.title')}
                </h2>

                <div className="mt-8 grid sm:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6">
                    <div className="text-xs text-[#204CE5] uppercase tracking-wider font-semibold mb-2">
                      {t('results.planning.label')}
                    </div>
                    <div className="text-2xl font-bold text-[#112337]">
                      {t('results.planning.value')}
                    </div>
                    <p className="mt-2 text-sm text-[#686E77]">
                      {t('results.planning.description')}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6">
                    <div className="text-xs text-[#204CE5] uppercase tracking-wider font-semibold mb-2">
                      {t('results.safety.label')}
                    </div>
                    <div className="text-2xl font-bold text-[#112337]">
                      {t('results.safety.value')}
                    </div>
                    <p className="mt-2 text-sm text-[#686E77]">
                      {t('results.safety.description')}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6">
                    <div className="text-xs text-[#204CE5] uppercase tracking-wider font-semibold mb-2">
                      {t('results.quality.label')}
                    </div>
                    <div className="text-2xl font-bold text-[#112337]">
                      {t('results.quality.value')}
                    </div>
                    <p className="mt-2 text-sm text-[#686E77]">
                      {t('results.quality.description')}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6">
                    <div className="text-xs text-[#204CE5] uppercase tracking-wider font-semibold mb-2">
                      {t('results.disruption.label')}
                    </div>
                    <div className="text-2xl font-bold text-[#112337]">
                      {t('results.disruption.value')}
                    </div>
                    <p className="mt-2 text-sm text-[#686E77]">
                      {t('results.disruption.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Project Details Card */}
                <div className="bg-white rounded-xl p-8">
                  <h3 className="text-xl font-bold text-[#112337] mb-6">
                    {t('sidebar.projectDetails')}
                  </h3>

                  <div className="space-y-6">
                    <div className="pb-4 border-b border-[#112337]/5">
                      <div className="text-xs text-[#204CE5] uppercase tracking-wider font-semibold mb-1">
                        {t('sidebar.client')}
                      </div>
                      <div className="font-semibold text-[#112337]">
                        {project.client}
                      </div>
                    </div>

                    <div className="pb-4 border-b border-[#112337]/5">
                      <div className="text-xs text-[#204CE5] uppercase tracking-wider font-semibold mb-1">
                        {t('sidebar.year')}
                      </div>
                      <div className="font-semibold text-[#112337]">
                        {project.year}
                      </div>
                    </div>

                    <div className="pb-4 border-b border-[#112337]/5">
                      <div className="text-xs text-[#204CE5] uppercase tracking-wider font-semibold mb-1">
                        {t('sidebar.category')}
                      </div>
                      <div className="font-semibold text-[#112337]">
                        {categoryLabel}
                      </div>
                    </div>

                    {project.scope && (
                      <div className="pb-4 border-b border-[#112337]/5">
                        <div className="text-xs text-[#204CE5] uppercase tracking-wider font-semibold mb-1">
                          {t('sidebar.projectType')}
                        </div>
                        <div className="font-semibold text-[#112337]">
                          {project.scope}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="text-xs text-[#204CE5] uppercase tracking-wider font-semibold mb-1">
                        {t('sidebar.status')}
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="font-semibold text-[#112337]">{t('sidebar.completed')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-[#112337]/5">
                    <Link
                      href="/projectplanner"
                      className="group flex items-center justify-center gap-3 w-full bg-[#204CE5] text-white px-6 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8]"
                    >
                      {t('sidebar.startProject')}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-3 w-full mt-3 border border-[#112337]/20 text-[#112337] px-6 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#112337] hover:text-white hover:border-[#112337]"
                    >
                      {t('sidebar.contactUs')}
                    </Link>
                  </div>
                </div>

                {/* Certifications Card */}
                <div className="bg-[#112337] rounded-xl p-8 text-white">
                  <h3 className="text-lg font-bold mb-4">
                    {t('certifications.title')}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-[#204CE5]" />
                      {t('certifications.klasse6')}
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-[#204CE5]" />
                      {t('certifications.iso')}
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-[#204CE5]" />
                      {t('certifications.vca')}
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="w-4 h-4 text-[#204CE5]" />
                      {t('certifications.co2')}
                    </div>
                  </div>
                  <Link
                    href="/procurement"
                    className="inline-flex items-center gap-2 text-[#204CE5] text-sm font-semibold mt-6 hover:text-white transition-colors"
                  >
                    {t('certifications.viewAll')}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="py-24 bg-[#112337]">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium">
              {t('nextProject.badge')}
            </span>
          </div>

          <Link href={`/projecten/${nextProject.slug}`} className="group block">
            <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
              <Image
                src={nextProject.image}
                alt={nextProject.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#112337]/60 group-hover:bg-[#112337]/40 transition-colors duration-500" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                    {nextProject.title}
                  </h3>
                  <p className="mt-4 text-white/50">{nextProject.client}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[#204CE5]">
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      {t('nextProject.viewProject')}
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
