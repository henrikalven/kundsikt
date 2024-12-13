"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Project } from "@/lib/mockDatabase";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetaljerTabProps {
  project: Project;
  updateProject: (updates: Partial<Project>) => void;
}

export function DetaljerTab({ project, updateProject }: DetaljerTabProps) {
  const [editingField, setEditingField] = useState<keyof Project | null>(null);
  const [editedValue, setEditedValue] = useState("");

  const handleEditStart = (field: keyof Project) => {
    setEditingField(field);
    setEditedValue(project[field] as string);
  };

  const handleEditCancel = () => {
    setEditingField(null);
  };

  const handleEditSave = () => {
    if (editingField && editedValue.trim()) {
      updateProject({ [editingField]: editedValue });
      setEditingField(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Allow new line with Shift+Enter
        return;
      } else {
        // Save on plain Enter
        e.preventDefault();
        handleEditSave();
      }
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedValue(e.target.value);
  };

  const editableFields: (keyof Project)[] = ["name", "description", "vision"];
  const isTextArea = (field: keyof Project | null) => (field ? ["description", "vision"].includes(field) : false);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4 px-5 bg-muted/50">
        <CardTitle className="text-base font-semibold">Business Idea Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {editableFields.map((field) => (
            <div key={field} className="group relative py-3.5 px-5 hover:bg-muted/50 transition-colors">
              <Label htmlFor={field} className="text-sm font-medium text-muted-foreground">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              {editingField === field ? (
                <div className="mt-2 space-y-2">
                  {isTextArea(field) ? (
                    <Textarea id={field} name={field} value={editedValue} onChange={handleChange} onKeyDown={handleKeyDown} className="w-full resize-none min-h-[80px]" placeholder={`Enter ${field}...`} autoFocus />
                  ) : (
                    <Input id={field} name={field} value={editedValue} onChange={handleChange} onKeyDown={handleKeyDown} className="w-full" placeholder={`Enter ${field}...`} autoFocus />
                  )}
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={handleEditCancel}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleEditSave} disabled={!editedValue.trim()}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3 mt-1">
                  <button onClick={() => handleEditStart(field)} className={cn("flex-grow text-sm py-1 text-left", "hover:text-primary transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm")}>
                    {project[field] as string}
                  </button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleEditStart(field)}>
                    <Pencil className="w-4 h-4" />
                    <span className="sr-only">Edit {field}</span>
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
