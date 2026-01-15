"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { FEATURED_PROJECTS } from "@/lib/constants";

function ProjectCard({
  project,
  index,
  layout = "default",
}: {
  project: (typeof FEATURED_PROJECTS)[number];
  index: number;
  layout?: "featured" | "default" | "wide";
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
        <div className="relative h-full overflow-hidden bg-[#0C0C0C]">
          {/* Image */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover image-cinematic transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/95 via-[#0C0C0C]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              className="mb-3"
            >
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A6B4C]">
                <span className="w-3 h-px bg-[#9A6B4C]" />
                {project.category}
              </span>
            </motion.div>

            {/* Title */}
            <h3
              className={`font-display text-white leading-[1.1] tracking-[-0.01em] transition-colors duration-300 ${
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
            <p className="mt-2 text-sm text-white/50">{project.client}</p>

            {/* Description - only on featured/wide */}
            {(layout === "featured" || layout === "wide") && (
              <p className="mt-3 max-w-md text-sm text-white/40 leading-relaxed hidden sm:block">
                {project.description}
              </p>
            )}

            {/* View link */}
            <div className="mt-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">
                Bekijk project
              </span>
              <ArrowUpRight className="w-3 h-3 text-white/60" />
            </div>
          </div>

          {/* Corner accent on hover */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-8 h-8 border-t border-r border-[#9A6B4C]/40" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function FeaturedProjects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing bg-white relative">
      {/* Subtle diagonal pattern */}
      <div className="absolute inset-0 pattern-diagonal" />

      <div className="container-wide relative">
        {/* Section Header */}
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
        >
          <div>
            {/* Overline */}
            <div className="flex items-center gap-4 mb-6">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isHeaderInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-px w-12 bg-[#9A6B4C] origin-left"
              />
              <span className="label-overline">Portfolio</span>
            </div>

            {/* Title */}
            <h2 className="heading-section text-[#0C0C0C]">
              Recente realisaties
            </h2>
          </div>

          <Link
            href="/projecten"
            className="group inline-flex items-center gap-4 text-[#0C0C0C] hover:text-[#9A6B4C] transition-colors duration-300"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.12em]">
              Alle projecten
            </span>
            <div className="flex items-center justify-center w-10 h-10 border border-current transition-all duration-300 group-hover:bg-[#9A6B4C] group-hover:border-[#9A6B4C] group-hover:text-white">
              <ArrowRight className="w-4 h-4" />
            </div>
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
                />
              ))}
            </div>

            {/* Bottom - wide project */}
            {FEATURED_PROJECTS[3] && (
              <ProjectCard
                project={FEATURED_PROJECTS[3]}
                index={3}
                layout="wide"
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
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
