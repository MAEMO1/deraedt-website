"use client";

import { Bell, Menu, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/app/(portal)/actions/auth";

interface DashboardHeaderProps {
  title: string;
  userName?: string;
  userRole?: string;
  onMenuClick?: () => void;
}

export function DashboardHeader({
  title,
  userName = "Klant",
  userRole,
  onMenuClick,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#112337]">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white/60 hover:text-white hover:bg-white/10"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-white">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-white/60 hover:text-white hover:bg-white/10">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#204CE5] text-white font-medium">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                  <span className="block text-sm font-medium text-white">{userName}</span>
                  {userRole && (
                    <span className="block text-xs text-white/50">{userRole}</span>
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-[#1a3654] border-white/10">
              <DropdownMenuItem className="text-white/80 focus:text-white focus:bg-white/10">
                <User className="mr-2 h-4 w-4" />
                Profiel
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white/80 focus:text-white focus:bg-white/10">
                <Settings className="mr-2 h-4 w-4" />
                Instellingen
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild className="focus:bg-red-500/20">
                <form action={signOutAction} className="w-full">
                  <button type="submit" className="flex w-full items-center text-red-400 hover:text-red-300">
                    <LogOut className="mr-2 h-4 w-4" />
                    Uitloggen
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
