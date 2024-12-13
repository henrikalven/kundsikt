import { SectionCard } from "@/components/projects/section-card";
import { Project } from "@/lib/mockDatabase";

interface ProblemTabProps {
  project: Project;
  updateProject: (updates: Partial<Project>) => void;
}

export function ProblemTab({ project, updateProject }: ProblemTabProps) {
  const handleAdd = (key: "problems" | "solutions") => {
    const newItem = { id: Date.now().toString(), title: `Ny ${key === "problems" ? "problem" : "løsning"}` };
    updateProject({ [key]: [...project[key], newItem] });
  };

  const handleEdit = (key: "problems" | "solutions", id: string, newTitle: string) => {
    const updatedItems = project[key].map((item) => (item.id === id ? { ...item, title: newTitle } : item));
    updateProject({ [key]: updatedItems });
  };

  const handleDelete = (key: "problems" | "solutions", id: string) => {
    const updatedItems = project[key].filter((item) => item.id !== id);
    updateProject({ [key]: updatedItems });
  };

  return (
    <>
      <SectionCard
        title="Problem"
        emoji="🚫"
        count={project.problems.length}
        items={project.problems}
        onAdd={() => handleAdd("problems")}
        onEdit={(id, newTitle) => handleEdit("problems", id, newTitle)}
        onDelete={(id) => handleDelete("problems", id)}
        addLabel="Legg til et problem"
        infoText="Identifiser nøkkelproblemer målkundene dine står overfor"
      />
      <SectionCard
        title="Løsning"
        emoji="💡"
        count={project.solutions.length}
        items={project.solutions}
        onAdd={() => handleAdd("solutions")}
        onEdit={(id, newTitle) => handleEdit("solutions", id, newTitle)}
        onDelete={(id) => handleDelete("solutions", id)}
        addLabel="Legg til en løsning"
        infoText="Foreslå løsninger for å adressere de identifiserte problemene"
      />
    </>
  );
}
