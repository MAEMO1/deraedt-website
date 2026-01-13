"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Building } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ProjectStatusCardProps {
  id: string;
  name: string;
  client: string;
  status: "planning" | "actief" | "afgerond";
  progress: number;
  startDate?: string;
  expectedEndDate?: string;
}

const statusConfig = {
  planning: { label: "Planning", color: "bg-yellow-100 text-yellow-700" },
  actief: { label: "Actief", color: "bg-green-100 text-green-700" },
  afgerond: { label: "Afgerond", color: "bg-blue-100 text-blue-700" },
};

export function ProjectStatusCard({
  id,
  name,
  client,
  status,
  progress,
  startDate,
  expectedEndDate,
}: ProjectStatusCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
          <h3 className="mt-3 text-lg font-semibold text-[#1E3A5F]">{name}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <Building className="h-4 w-4" />
            {client}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Voortgang</span>
          <span className="font-medium text-[#1E3A5F]">{progress}%</span>
        </div>
        <Progress value={progress} className="mt-2 h-2" />
      </div>

      {(startDate || expectedEndDate) && (
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          {startDate && <span>Start: {startDate}</span>}
          {expectedEndDate && <span>Verwacht: {expectedEndDate}</span>}
        </div>
      )}

      <Link
        href={`/portal/projecten/${id}`}
        className="mt-4 inline-flex items-center text-sm font-medium text-[#4299E1] hover:underline"
      >
        Bekijk details
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
}
