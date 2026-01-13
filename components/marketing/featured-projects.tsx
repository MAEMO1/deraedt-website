"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FEATURED_PROJECTS } from "@/lib/constants";
import { ProjectCard } from "./project-card";

export function FeaturedProjects() {
  const featuredProjects = FEATURED_PROJECTS.slice(0, 3);

  return (
    <section className="section-padding bg-[#F7FAFC]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-between gap-4 md:flex-row"
        >
          <div>
            <h2 className="text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              Recente Projecten
            </h2>
            <p className="mt-2 text-gray-600">
              Ontdek enkele van onze meest recente realisaties
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link href="/projecten">
              Bekijk alle projecten
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              {...project}
              index={index}
            />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button asChild>
            <Link href="/projecten">
              Bekijk alle projecten
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
