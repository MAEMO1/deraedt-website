"use client";

import { motion } from "framer-motion";
import { FolderOpen, FileText, Clock, TrendingUp } from "lucide-react";
import { Sidebar, DashboardHeader, ProjectStatusCard } from "@/components/portal";

// Mock data - in production this would come from Supabase
const mockProjects = [
  {
    id: "1",
    name: "Renovatie Kantoor Centrum",
    client: "ABC Vastgoed NV",
    status: "actief" as const,
    progress: 65,
    startDate: "15 jan 2024",
    expectedEndDate: "30 apr 2024",
  },
  {
    id: "2",
    name: "Nieuwbouw Magazijn",
    client: "ABC Vastgoed NV",
    status: "planning" as const,
    progress: 15,
    startDate: "1 mrt 2024",
    expectedEndDate: "30 sep 2024",
  },
];

const mockDocuments = [
  { name: "Vorderingsstaat januari 2024.pdf", date: "15 jan 2024", type: "vorderingsstaat" },
  { name: "Attest goede uitvoering.pdf", date: "10 jan 2024", type: "attest" },
  { name: "Factuur 2024-001.pdf", date: "5 jan 2024", type: "factuur" },
];

const stats = [
  { label: "Actieve Projecten", value: "2", icon: FolderOpen },
  { label: "Documenten", value: "12", icon: FileText },
  { label: "Laatste Update", value: "Vandaag", icon: Clock },
  { label: "Gemiddelde Voortgang", value: "40%", icon: TrendingUp },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <Sidebar />

      <div className="ml-64">
        <DashboardHeader title="Dashboard" userName="Jan Janssen" />

        <main className="p-6">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-[#1E3A5F]">
              Welkom terug, Jan!
            </h2>
            <p className="mt-1 text-gray-600">
              Hier is een overzicht van uw projecten en documenten.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EBF4FF] text-[#1E3A5F]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-[#1E3A5F]">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="mb-4 text-lg font-semibold text-[#1E3A5F]">
              Uw Projecten
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {mockProjects.map((project) => (
                <ProjectStatusCard key={project.id} {...project} />
              ))}
            </div>
          </motion.div>

          {/* Recent Documents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="mb-4 text-lg font-semibold text-[#1E3A5F]">
              Recente Documenten
            </h3>
            <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
              <div className="divide-y">
                {mockDocuments.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[#4299E1]" />
                      <div>
                        <p className="font-medium text-[#1E3A5F]">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.date}</p>
                      </div>
                    </div>
                    <button className="text-sm text-[#4299E1] hover:underline">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
