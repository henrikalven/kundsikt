import { cn } from "@/lib/utils"

const tabs = [
  { name: "Detaljer", key: "detaljer" },
  { name: "Problem løsning", key: "problem" },
  { name: "Verdiløfte", key: "verdilofte" },
  { name: "Målgruppe", key: "malgruppe" },
  { name: "Markedsføring", key: "markedsforing" },
  { name: "Lean canvas", key: "canvas" },
]

export function Navigation({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  return (
    <nav className="sticky top-0 z-10 bg-background border-b overflow-x-auto">
      <div className="flex space-x-4 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={cn(
              "py-4 border-b-2 text-sm font-medium whitespace-nowrap flex-shrink-0",
              activeTab === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </nav>
  )
}

