import { SectionCard } from "@/components/projects/section-card";
import { Project } from "@/lib/mockDatabase";

interface VerdiløfteTabProps {
  project: Project;
  updateProject: (updates: Partial<Project>) => void;
}

export function VerdiløfteTab({ project, updateProject }: VerdiløfteTabProps) {
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
        title="Gevinster"
        emoji="🎁"
        count={project.gains.length}
        items={project.gains}
        onAdd={() => handleAdd("gains")}
        onEdit={(id, newTitle) => handleEdit("gains", id, newTitle)}
        onDelete={(id) => handleDelete("gains", id)}
        addLabel="Legg til en gevinst"
        infoText="Beskriv hvordan produktet ditt skaper kundegevinster"
      />
      <SectionCard
        title="Smertelindrere"
        emoji="🩹"
        count={project.painRelievers.length}
        items={project.painRelievers}
        onAdd={() => handleAdd("painRelievers")}
        onEdit={(id, newTitle) => handleEdit("painRelievers", id, newTitle)}
        onDelete={(id) => handleDelete("painRelievers", id)}
        addLabel="Legg til en smertelindrer"
        infoText="Forklar hvordan produktet ditt lindrer kundens smerter"
      />
      <SectionCard
        title="Nøkkelfordeler"
        emoji="🔑"
        count={project.keyBenefits.length}
        items={project.keyBenefits}
        onAdd={() => handleAdd("keyBenefits")}
        onEdit={(id, newTitle) => handleEdit("keyBenefits", id, newTitle)}
        onDelete={(id) => handleDelete("keyBenefits", id)}
        addLabel="Legg til en nøkkelfordel"
        infoText="De viktigste fordelene produktet eller tjenesten din tilbyr kundene"
      />
      <SectionCard
        title="Unike differensiatorer"
        emoji="🌟"
        count={project.uniqueDifferentiators.length}
        items={project.uniqueDifferentiators}
        onAdd={() => handleAdd("uniqueDifferentiators")}
        onEdit={(id, newTitle) => handleEdit("uniqueDifferentiators", id, newTitle)}
        onDelete={(id) => handleDelete("uniqueDifferentiators", id)}
        addLabel="Legg til en differensiator"
        infoText="Faktorer som skiller produktet ditt fra konkurrentene"
      />
      <SectionCard
        title="Emosjonelle drivere"
        emoji="❤️"
        count={project.emotionalDrivers.length}
        items={project.emotionalDrivers}
        onAdd={() => handleAdd("emotionalDrivers")}
        onEdit={(id, newTitle) => handleEdit("emotionalDrivers", id, newTitle)}
        onDelete={(id) => handleDelete("emotionalDrivers", id)}
        addLabel="Legg til en emosjonell driver"
        infoText="Emosjonelle faktorer som påvirker kundenes beslutninger"
      />
    </>
  );
}
