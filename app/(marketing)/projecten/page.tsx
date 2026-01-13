"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/marketing";
import { FEATURED_PROJECTS, PROJECT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

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

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#1E3A5F] pb-16 pt-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="mb-4 text-sm text-white/60">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span className="text-white">Projecten</span>
            </nav>
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Onze Projecten
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              Ontdek onze gerealiseerde projecten. Van erfgoedrenovatie tot
              moderne nieuwbouw, wij hebben ervaring in diverse sectoren.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="border-b bg-white py-6">
        <div className="container-custom">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {PROJECT_CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    activeCategory === category.value
                      ? "bg-[#1E3A5F] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Zoek projecten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-[#F7FAFC]">
        <div className="container-custom">
          {filteredProjects.length > 0 ? (
            <>
              <div className="mb-8 flex items-center justify-between">
                <p className="text-gray-600">
                  {filteredProjects.length} project
                  {filteredProjects.length !== 1 ? "en" : ""} gevonden
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.slug} {...project} index={index} />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-[#1E3A5F]">
                Geen projecten gevonden
              </h3>
              <p className="mt-2 text-gray-600">
                Probeer een andere zoekterm of selecteer een andere categorie.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("alle");
                  setSearchQuery("");
                }}
                className="mt-4 text-[#4299E1] hover:underline"
              >
                Alle projecten tonen
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
