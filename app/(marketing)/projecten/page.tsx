"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowUpRight, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FEATURED_PROJECTS, PROJECT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof FEATURED_PROJECTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/projecten/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0C0C0C]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover image-cinematic transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-[#0C0C0C]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {/* Category */}
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A6B4C] mb-3">
              <span className="w-3 h-px bg-[#9A6B4C]" />
              {PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label || project.category}
            </span>

            {/* Title */}
            <h3 className="font-display text-2xl text-white leading-tight">
              {project.title}
            </h3>

            {/* Client */}
            <p className="mt-2 text-sm text-white/50">{project.client}</p>

            {/* Hover indicator */}
            <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">
                Bekijk project
              </span>
              <ArrowUpRight className="w-3 h-3 text-white/60" />
            </div>
          </div>

          {/* Corner accent */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-8 h-8 border-t border-r border-[#9A6B4C]/40" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function ProjectenPage() {
  const [activeCategory, setActiveCategory] = useState("alle");
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const filteredProjects = FEATURED_PROJECTS.filter((project) => {
    const matchesCategory =
      activeCategory === "alle" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] bg-[#0C0C0C] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/original-site/Koning-Boudewijn-Stadion.webp"
            alt="Koning Boudewijnstadion"
            fill
            className="object-cover image-cinematic opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-[#0C0C0C]/40" />
        </div>

        <div className="container-wide relative pb-16 pt-48">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#9A6B4C]" />
              <span className="label-overline">Portfolio</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] tracking-[-0.02em]">
              Onze Projecten
            </h1>

            <p className="mt-8 text-lg text-white/50 leading-relaxed max-w-xl font-serif font-light">
              Ontdek onze gerealiseerde projecten. Van erfgoedrenovatie tot
              moderne nieuwbouw, wij hebben ervaring in diverse sectoren.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-24 z-30 bg-[#FAF7F2] border-b border-[#0C0C0C]/5 py-6">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
              <Filter className="w-4 h-4 text-[#6B6560] flex-shrink-0 mr-2" />
              {PROJECT_CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={cn(
                    "px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 whitespace-nowrap",
                    activeCategory === category.value
                      ? "bg-[#0C0C0C] text-white"
                      : "bg-white text-[#6B6560] hover:bg-[#0C0C0C]/5"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6560]" />
              <Input
                type="search"
                placeholder="Zoek projecten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 py-5 bg-white border-0 text-sm placeholder:text-[#6B6560]/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-spacing bg-[#FAF7F2] relative">
        <div className="absolute inset-0 grid-blueprint opacity-30" />

        <div className="container-wide relative">
          {filteredProjects.length > 0 ? (
            <>
              <div className="mb-12 flex items-center justify-between">
                <p className="text-sm text-[#6B6560]">
                  <span className="font-semibold text-[#0C0C0C]">{filteredProjects.length}</span>
                  {" "}project{filteredProjects.length !== 1 ? "en" : ""} gevonden
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.slug} project={project} index={index} />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-24 text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-[#0C0C0C]/5">
                <Search className="h-8 w-8 text-[#6B6560]" />
              </div>
              <h3 className="font-display text-2xl text-[#0C0C0C]">
                Geen projecten gevonden
              </h3>
              <p className="mt-3 text-[#6B6560]">
                Probeer een andere zoekterm of selecteer een andere categorie.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("alle");
                  setSearchQuery("");
                }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#9A6B4C] hover:text-[#7A5339] transition-colors"
              >
                Alle projecten tonen
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <div className="relative bg-[#0C0C0C] p-12 sm:p-16 lg:p-20 overflow-hidden">
            <div className="absolute inset-0 texture-stone opacity-30" />
            <div className="absolute top-6 right-6 w-16 h-16 border-t border-r border-[#9A6B4C]/20" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-b border-l border-[#9A6B4C]/20" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">
                  Heeft u een project in gedachten?
                </h2>
                <p className="mt-6 text-white/40 leading-relaxed">
                  Wij denken graag met u mee. Gebruik onze projectplanner voor een
                  vrijblijvende offerte of neem direct contact op.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link
                  href="/projectplanner"
                  className="group inline-flex items-center gap-3 bg-[#9A6B4C] text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#BA8B6C]"
                >
                  Start projectplanner
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-white/5"
                >
                  Contact opnemen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
