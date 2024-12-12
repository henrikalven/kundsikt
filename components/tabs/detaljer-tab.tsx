'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Project } from "@/lib/mockDatabase"

interface DetaljerTabProps {
  project: Project;
  updateProject: (updates: Partial<Project>) => void;
}

export function DetaljerTab({ project, updateProject }: DetaljerTabProps) {
  const [editingField, setEditingField] = useState<keyof Project | null>(null)
  const [editedValue, setEditedValue] = useState("")

  const handleEditStart = (field: keyof Project) => {
    setEditingField(field)
    setEditedValue(project[field] as string)
  }

  const handleEditCancel = () => {
    setEditingField(null)
  }

  const handleEditSave = () => {
    if (editingField) {
      updateProject({ [editingField]: editedValue })
      setEditingField(null)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedValue(e.target.value)
  }

  const editableFields: (keyof Project)[] = ['name', 'description', 'vision', 'targetMarket', 'uniqueSellingPoint']

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 px-4 bg-muted">
        <CardTitle className="text-base font-medium">Business Idea Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {editableFields.map((field) => (
            <div key={field} className="py-3 px-4 hover:bg-muted/50 transition-colors">
              <Label htmlFor={field} className="text-sm font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              {editingField === field ? (
                <div className="flex items-center gap-3 mt-2">
                  {field === 'description' || field === 'vision' || field === 'uniqueSellingPoint' ? (
                    <Textarea
                      id={field}
                      name={field}
                      value={editedValue}
                      onChange={handleChange}
                      className="flex-grow"
                    />
                  ) : (
                    <Input
                      id={field}
                      name={field}
                      value={editedValue}
                      onChange={handleChange}
                      className="flex-grow"
                    />
                  )}
                  <Button size="sm" onClick={handleEditSave}>Save</Button>
                  <Button size="sm" variant="outline" onClick={handleEditCancel}>Cancel</Button>
                </div>
              ) : (
                <p className="mt-1 cursor-pointer" onClick={() => handleEditStart(field)}>
                  {project[field] as string}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

