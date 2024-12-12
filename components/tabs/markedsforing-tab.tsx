import { SectionCard } from "@/components/section-card"
import { Project } from "@/lib/mockDatabase"

interface MarkedsføringTabProps {
  project: Project;
  onAdd: (key: keyof Project, newItem: { id: string; title: string }) => void;
  onEdit: (key: keyof Project, id: string, newTitle: string) => void;
  onDelete: (key: keyof Project, id: string) => void;
}

export function MarkedsføringTab({ project, onAdd, onEdit, onDelete }: MarkedsføringTabProps) {
  return (
    <>
      <SectionCard
        title="Posisjonering"
        emoji="📊"
        count={project.positioning.length}
        items={project.positioning}
        onAdd={() => onAdd('positioning', { id: Date.now().toString(), title: 'Ny posisjonering' })}
        onEdit={(id, newTitle) => onEdit('positioning', id, newTitle)}
        onDelete={(id) => onDelete('positioning', id)}
        addLabel="Legg til posisjonering"
        infoText="Definer hvordan du vil at produktet ditt skal oppfattes i markedet"
      />
      <SectionCard
        title="Nøkkelmeldinger"
        emoji="💬"
        count={project.keyMessages.length}
        items={project.keyMessages}
        onAdd={() => onAdd('keyMessages', { id: Date.now().toString(), title: 'Ny melding' })}
        onEdit={(id, newTitle) => onEdit('keyMessages', id, newTitle)}
        onDelete={(id) => onDelete('keyMessages', id)}
        addLabel="Legg til en melding"
        infoText="Kjernebeskjeder for å kommunisere om produktet ditt"
      />
    </>
  )
}

