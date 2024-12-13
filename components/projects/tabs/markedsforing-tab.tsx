import { SectionCard } from "@/components/projects/section-card";
import { Project } from "@/lib/mockDatabase";

interface MarkedsføringTabProps {
  project: Project;
  updateProject: (updates: Partial<Project>) => void;
}

export function MarkedsføringTab({ project, updateProject }: MarkedsføringTabProps) {
  const handleAdd = (key: keyof Project) => {
    const newItem = { id: Date.now().toString(), title: `Ny ${key.toString()}` };
    updateProject({ [key]: [...(project[key] as any[]), newItem] });
  };

  const handleEdit = (key: keyof Project, id: string, newTitle: string) => {
    const updatedItems = (project[key] as any[]).map((item) => (item.id === id ? { ...item, title: newTitle } : item));
    updateProject({ [key]: updatedItems });
  };

  const handleDelete = (key: keyof Project, id: string) => {
    const updatedItems = (project[key] as any[]).filter((item) => item.id !== id);
    updateProject({ [key]: updatedItems });
  };

  return (
    <>
      <SectionCard
        title="Posisjonering"
        emoji="📊"
        count={project.positioning.length}
        items={project.positioning}
        onAdd={() => handleAdd("positioning")}
        onEdit={(id, newTitle) => handleEdit("positioning", id, newTitle)}
        onDelete={(id) => handleDelete("positioning", id)}
        addLabel="Legg til posisjonering"
        infoText="Definer hvordan du vil at produktet ditt skal oppfattes i markedet"
      />
      <SectionCard
        title="Nøkkelmeldinger"
        emoji="💬"
        count={project.keyMessages.length}
        items={project.keyMessages}
        onAdd={() => handleAdd("keyMessages")}
        onEdit={(id, newTitle) => handleEdit("keyMessages", id, newTitle)}
        onDelete={(id) => handleDelete("keyMessages", id)}
        addLabel="Legg til en melding"
        infoText="Kjernebeskjeder for å kommunisere om produktet ditt"
      />
    </>
  );
}
