'use client'

import { useState } from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronRight, LayoutDashboard, FolderKanban, Settings, HelpCircle, Menu } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarProps {
  onExpandedChange: (expanded: boolean) => void;
}

export function Sidebar({ onExpandedChange }: SidebarProps) {
  const [expanded, setExpanded] = useState(false)
  const pathname = usePathname()

  const toggleExpanded = () => {
    setExpanded((prev) => {
      const newExpanded = !prev;
      onExpandedChange(newExpanded);
      return newExpanded;
    });
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: FolderKanban, label: "Prosjekter", href: "/prosjekt" },
    { icon: Settings, label: "Innstillinger", href: "/innstillinger" },
    { icon: HelpCircle, label: "Hjelp", href: "/hjelp" },
  ]

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-black text-white transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {expanded ? (
          <span className="text-lg font-semibold">Kunsikt</span>
        ) : null}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={toggleExpanded}
        >
          {expanded ? <ChevronRight className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="space-y-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return expanded ? (
            <Link key={item.label} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:bg-white/10",
                  isActive && "bg-white/10"
                )}
              >
                <Icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ) : (
            <TooltipProvider key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "w-full text-white hover:bg-white/10",
                        isActive && "bg-white/10"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{item.label}</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </nav>
    </div>
  )
}

