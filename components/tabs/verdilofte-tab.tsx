import { SectionCard } from "@/components/section-card"
import { Project } from "@/lib/mockDatabase"

interface VerdiløfteTabProps {
  project: Project;
  onAdd: (key: keyof Project, newItem: { id: string; title: string }) => void;
  onEdit: (key: keyof Project, id: string, newTitle: string) => void;
  onDelete: (key: keyof Project, id: string) => void;
}

export function VerdiløfteTab({ project, onAdd, onEdit, onDelete }: VerdiløfteTabProps) {
  return (
    <>
      <SectionCard
        title="Gevinster"
        emoji="🎁"
        count={project.gains.length}
        items={project.gains}
        onAdd={() => onAdd('gains', { id: Date.now().toString(), title: 'Ny gevinst' })}
        onEdit={(id, newTitle) => onEdit('gains', id, newTitle)}
        onDelete={(id) => onDelete('gains', id)}
        addLabel="Legg til en gevinst"
        infoText="Beskriv hvordan produktet ditt skaper kundegevinster"
      />
      <SectionCard
        title="Smertelindrere"
        emoji="🩹"
        count={project.painRelievers.length}
        items={project.painRelievers}
        onAdd={() => onAdd('painRelievers', { id: Date.now().toString(), title: 'Ny smertelindrer' })}
        onEdit={(id, newTitle) => onEdit('painRelievers', id, newTitle)}
        onDelete={(id) => onDelete('painRelievers', id)}
        addLabel="Legg til en smertelindrer"
        infoText="Forklar hvordan produktet ditt lindrer kundens smerter"
      />
      <SectionCard
        title="Nøkkelfordeler"
        emoji="🔑"
        count={project.keyBenefits.length}
        items={project.keyBenefits}
        onAdd={() => onAdd('keyBenefits', { id: Date.now().toString(), title: 'Ny nøkkelfordel' })}
        onEdit={(id, newTitle) => onEdit('keyBenefits', id, newTitle)}
        onDelete={(id) => onDelete('keyBenefits', id)}
        addLabel="Legg til en nøkkelfordel"
        infoText="De viktigste fordelene produktet eller tjenesten din tilbyr kundene"
      />
      <SectionCard
        title="Unike differensiatorer"
        emoji="🌟"
        count={project.uniqueDifferentiators.length}
        items={project.uniqueDifferentiators}
        onAdd={() => onAdd('uniqueDifferentiators', { id: Date.now().toString(), title: 'Ny differensiator' })}
        onEdit={(id, newTitle) => onEdit('uniqueDifferentiators', id, newTitle)}
        onDelete={(id) => onDelete('uniqueDifferentiators', id)}
        addLabel="Legg til en differensiator"
        infoText="Faktorer som skiller produktet ditt fra konkurrentene"
      />
      <SectionCard
        title="Emosjonelle drivere"
        emoji="❤️"
        count={project.emotionalDrivers.length}
        items={project.emotionalDrivers}
        onAdd={() => onAdd('emotionalDrivers', { id: Date.now().toString(), title: 'Ny emosjonell driver' })}
        onEdit={(id, newTitle) => onEdit('emotionalDrivers', id, newTitle)}
        onDelete={(id) => onDelete('emotionalDrivers', id)}
        addLabel="Legg til en emosjonell driver"
        infoText="Emosjonelle faktorer som påvirker kundenes beslutninger"
      />
    </>
  )
}

