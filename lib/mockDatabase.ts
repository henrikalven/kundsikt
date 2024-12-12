export interface Project {
  id: string;
  name: string;
  phase: {
    name: string;
    color: string;
  };
  progress: number;
  lastSaved: number; // Changed from lastEdited (string) to lastSaved (number)
  description: string;
  vision: string;
  targetMarket: string;
  uniqueSellingPoint: string;
  problems: { id: string; title: string }[];
  solutions: { id: string; title: string }[];
  gains: { id: string; title: string }[];
  painRelievers: { id: string; title: string }[];
  keyBenefits: { id: string; title: string }[];
  uniqueDifferentiators: { id: string; title: string }[];
  emotionalDrivers: { id: string; title: string }[];
  segments: { id: string; title: string }[];
  personas: {
    id: string;
    name: string;
    age: number;
    job: string;
    initials: string;
    pains: { id: string; title: string }[];
    gains: { id: string; title: string }[];
    jobs: { id: string; title: string }[];
    whereToReach: { id: string; title: string }[];
  }[];
  positioning: { id: string; title: string }[];
  keyMessages: { id: string; title: string }[];
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Markedsanalyse 2024",
    phase: {
      name: "Verdiløfte",
      color: "bg-blue-100 text-blue-900",
    },
    progress: 2,
    lastSaved: Date.now() - 7200000, // 2 hours ago
    description: "En omfattende markedsanalyse for å identifisere nye muligheter i 2024.",
    vision: "Å gi bedrifter innsikt i fremtidige markedstrender og muligheter.",
    targetMarket: "Mellomstore og store bedrifter i ulike sektorer.",
    uniqueSellingPoint: "Kombinasjon av AI-drevet dataanalyse og ekspertinnsikt.",
    problems: [
      { id: "1", title: "Mangel på markedsinnsikt" },
      { id: "2", title: "Utdaterte analysemetoder" },
    ],
    solutions: [
      { id: "1", title: "AI-drevet dataanalyse" },
      { id: "2", title: "Sanntids markedsovervåkning" },
    ],
    gains: [
      { id: "1", title: "Bedre beslutningsgrunnlag" },
      { id: "2", title: "Konkurransefortrinn" },
    ],
    painRelievers: [
      { id: "1", title: "Automatisert datainnsamling" },
      { id: "2", title: "Intuitive rapporter" },
    ],
    keyBenefits: [
      { id: "1", title: "Økt markedsandel" },
      { id: "2", title: "Reduserte kostnader" },
    ],
    uniqueDifferentiators: [
      { id: "1", title: "Prediktiv analyse" },
      { id: "2", title: "Bransjespesifikke innsikter" },
    ],
    emotionalDrivers: [
      { id: "1", title: "Trygghet i beslutninger" },
      { id: "2", title: "Stolthet over innovasjon" },
    ],
    segments: [
      { id: "1", title: "Teknologibedrifter" },
      { id: "2", title: "Finansinstitusjoner" },
    ],
    personas: [
      {
        id: "1",
        name: "Marte Markedsdirektør",
        age: 42,
        job: "Markedsdirektør",
        initials: "MM",
        pains: [{ id: "1", title: "Tidkrevende rapportering" }],
        gains: [{ id: "1", title: "Raskere beslutningsprosesser" }],
        jobs: [{ id: "1", title: "Utvikle markedsstrategier" }],
        whereToReach: [{ id: "1", title: "LinkedIn" }],
      },
    ],
    positioning: [
      { id: "1", title: "Ledende innen AI-drevet markedsanalyse" },
      { id: "2", title: "Pålitelig partner for vekst" },
    ],
    keyMessages: [
      { id: "1", title: "Fremtidssikre din bedrift med datadrevet innsikt" },
      { id: "2", title: "Oppnå målbare resultater raskere" },
    ],
  },
  // Add more projects here if needed
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getAllProjects(): Project[] {
  return projects;
}
