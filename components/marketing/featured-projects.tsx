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
  featured = false,
}: {
  project: (typeof FEATURED_PROJECTS)[number];
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${featured ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      <Link href={`/projecten/${project.slug}`} className="block">
        <div
          className={`relative overflow-hidden bg-[#0A1628] ${
            featured ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          {/* Image */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            {/* Category tag */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90 bg-white/10 backdrop-blur-sm">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h3
              className={`font-heading font-bold text-white leading-tight ${
                featured ? "text-3xl sm:text-4xl md:text-5xl" : "text-xl sm:text-2xl"
              }`}
            >
              {project.title}
            </h3>

            {/* Client */}
            <p className="mt-2 text-sm text-white/60">{project.client}</p>

            {/* Description - only on featured */}
            {featured && (
              <p className="mt-4 max-w-lg text-white/50 leading-relaxed hidden sm:block">
                {project.description}
              </p>
            )}

            {/* Arrow indicator */}
            <div className="mt-6 flex items-center gap-2 text-white/60 group-hover:text-[#B8860B] transition-colors">
              <span className="text-sm font-medium">Bekijk project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* Corner accent on hover */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#B8860B]" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProjects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 sm:py-32 bg-[#F8F9FA]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#B8860B]" />
              <span className="text-[#B8860B] text-sm font-medium tracking-[0.2em] uppercase">
                Portfolio
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-[#0A1628] leading-tight">
              Recente
              <br />
              <span className="text-[#1E3A5F]">Realisaties</span>
            </h2>
          </div>

          <Link
            href="/projecten"
            className="group inline-flex items-center gap-3 text-[#0A1628] hover:text-[#B8860B] transition-colors"
          >
            <span className="text-base font-semibold">Alle projecten</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Projects Grid - Asymmetric Layout */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {/* Featured large project */}
          <ProjectCard
            project={FEATURED_PROJECTS[0]}
            index={0}
            featured={true}
          />

          {/* Smaller projects */}
          {FEATURED_PROJECTS.slice(1, 4).map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index + 1}
            />
          ))}
        </div>

        {/* Bottom Row - Full Width Project */}
        {FEATURED_PROJECTS[4] && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 sm:mt-6"
          >
            <Link href={`/projecten/${FEATURED_PROJECTS[4].slug}`} className="group block">
              <div className="relative aspect-[21/9] overflow-hidden bg-[#0A1628]">
                <Image
                  src={FEATURED_PROJECTS[4].image}
                  alt={FEATURED_PROJECTS[4].title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 via-[#0A1628]/40 to-transparent" />

                <div className="absolute inset-0 flex items-center p-8 sm:p-12 lg:p-16">
                  <div className="max-w-2xl">
                    <span className="inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90 bg-white/10 backdrop-blur-sm mb-4">
                      {FEATURED_PROJECTS[4].category}
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
                      {FEATURED_PROJECTS[4].title}
                    </h3>
                    <p className="mt-2 text-white/60">{FEATURED_PROJECTS[4].client}</p>
                    <p className="mt-4 text-white/50 leading-relaxed hidden sm:block">
                      {FEATURED_PROJECTS[4].description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-white/60 group-hover:text-[#B8860B] transition-colors">
                      <span className="text-sm font-medium">Bekijk project</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#B8860B]" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
