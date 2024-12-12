import { useState } from 'react'
import { SectionCard } from "@/components/section-card"
import { Project } from "@/lib/mockDatabase"

interface LeanCanvasTabProps {
  project: Project;
  onUpdate: (updatedProject: Partial<Project>) => void;
}

interface LeanCanvasSection {
  title: string
  key: keyof Project
  items: { id: string; title: string }[]
  infoText: string
  emoji: string
}

export function LeanCanvasTab({ project, onUpdate }: LeanCanvasTabProps) {
  const [sections] = useState<LeanCanvasSection[]>([
    {
      title: "Problem",
      key: "problems",
      emoji: "🚫",
      items: project.problems,
      infoText: "List opp de 3 viktigste problemene kundene dine står overfor"
    },
    {
      title: "Kundesegmenter",
      key: "segments",
      emoji: "👥",
      items: project.segments,
      infoText: "Definer dine målkundegrupper"
    },
    {
      title: "Unikt verdiforslag",
      key: "uniqueSellingPoint",
      emoji: "💎",
      items: [{ id: "1", title: project.uniqueSellingPoint }],
      infoText: "Forklar hvorfor løsningen din er unik og verdifull"
    },
    {
      title: "Løsning",
      key: "solutions",
      emoji: "💡",
      items: project.solutions,
      infoText: "Skissér de viktigste funksjonene i løsningen din"
    },
    // Add more sections as needed
  ])

  const handleUpdate = (key: keyof Project, id: string | null, newTitle: string) => {
    if (key === 'uniqueSellingPoint') {
      onUpdate({ [key]: newTitle });
    } else if (Array.isArray(project[key])) {
      const updatedItems = id
        ? (project[key] as any[]).map(item => item.id === id ? { ...item, title: newTitle } : item)
        : [...(project[key] as any[]), { id: Date.now().toString(), title: newTitle }];
      onUpdate({ [key]: updatedItems });
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sections.map((section) => (
        <SectionCard
          key={section.title}
          title={section.title}
          emoji={section.emoji}
          count={section.items.length}
          items={section.items}
          onAdd={() => handleUpdate(section.key, null, `Ny ${section.title.toLowerCase()}`)}
          onEdit={(id, newTitle) => handleUpdate(section.key, id, newTitle)}
          onDelete={(id) => handleUpdate(section.key, id, '')}
          addLabel={`Legg til ${section.title.toLowerCase()}`}
          infoText={section.infoText}
        />
      ))}
    </div>
  )
}

