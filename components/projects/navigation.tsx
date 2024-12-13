"use client";

import { cn } from "@/lib/utils";

const tabs = [
  { name: "Detaljer", key: "detaljer" },
  { name: "Problem løsning", key: "problem" },
  { name: "Verdiløfte", key: "verdilofte" },
  { name: "Målgruppe", key: "malgruppe" },
  { name: "Markedsføring", key: "markedsforing" },
  { name: "Lean canvas", key: "canvas" },
];

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="relative border-b">
      <div className="max-w-full mx-auto ">
        <div className="flex gap-1 overflow-x-auto no-scrollbar -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "relative px-6 py-3 text-sm font-medium transition-all duration-200",
                "hover:text-foreground/90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                activeTab === tab.key
                  ? ["text-foreground", "before:absolute before:bottom-0 before:left-0 before:right-0", "before:h-0.5 before:bg-primary"]
                  : ["text-muted-foreground", "hover:bg-muted/40", "before:absolute before:bottom-0 before:left-0 before:right-0", "before:h-0.5 before:bg-transparent"]
              )}>
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
