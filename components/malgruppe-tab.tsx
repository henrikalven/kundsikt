import { useState } from 'react'
import { SectionCard } from "@/components/section-card"
import { PersonaCard } from "@/components/persona-card"
import { PersonaModal } from "@/components/persona-modal"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { Project } from "@/lib/mockDatabase"

interface MålgruppeTabProps {
  project: Project;
  updateProject: (updates: Partial<Project>) => void;
}

export function MålgruppeTab({ project, updateProject }: MålgruppeTabProps) {
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
    updateProject({ personas: [...project.personas, newPersona] })
    setSelectedPersona(newPersona)
  }

  const handleEditPersona = (updatedPersona: Project['personas'][0]) => {
    const updatedPersonas = project.personas.map(p => 
      p.id === updatedPersona.id ? updatedPersona : p
    )
    updateProject({ personas: updatedPersonas })
  }

  const handleDeletePersona = (id: string) => {
    const updatedPersonas = project.personas.filter(p => p.id !== id)
    updateProject({ personas: updatedPersonas })
  }

  const handleAddSegment = () => {
    const newSegment = { id: Date.now().toString(), title: 'Nytt segment' }
    updateProject({ segments: [...project.segments, newSegment] })
  }

  const handleEditSegment = (id: string, newTitle: string) => {
    const updatedSegments = project.segments.map(segment => 
      segment.id === id ? { ...segment, title: newTitle } : segment
    )
    updateProject({ segments: updatedSegments })
  }

  const handleDeleteSegment = (id: string) => {
    const updatedSegments = project.segments.filter(segment => segment.id !== id)
    updateProject({ segments: updatedSegments })
  }

  return (
    <>
      <SectionCard
        title="Overordnet segment"
        emoji="🎯"
        count={project.segments.length}
        items={project.segments}
        onAdd={handleAddSegment}
        onEdit={handleEditSegment}
        onDelete={handleDeleteSegment}
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

