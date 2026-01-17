"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  ShieldCheck,
  Wrench,
  Handshake,
  BarChart3,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Cockpit", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/tenders", label: "Tenders", icon: FileText },
  { href: "/dashboard/compliance", label: "Compliance", icon: ShieldCheck },
  { href: "/dashboard/recruitment", label: "Recruitment", icon: Briefcase },
  { href: "/dashboard/facility", label: "Facility", icon: Wrench },
  { href: "/dashboard/partners", label: "Partners", icon: Handshake },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/[0.06] bg-[#0A0A09]">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/[0.06] p-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl tracking-tight text-white">DE RAEDT</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
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
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-white/[0.08] text-white"
                    : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.06] p-4">
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/50 transition-all hover:bg-white/[0.04] hover:text-white/80"
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
