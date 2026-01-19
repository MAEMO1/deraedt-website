"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Building2,
  Briefcase,
  ShieldCheck,
  Wrench,
  Handshake,
  BarChart3,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Cockpit", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/tenders", label: "Tenders", icon: FileText },
  { href: "/dashboard/cases", label: "Cases", icon: Building2 },
  { href: "/dashboard/compliance", label: "Compliance", icon: ShieldCheck },
  { href: "/dashboard/recruitment", label: "Recruitment", icon: Briefcase },
  { href: "/dashboard/facility", label: "Facility", icon: Wrench },
  { href: "/dashboard/partners", label: "Partners", icon: Handshake },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-[#112337]">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b border-white/10 p-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#204CE5] flex items-center justify-center">
              <span className="font-bold text-white text-lg">DR</span>
            </div>
            <div>
              <span className="block font-bold text-white tracking-tight">DE RAEDT</span>
              <span className="block text-[10px] text-white/40 uppercase tracking-wider">Growth OS</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#204CE5] text-white shadow-lg shadow-[#204CE5]/20"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-white" : "text-white/40 group-hover:text-[#204CE5]"
                )} strokeWidth={1.5} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-4">
          <button
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/50 transition-all hover:bg-red-500/10 hover:text-red-400"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            <LogOut className="h-5 w-5" strokeWidth={1.5} />
            Uitloggen
          </button>
        </div>
      </div>
    </aside>
  );
}
