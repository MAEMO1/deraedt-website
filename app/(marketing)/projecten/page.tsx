"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowUpRight, Filter, ArrowRight } from "lucide-react";
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
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#112337]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#112337]/90 via-[#112337]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {/* Category */}
            <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white text-xs font-medium px-3 py-1 rounded-full w-fit mb-3">
              {PROJECT_CATEGORIES.find((c) => c.value === project.category)?.label || project.category}
            </span>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white leading-tight">
              {project.title}
            </h3>

            {/* Client */}
            <p className="mt-2 text-sm text-white/60">{project.client}</p>

            {/* Hover indicator */}
            <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-semibold text-[#204CE5]">
                Bekijk project
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#204CE5]" />
            </div>
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
      <section className="relative min-h-[50vh] bg-[#112337] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/original-site/Koning-Boudewijn-Stadion.webp"
            alt="Koning Boudewijnstadion"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#112337] via-[#112337]/70 to-[#112337]/40" />
        </div>

        <div className="container-wide relative pb-16 pt-48">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 bg-[#204CE5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Portfolio
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Onze Projecten
            </h1>

            <p className="mt-8 text-lg text-white/60 leading-relaxed max-w-xl">
              Ontdek onze gerealiseerde projecten. Van erfgoedrenovatie tot
              moderne nieuwbouw, wij hebben ervaring in diverse sectoren.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-24 z-30 bg-white border-b border-[#112337]/5 py-6">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
              <Filter className="w-4 h-4 text-[#686E77] flex-shrink-0 mr-2" />
              {PROJECT_CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={cn(
                    "px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 whitespace-nowrap",
                    activeCategory === category.value
                      ? "bg-[#204CE5] text-white"
                      : "bg-[#F5F5F5] text-[#686E77] hover:bg-[#204CE5]/10 hover:text-[#204CE5]"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#686E77]" />
              <Input
                type="search"
                placeholder="Zoek projecten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 py-5 bg-[#F5F5F5] border-0 rounded-xl text-sm placeholder:text-[#686E77]/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-spacing bg-[#F5F5F5]">
        <div className="container-wide">
          {filteredProjects.length > 0 ? (
            <>
              <div className="mb-12 flex items-center justify-between">
                <p className="text-sm text-[#686E77]">
                  <span className="font-semibold text-[#112337]">{filteredProjects.length}</span>
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
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-[#204CE5]/10 rounded-full">
                <Search className="h-8 w-8 text-[#204CE5]" />
              </div>
              <h3 className="text-2xl font-bold text-[#112337]">
                Geen projecten gevonden
              </h3>
              <p className="mt-3 text-[#686E77]">
                Probeer een andere zoekterm of selecteer een andere categorie.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("alle");
                  setSearchQuery("");
                }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#204CE5] hover:text-[#1A3BB8] transition-colors"
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
          <div className="relative bg-[#112337] p-12 sm:p-16 lg:p-20 rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Heeft u een project in gedachten?
                </h2>
                <p className="mt-6 text-white/60 leading-relaxed">
                  Wij denken graag met u mee. Gebruik onze projectplanner voor een
                  vrijblijvende offerte of neem direct contact op.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link
                  href="/projectplanner"
                  className="group inline-flex items-center gap-3 bg-[#204CE5] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[#1A3BB8] hover:shadow-xl"
                >
                  Start projectplanner
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-white/20"
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
