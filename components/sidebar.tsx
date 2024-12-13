"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, CheckSquare, Calendar, User, Briefcase, Plus, Settings, Moon, ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  count?: number;
}

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mainNavItems: NavItem[] = [
    { icon: Home, label: "Hjem", href: "/" },
    { icon: CheckSquare, label: "Prosjekter", href: "/prosjekt" },
  ];

  const workspaces = [
    { label: "Lean Canvas", href: "/workspace/lean-canvas", icon: "🏢" },
    { label: "Markedsføringsideer", href: "/workspace/value-prop", icon: "🚀" },
    { label: "Finn marked", href: "/workspace/target-group", icon: "🎨" },
    { label: "Design", href: "/workspace/marketing", icon: "🎨" },
  ];

  const NavButton = ({ item }: { item: NavItem }) => {
    if (isCollapsed) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className={cn("w-full justify-center h-10", pathname === item.href && "bg-accent")}>
                <item.icon className="h-4 w-4" />
                {item.count && <span className="absolute top-1 right-1 h-4 w-4 text-[10px] rounded-full bg-primary text-primary-foreground flex items-center justify-center">{item.count}</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-2">
              {item.label}
              {item.count && <span className="text-xs">({item.count})</span>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <Button variant="ghost" className={cn("w-full justify-between h-10", pathname === item.href && "bg-accent")}>
        <span className="flex items-center gap-2">
          <item.icon className="h-4 w-4" />
          {item.label}
        </span>
        {item.count && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{item.count}</span>}
      </Button>
    );
  };

  return (
    <div className={cn("flex h-full flex-col border-r border-border bg-secondary/10 transition-all duration-300", isCollapsed ? "w-16" : "w-64", "relative")}>
      {!isMobile && (
        <Button variant="ghost" size="icon" className="absolute -right-4 top-6 h-8 w-8 rounded-full bg-background border shadow-sm hover:bg-accent" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      )}

      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <div className="h-2 w-2 rounded-sm bg-primary" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-semibold text-foreground">Kundsikt</span>
              <span className="truncate text-xs text-muted-foreground">v0.0.1</span>
            </div>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 px-2">
        {!isCollapsed && <span className="px-2 py-2 text-xs font-medium text-muted-foreground/70 block">Meny</span>}

        <nav className="space-y-1 py-2">
          {mainNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <NavButton item={item} />
            </Link>
          ))}
        </nav>

        <div className="mt-4">
          {!isCollapsed && <span className="px-2 py-2 text-xs font-medium text-muted-foreground/70 block">Verktøy</span>}
          <nav className="space-y-1 py-2">
            {workspaces.map((workspace) => (
              <TooltipProvider key={workspace.href} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={workspace.href}>
                      <Button variant="ghost" className={cn("w-full h-10", isCollapsed ? "justify-center" : "justify-start gap-2", pathname === workspace.href && "bg-accent text-accent-foreground", "hover:bg-accent/50")}>
                        <span>{workspace.icon}</span>
                        {!isCollapsed && <span className="truncate">{workspace.label}</span>}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && <TooltipContent side="right">{workspace.label}</TooltipContent>}
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>
        </div>
      </ScrollArea>

      <div className="border-t bg-secondary/20 p-2 mt-auto">
        <nav className="space-y-1">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className={cn("w-full h-10", isCollapsed ? "justify-center" : "justify-start gap-2", "hover:bg-accent/50")}>
                  <Settings className="h-4 w-4" />
                  {!isCollapsed && "Innstillinger"}
                </Button>
              </TooltipTrigger>
              {isCollapsed && <TooltipContent side="right">Innstillinger</TooltipContent>}
            </Tooltip>
          </TooltipProvider>

          {!isCollapsed && (
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-secondary" />
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm text-foreground">Henrik Alvestad</span>
                <span className="truncate text-xs text-muted-foreground">henrik@kundsikt.no</span>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
