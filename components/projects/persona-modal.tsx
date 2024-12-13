import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionCard } from "@/components/projects/section-card";

interface Persona {
  id: string;
  name: string;
  age: number;
  job: string;
  image?: string;
  initials: string;
  pains: { id: string; title: string }[];
  gains: { id: string; title: string }[];
  jobs: { id: string; title: string }[];
  whereToReach: { id: string; title: string }[];
}

interface PersonaModalProps {
  isOpen: boolean;
  onClose: () => void;
  persona: Persona;
  onSave: (updatedPersona: Persona) => void;
}

export function PersonaModal({ isOpen, onClose, persona, onSave }: PersonaModalProps) {
  const [editedPersona, setEditedPersona] = useState<Persona>(persona);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPersona((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (section: keyof Persona, newItems: { id: string; title: string }[]) => {
    setEditedPersona((prev) => ({ ...prev, [section]: newItems }));
  };

  const handleSave = () => {
    onSave(editedPersona);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Rediger Persona</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto px-6">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Navn</Label>
                <Input id="name" name="name" value={editedPersona.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="age">Alder</Label>
                <Input id="age" name="age" type="number" value={editedPersona.age} onChange={handleInputChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="job">Jobb</Label>
              <Input id="job" name="job" value={editedPersona.job} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SectionCard
                title="Pains"
                emoji="😣"
                items={editedPersona.pains}
                onAdd={() => handleSectionChange("pains", [...editedPersona.pains, { id: Date.now().toString(), title: "Ny pain" }])}
                onEdit={(id, newTitle) =>
                  handleSectionChange(
                    "pains",
                    editedPersona.pains.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
                  )
                }
                onDelete={(id) =>
                  handleSectionChange(
                    "pains",
                    editedPersona.pains.filter((item) => item.id !== id)
                  )
                }
                addLabel="Legg til pain"
                infoText="Beskriv personaens utfordringer og frustrasjoner"
              />
              <SectionCard
                title="Gains"
                emoji="😊"
                items={editedPersona.gains}
                onAdd={() => handleSectionChange("gains", [...editedPersona.gains, { id: Date.now().toString(), title: "Ny gain" }])}
                onEdit={(id, newTitle) =>
                  handleSectionChange(
                    "gains",
                    editedPersona.gains.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
                  )
                }
                onDelete={(id) =>
                  handleSectionChange(
                    "gains",
                    editedPersona.gains.filter((item) => item.id !== id)
                  )
                }
                addLabel="Legg til gain"
                infoText="Beskriv personaens ønsker og mål"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SectionCard
                title="Jobs-to-be-done"
                emoji="🛠️"
                items={editedPersona.jobs}
                onAdd={() => handleSectionChange("jobs", [...editedPersona.jobs, { id: Date.now().toString(), title: "Ny jobb" }])}
                onEdit={(id, newTitle) =>
                  handleSectionChange(
                    "jobs",
                    editedPersona.jobs.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
                  )
                }
                onDelete={(id) =>
                  handleSectionChange(
                    "jobs",
                    editedPersona.jobs.filter((item) => item.id !== id)
                  )
                }
                addLabel="Legg til jobb"
                infoText="Beskriv oppgaver personaen ønsker å utføre"
              />
              <SectionCard
                title="Hvor å nå"
                emoji="📍"
                items={editedPersona.whereToReach}
                onAdd={() => handleSectionChange("whereToReach", [...editedPersona.whereToReach, { id: Date.now().toString(), title: "Ny kanal" }])}
                onEdit={(id, newTitle) =>
                  handleSectionChange(
                    "whereToReach",
                    editedPersona.whereToReach.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
                  )
                }
                onDelete={(id) =>
                  handleSectionChange(
                    "whereToReach",
                    editedPersona.whereToReach.filter((item) => item.id !== id)
                  )
                }
                addLabel="Legg til kanal"
                infoText="Beskriv hvor og hvordan å nå denne personaen"
              />
            </div>
          </div>
        </div>
        <div className="mt-auto flex justify-end space-x-2 py-4 px-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Avbryt
          </Button>
          <Button onClick={handleSave}>Lagre endringer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
