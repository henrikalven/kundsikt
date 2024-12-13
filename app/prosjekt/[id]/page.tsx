"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/projects/header";
import { Navigation } from "@/components/projects/navigation";
import { DetaljerTab } from "@/components/projects/tabs/detaljer-tab";
import { ProblemTab } from "@/components/projects/tabs/problem-tab";
import { VerdiløfteTab } from "@/components/projects/tabs/verdilofte-tab";
import { MålgruppeTab } from "@/components/projects/tabs/malgruppe-tab";
import { MarkedsføringTab } from "@/components/projects/tabs/markedsforing-tab";
import { LeanCanvasTab } from "@/components/projects/tabs/lean-canvas-tab";
import { Project } from "@/lib/mockDatabase";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function ProjectPage() {
  const [activeTab, setActiveTab] = useState("detaljer");
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }
        const data: Project = await response.json();
        setProject(data);
      } catch (err) {
        setError("An error occurred while fetching project details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const updateProject = (updates: Partial<Project>) => {
    setProject((prev) => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  };

  const saveProject = async () => {
    if (!project) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      const updatedProject = await response.json();
      setProject(updatedProject);

      toast({
        title: "Success",
        description: "Project saved successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-12 w-full" />
        <div className="p-0">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Error</h1>
        <p>{error || "Project not found"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <Header projectName={project.name} lastSaved={project.lastSaved} sidebarExpanded={false} onProjectSave={saveProject} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="space-y-8 pt-6">
        {activeTab === "detaljer" && <DetaljerTab project={project} updateProject={updateProject} />}
        {activeTab === "problem" && <ProblemTab project={project} updateProject={updateProject} />}
        {activeTab === "verdilofte" && <VerdiløfteTab project={project} updateProject={updateProject} />}
        {activeTab === "malgruppe" && <MålgruppeTab project={project} updateProject={updateProject} />}
        {activeTab === "markedsforing" && <MarkedsføringTab project={project} updateProject={updateProject} />}
        {activeTab === "canvas" && <LeanCanvasTab project={project} updateProject={updateProject} />}
      </main>
      <Toaster />
    </div>
  );
}
