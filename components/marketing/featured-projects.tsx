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
  size = "normal",
}: {
  project: (typeof FEATURED_PROJECTS)[number];
  index: number;
  size?: "featured" | "normal" | "wide";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sizeClasses = {
    featured: "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-[16/12]",
    normal: "aspect-[4/3]",
    wide: "md:col-span-3 aspect-[21/9]",
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${sizeClasses[size]}`}
    >
      <Link href={`/projecten/${project.slug}`} className="block h-full">
        <div className="relative h-full overflow-hidden bg-[#08111C]">
          {/* Image */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-all duration-1000 ease-out group-hover:scale-105 image-elegant"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08111C] via-[#08111C]/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
            {/* Category tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
                <span className="w-4 h-px bg-[#C9A227]" />
                {project.category}
              </span>
            </motion.div>

            {/* Title */}
            <h3
              className={`font-display font-semibold text-white leading-[1.1] transition-colors duration-300 ${
                size === "featured"
                  ? "text-3xl sm:text-4xl md:text-5xl"
                  : size === "wide"
                  ? "text-3xl sm:text-4xl"
                  : "text-2xl sm:text-3xl"
              }`}
            >
              {project.title}
            </h3>

            {/* Client */}
            <p className="mt-3 text-sm text-white/50 font-medium">{project.client}</p>

            {/* Description - only on featured/wide */}
            {(size === "featured" || size === "wide") && (
              <p className="mt-4 max-w-lg text-white/40 leading-relaxed text-sm hidden sm:block">
                {project.description}
              </p>
            )}

            {/* View link */}
            <div className="mt-6 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 group-hover:text-[#C9A227] transition-colors duration-500">
                Bekijk project
              </span>
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#C9A227] transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* Corner accent on hover */}
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-10 h-10 border-t border-r border-[#C9A227]/50" />
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
    <section className="py-28 sm:py-36 bg-[#FAF8F5] relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 relative">
        {/* Section Header */}
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20"
        >
          <div>
            {/* Overline */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isHeaderInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-16 bg-[#C9A227] origin-left"
              />
              <span className="text-[#C9A227] text-xs font-medium tracking-[0.3em] uppercase">
                Portfolio
              </span>
            </div>

            {/* Title */}
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-heading tracking-[0.02em] text-[#08111C] leading-none">
              RECENTE
              <br />
              <span className="text-[#1A2D42]">REALISATIES</span>
            </h2>
          </div>

          <Link
            href="/projecten"
            className="group inline-flex items-center gap-4 text-[#08111C] hover:text-[#C9A227] transition-colors duration-500"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.15em]">Alle projecten</span>
            <div className="flex items-center justify-center w-12 h-12 border border-current transition-all duration-500 group-hover:bg-[#C9A227] group-hover:border-[#C9A227] group-hover:text-[#08111C]">
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>
        </motion.header>

        {/* Projects Grid - Editorial Layout */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Featured large project */}
          <ProjectCard
            project={FEATURED_PROJECTS[0]}
            index={0}
            size="featured"
          />

          {/* Smaller projects */}
          {FEATURED_PROJECTS.slice(1, 3).map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index + 1}
              size="normal"
            />
          ))}
        </div>

        {/* Bottom Row - Wide Project */}
        {FEATURED_PROJECTS[3] && (
          <div className="mt-5 grid md:grid-cols-3 gap-5">
            <ProjectCard
              project={FEATURED_PROJECTS[3]}
              index={3}
              size="normal"
            />
            {FEATURED_PROJECTS[4] && (
              <div className="md:col-span-2">
                <ProjectCard
                  project={FEATURED_PROJECTS[4]}
                  index={4}
                  size="wide"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
