"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { FEATURED_PROJECTS } from "@/lib/constants";

function ProjectCard({
  project,
  index,
  layout = "default",
  viewProjectLabel,
}: {
  project: (typeof FEATURED_PROJECTS)[number];
  index: number;
  layout?: "featured" | "default" | "wide";
  viewProjectLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const aspectClasses = {
    featured: "aspect-[4/5] md:aspect-[3/4]",
    default: "aspect-[4/3]",
    wide: "aspect-[16/9]",
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative ${aspectClasses[layout]}`}
    >
      <Link href={`/projecten/${project.slug}`} className="block h-full">
        <div className="relative h-full overflow-hidden rounded-xl bg-[#112337]">
          {/* Image */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#112337]/95 via-[#112337]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              className="mb-3"
            >
              <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white text-xs font-medium px-3 py-1 rounded-full">
                {project.category}
              </span>
            </motion.div>

            {/* Title */}
            <h3
              className={`font-bold text-white leading-[1.1] transition-colors duration-300 ${
                layout === "featured"
                  ? "text-2xl sm:text-3xl md:text-4xl"
                  : layout === "wide"
                  ? "text-2xl sm:text-3xl"
                  : "text-xl sm:text-2xl"
              }`}
            >
              {project.title}
            </h3>

            {/* Client */}
            <p className="mt-2 text-sm text-white/60">{project.client}</p>

            {/* Description - only on featured/wide */}
            {(layout === "featured" || layout === "wide") && (
              <p className="mt-3 max-w-md text-sm text-white/50 leading-relaxed hidden sm:block">
                {project.description}
              </p>
            )}

            {/* View link */}
            <div className="mt-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-semibold text-[#204CE5]">
                {viewProjectLabel}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#204CE5]" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function FeaturedProjects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const t = useTranslations("projects");
  const tCta = useTranslations("common.cta");

  return (
    <section className="section-spacing bg-white">
      <div className="container-wide">
        {/* Section Header */}
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
        >
          <div>
            <span className="label-overline">{t("portfolio")}</span>
            <h2 className="mt-4 heading-lg">
              {t("subtitle")}
            </h2>
          </div>

          <Link
            href="/projecten"
            className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-lg"
          >
            <span>{t("allProjects")}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.header>

        {/* Projects Grid - Asymmetric Layout */}
        <div className="grid lg:grid-cols-12 gap-5">
          {/* Featured large project - left column */}
          <div className="lg:col-span-5 lg:row-span-2">
            <ProjectCard
              project={FEATURED_PROJECTS[0]}
              index={0}
              layout="featured"
              viewProjectLabel={tCta("viewProject")}
            />
          </div>

          {/* Right column - stacked projects */}
          <div className="lg:col-span-7 grid gap-5">
            {/* Top row - two projects */}
            <div className="grid sm:grid-cols-2 gap-5">
              {FEATURED_PROJECTS.slice(1, 3).map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index + 1}
                  layout="default"
                  viewProjectLabel={tCta("viewProject")}
                />
              ))}
            </div>

            {/* Bottom - wide project */}
            {FEATURED_PROJECTS[3] && (
              <ProjectCard
                project={FEATURED_PROJECTS[3]}
                index={3}
                layout="wide"
                viewProjectLabel={tCta("viewProject")}
              />
            )}
          </div>
        </div>

        {/* Additional project row */}
        {FEATURED_PROJECTS[4] && (
          <div className="mt-5 grid sm:grid-cols-3 gap-5">
            {FEATURED_PROJECTS.slice(4, 7).map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index + 4}
                layout="default"
                viewProjectLabel={tCta("viewProject")}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
