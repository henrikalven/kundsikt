import { SectionCard } from "@/components/section-card"
import { Project } from "@/lib/mockDatabase"

interface MarkedsføringTabProps {
  project: Project;
  updateProject: (updates: Partial<Project>) => void;
}

export function MarkedsføringTab({ project, updateProject }: MarkedsføringTabProps) {
  const handleAdd = (key: 'positioning' | 'keyMessages') => {
    const newItem = { id: Date.now().toString(), title: `Ny ${key === 'positioning' ? 'posisjonering' : 'melding'}` };
    updateProject({ [key]: [...project[key], newItem] });
  };

  const handleEdit = (key: 'positioning' | 'keyMessages', id: string, newTitle: string) => {
    const updatedItems = project[key].map(item => 
      item.id === id ? { ...item, title: newTitle } : item
    );
    updateProject({ [key]: updatedItems });
  };

  const handleDelete = (key: 'positioning' | 'keyMessages', id: string) => {
    const updatedItems = project[key].filter(item => item.id !== id);
    updateProject({ [key]: updatedItems });
  };

  return (
    <>
      <SectionCard
        title="Posisjonering"
        emoji="📊"
        count={project.positioning.length}
        items={project.positioning}
        onAdd={() => handleAdd('positioning')}
        onEdit={(id, newTitle) => handleEdit('positioning', id, newTitle)}
        onDelete={(id) => handleDelete('positioning', id)}
        addLabel="Legg til posisjonering"
        infoText="Definer hvordan du vil at produktet ditt skal oppfattes i markedet"
      />
      <SectionCard
        title="Nøkkelmeldinger"
        emoji="💬"
        count={project.keyMessages.length}
        items={project.keyMessages}
        onAdd={() => handleAdd('keyMessages')}
        onEdit={(id, newTitle) => handleEdit('keyMessages', id, newTitle)}
        onDelete={(id) => handleDelete('keyMessages', id)}
        addLabel="Legg til en melding"
        infoText="Kjernebeskjeder for å kommunisere om produktet ditt"
      />
    </>
  )
}

