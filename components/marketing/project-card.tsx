"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  slug: string;
  title: string;
  category: string;
  client: string;
  year: number;
  description: string;
  image: string;
  index?: number;
}

const categoryLabels: Record<string, string> = {
  erfgoed: "Erfgoed",
  onderwijs: "Onderwijs",
  zorg: "Zorg",
  residentieel: "Residentieel",
  infrastructuur: "Infrastructuur",
  overheid: "Overheid",
};

export function ProjectCard({
  slug,
  title,
  category,
  client,
  year,
  description,
  image,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/projecten/${slug}`}
        className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-sm font-medium text-white">
              Bekijk project
            </span>
            <ArrowRight className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-[#EBF4FF] text-[#1E3A5F] hover:bg-[#EBF4FF]"
            >
              {categoryLabels[category] || category}
            </Badge>
            <span className="text-sm text-gray-500">{year}</span>
          </div>
          <h3 className="mt-3 text-xl font-semibold text-[#1E3A5F] group-hover:text-[#2C5282]">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{client}</p>
          <p className="mt-3 line-clamp-2 text-gray-600">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
