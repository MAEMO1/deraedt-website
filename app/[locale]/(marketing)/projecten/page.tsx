"use client";

import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Search, ArrowUpRight, ArrowRight, ChevronRight, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FEATURED_PROJECTS, PROJECT_CATEGORIES, STATS, CERTIFICATIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Featured Project Card (larger, more prominent)
function FeaturedProjectCard({ project }: { project: (typeof FEATURED_PROJECTS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("projectsPage");

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group col-span-full lg:col-span-2"
    >
      <Link href={`/projecten/${project.slug}`} className="block">
        <div className="relative aspect-[21/9] overflow-hidden rounded-2xl lg:rounded-3xl bg-[#112337]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#112337]/95 via-[#112337]/60 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="p-8 lg:p-12 max-w-2xl">
              {/* Category badge */}
              <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                {PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label || project.category}
              </span>

              {/* Title */}
              <h3 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-lg mb-6 line-clamp-2">
                {project.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-6 text-sm text-white/40 mb-8">
                <span>{project.client}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>{project.year}</span>
              </div>

              {/* CTA */}
              <div className="inline-flex items-center gap-3 text-white font-semibold group-hover:text-[#204CE5] transition-colors">
                <span>{t("card.viewProject")}</span>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#204CE5] transition-all">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Regular Project Card
function ProjectCard({
  project,
  index,
}: {
  project: (typeof FEATURED_PROJECTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const t = useTranslations("projectsPage");

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/projecten/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#112337]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-[#112337]/40 to-transparent opacity-90" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {/* Category */}
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full w-fit mb-4">
              {PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label || project.category}
            </span>

            {/* Title */}
            <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight mb-2">
              {project.title}
            </h3>

            {/* Client & Year */}
            <div className="flex items-center gap-3 text-sm text-white/50">
              <span>{project.client}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{project.year}</span>
            </div>

            {/* Hover indicator */}
            <div className="mt-4 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-sm font-semibold text-[#204CE5]">
                {t("card.viewProject")}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#204CE5]" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Hero Section
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations("projectsPage");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const STAT_KEYS = ["yearsExperience", "recognition", "referenceProjects", "sectors"] as const;
  const STAT_VALUES = [STATS.yearsExperience.toString(), "Klasse 6", "5", "4"];

  return (
    <section ref={ref} className="relative min-h-[85vh] bg-[#112337] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/original-site/Koning-Boudewijn-Stadion.webp"
          alt="Koning Boudewijnstadion"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#112337] via-[#112337]/80 to-[#112337]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-transparent to-[#112337]/30" />
      </motion.div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative h-full">
        <div className="container-wide h-full flex flex-col justify-end pb-24 pt-48">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            {/* Left: Main content */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-8">
                  <span className="w-12 h-px bg-[#204CE5]" />
                  {t("hero.badge")}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[clamp(3rem,8vw,5.5rem)] font-bold text-white leading-[0.95] tracking-[-0.02em] mb-8"
              >
                {t("hero.titleLine1")}
                <br />
                <span className="text-[#204CE5]">{t("hero.titleLine2")}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl text-white/50 leading-relaxed max-w-lg mb-12"
              >
                {t("hero.description", { years: STATS.yearsExperience })}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="#projecten"
                  className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-[0_20px_40px_rgba(32,76,229,0.3)]"
                >
                  {t("hero.viewPortfolio")}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projectplanner"
                  className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 border border-white/10"
                >
                  <Play className="w-4 h-4" />
                  {t("hero.startProject")}
                </Link>
              </motion.div>
            </div>

            {/* Right: Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                {STAT_KEYS.map((key, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="text-3xl font-bold text-white mb-1">{STAT_VALUES[index]}</div>
                    <div className="text-sm text-white/40">{t(`stats.${key}`)}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Filter Bar Component
function FilterBar({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  projectCount,
}: {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  projectCount: number;
}) {
  const t = useTranslations("projectsPage");

  return (
    <section className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-xl border-b border-[#E5E7EB] py-4">
      <div className="container-wide">
        {/* Breadcrumb + Count */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-[#686E77]">
            <Link href="/" className="hover:text-[#204CE5] transition-colors">{t("filter.breadcrumbHome")}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#112337] font-medium">{t("filter.breadcrumbProjects")}</span>
          </div>
          <span className="text-sm text-[#686E77]">
            {projectCount === 1
              ? t("filter.projectCount", { count: projectCount })
              : t("filter.projectCountPlural", { count: projectCount })
            }
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  "px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 whitespace-nowrap",
                  activeCategory === category.value
                    ? "bg-[#112337] text-white"
                    : "bg-[#F5F5F5] text-[#686E77] hover:bg-[#112337]/5 hover:text-[#112337]"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#686E77]" />
            <Input
              type="search"
              placeholder={t("filter.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 py-5 bg-[#F5F5F5] border-0 rounded-xl text-sm placeholder:text-[#686E77]/50 focus:ring-2 focus:ring-[#204CE5]/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("projectsPage");

  const STAT_SECTION_KEYS = ["craftsmanship", "recognitionClass", "revenue", "employees"] as const;
  const STAT_SECTION_VALUES = [
    STATS.yearsExperience.toString(),
    "6",
    STATS.revenueDisplay.replace("€", ""),
    STATS.employees,
  ];
  const STAT_SUFFIXES = ["", "", "", "+"];

  return (
    <section ref={ref} className="py-20 bg-[#112337] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#204CE5] blur-[150px]" />
      </div>

      <div className="container-wide relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STAT_SECTION_KEYS.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-6xl font-bold text-[#204CE5] mb-2">
                {STAT_SECTION_VALUES[index]}{STAT_SUFFIXES[index]}
              </div>
              <div className="text-sm lg:text-base text-white/50 uppercase tracking-wider">
                {t(`stats.${key}`)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 pt-12 border-t border-white/10 flex flex-wrap justify-center gap-4"
        >
          {CERTIFICATIONS.filter(c => c.prominent).map((cert) => (
            <div
              key={cert.id}
              className="px-5 py-2.5 bg-white/5 rounded-full border border-white/10"
            >
              <span className="text-sm font-semibold text-white/70">{cert.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("projectsPage");

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-[#112337] to-[#1E3A5A] p-12 sm:p-16 lg:p-20 rounded-3xl overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#204CE5] blur-[100px]" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-3 text-[#204CE5] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
                <span className="w-12 h-px bg-[#204CE5]" />
                {t("cta.badge")}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {t("cta.title")}{" "}
                <span className="text-[#204CE5]">{t("cta.titleAccent")}</span>?
              </h2>
              <p className="mt-6 text-white/50 leading-relaxed text-lg">
                {t("cta.description")}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link
                href="/projectplanner"
                className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#4D6FEB] hover:shadow-[0_20px_40px_rgba(32,76,229,0.4)]"
              >
                {t("cta.startPlanner")}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 border border-white/10"
              >
                {t("cta.contactUs")}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Empty State
function EmptyState({ onReset }: { onReset: () => void }) {
  const t = useTranslations("projectsPage");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-24 text-center"
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-[#204CE5]/10 rounded-full">
        <Search className="h-8 w-8 text-[#204CE5]" />
      </div>
      <h3 className="text-2xl font-bold text-[#112337]">
        {t("empty.title")}
      </h3>
      <p className="mt-3 text-[#686E77]">
        {t("empty.description")}
      </p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#204CE5] hover:text-[#1A3BB8] transition-colors"
      >
        {t("empty.showAll")}
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// Main Page Component
export default function ProjectenPage() {
  const [activeCategory, setActiveCategory] = useState("alle");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = FEATURED_PROJECTS.filter((project) => {
    const matchesCategory =
      activeCategory === "alle" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleReset = () => {
    setActiveCategory("alle");
    setSearchQuery("");
  };

  // Split projects: first one is featured, rest are regular
  const featuredProject = filteredProjects[0];
  const regularProjects = filteredProjects.slice(1);

  return (
    <>
      <HeroSection />

      <FilterBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        projectCount={filteredProjects.length}
      />

      {/* Projects Grid */}
      <section id="projecten" className="py-16 lg:py-24 bg-[#F8F9FA]">
        <div className="container-wide">
          {filteredProjects.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Featured Project */}
              {featuredProject && (
                <FeaturedProjectCard project={featuredProject} />
              )}

              {/* Regular Projects */}
              {regularProjects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState onReset={handleReset} />
          )}
        </div>
      </section>

      <StatsSection />
      <CTASection />
    </>
  );
}
