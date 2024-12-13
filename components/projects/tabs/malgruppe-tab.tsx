import { useState } from "react";
import { SectionCard } from "@/components/projects/section-card";
import { PersonaCard } from "@/components/projects/persona-card";
import { PersonaModal } from "@/components/projects/persona-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Project } from "@/lib/mockDatabase";

interface MålgruppeTabProps {
  project: Project;
  updateProject: (updates: Partial<Project>) => void;
}

export function MålgruppeTab({ project, updateProject }: MålgruppeTabProps) {
  const [selectedPersona, setSelectedPersona] = useState<Project["personas"][0] | null>(null);

  const handleAdd = (key: keyof Project) => {
    if (key === "personas") {
      const newPersona: Project["personas"][0] = {
        id: Date.now().toString(),
        name: "Ny Persona",
        age: 30,
        job: "Stilling",
        initials: "NP",
        pains: [],
        gains: [],
        jobs: [],
        whereToReach: [],
      };
      updateProject({ personas: [...project.personas, newPersona] });
      setSelectedPersona(newPersona);
    } else {
      const newItem = { id: Date.now().toString(), title: `Ny ${key.toString()}` };
      updateProject({ [key]: [...(project[key] as any[]), newItem] });
    }
  };

  const handleEdit = (key: keyof Project, id: string, newValue: any) => {
    if (key === "personas") {
      const updatedPersonas = project.personas.map((persona) => (persona.id === id ? { ...persona, ...JSON.parse(newValue) } : persona));
      updateProject({ personas: updatedPersonas });
    } else {
      const updatedItems = (project[key] as any[]).map((item) => (item.id === id ? { ...item, title: newValue } : item));
      updateProject({ [key]: updatedItems });
    }
  };

  const handleDelete = (key: keyof Project, id: string) => {
    if (key === "personas") {
      const updatedPersonas = project.personas.filter((persona) => persona.id !== id);
      updateProject({ personas: updatedPersonas });
    } else {
      const updatedItems = (project[key] as any[]).filter((item) => item.id !== id);
      updateProject({ [key]: updatedItems });
    }
  };

  return (
    <>
      <SectionCard
        title="Overordnet segment"
        emoji="🎯"
        count={project.segments.length}
        items={project.segments}
        onAdd={() => handleAdd("segments")}
        onEdit={(id, newTitle) => handleEdit("segments", id, newTitle)}
        onDelete={(id) => handleDelete("segments", id)}
        addLabel="Legg til et segment"
        infoText="Definer dine målmarkedssegmenter"
      />
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Personas</h2>
          <Button onClick={() => handleAdd("personas")}>
            <Plus className="w-4 h-4 mr-2" />
            Legg til persona
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {project.personas.map((persona) => (
            <PersonaCard key={persona.id} {...persona} onClick={() => setSelectedPersona(persona)} onEdit={() => setSelectedPersona(persona)} onDelete={() => handleDelete("personas", persona.id)} />
          ))}
        </div>
      </div>
      {selectedPersona && <PersonaModal isOpen={!!selectedPersona} onClose={() => setSelectedPersona(null)} persona={selectedPersona} onSave={(updatedPersona) => handleEdit("personas", updatedPersona.id, JSON.stringify(updatedPersona))} />}
    </>
  );
}
