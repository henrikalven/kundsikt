import { useState } from 'react'
import { SectionCard } from "@/components/section-card"
import { PersonaCard } from "@/components/persona-card"
import { PersonaModal } from "@/components/persona-modal"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { Project } from "@/lib/mockDatabase"

interface MålgruppeTabProps {
  project: Project;
  onAdd: (key: keyof Project, newItem: { id: string; title: string }) => void;
  onEdit: (key: keyof Project, id: string, newTitle: string) => void;
  onDelete: (key: keyof Project, id: string) => void;
}

export function MålgruppeTab({ project, onAdd, onEdit, onDelete }: MålgruppeTabProps) {
  const [selectedPersona, setSelectedPersona] = useState<Project['personas'][0] | null>(null)

  const handleAddPersona = () => {
    const newPersona: Project['personas'][0] = {
      id: Date.now().toString(),
      name: "Ny Persona",
      age: 30,
      job: "Stilling",
      initials: "NP",
      pains: [],
      gains: [],
      jobs: [],
      whereToReach: []
    }
    onAdd('personas', newPersona)
    setSelectedPersona(newPersona)
  }

  const handleEditPersona = (updatedPersona: Project['personas'][0]) => {
    onEdit('personas', updatedPersona.id, JSON.stringify(updatedPersona))
  }

  const handleDeletePersona = (id: string) => {
    onDelete('personas', id)
  }

  return (
    <>
      <SectionCard
        title="Overordnet segment"
        emoji="🎯"
        count={project.segments.length}
        items={project.segments}
        onAdd={() => onAdd('segments', { id: Date.now().toString(), title: 'Nytt segment' })}
        onEdit={(id, newTitle) => onEdit('segments', id, newTitle)}
        onDelete={(id) => onDelete('segments', id)}
        addLabel="Legg til et segment"
        infoText="Definer dine målmarkedssegmenter"
      />
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Personas</h2>
          <Button onClick={handleAddPersona}>
            <Plus className="w-4 h-4 mr-2" />
            Legg til persona
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {project.personas.map((persona) => (
            <PersonaCard
              key={persona.id}
              {...persona}
              onClick={() => setSelectedPersona(persona)}
              onEdit={() => setSelectedPersona(persona)}
              onDelete={() => handleDeletePersona(persona.id)}
            />
          ))}
        </div>
      </div>
      {selectedPersona && (
        <PersonaModal
          isOpen={!!selectedPersona}
          onClose={() => setSelectedPersona(null)}
          persona={selectedPersona}
          onSave={handleEditPersona}
        />
      )}
    </>
  )
}

