import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { InfoIcon, Plus, Trash2 } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Item {
  id: string
  title: string
}

interface SectionCardProps {
  title: string
  count?: number
  items: Item[]
  onAdd: () => void
  onEdit: (id: string, newTitle: string) => void
  onDelete: (id: string) => void
  addLabel: string
  infoText: string
  emoji?: string
}

export function SectionCard({ title, count, items, onAdd, onEdit, onDelete, addLabel, infoText, emoji }: SectionCardProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null)

  const handleEditStart = (item: Item) => {
    setEditingId(item.id)
    setEditingTitle(item.title)
  }

  const handleEditSave = () => {
    if (editingId) {
      onEdit(editingId, editingTitle)
      setEditingId(null)
    }
  }

  const handleEditCancel = () => {
    setEditingId(null)
  }

  const handleDeleteConfirm = (id: string) => {
    setDeleteConfirmation(null)
    onDelete(id)
  }

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 py-3 px-4 bg-muted">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-base font-medium">
            {emoji && <span className="mr-2">{emoji}</span>}{title}
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{infoText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {count !== undefined && (
          <Badge variant="secondary" className="bg-background/50 hover:bg-background/80">
            {count}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 py-3 px-4 hover:bg-muted/50 group transition-colors"
            >
              {editingId === item.id ? (
                <div className="flex-grow space-y-2">
                  <Textarea
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="w-full"
                    rows={3}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" onClick={handleEditCancel}>Cancel</Button>
                    <Button size="sm" onClick={handleEditSave}>Save</Button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="flex-grow cursor-pointer" onClick={() => handleEditStart(item)}>
                    {item.title}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteConfirmation(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          ))}
          <div className="p-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10"
              onClick={onAdd}
            >
              <Plus className="w-4 h-4 mr-2" />
              {addLabel}
            </Button>
          </div>
        </div>
      </CardContent>
      <AlertDialog open={deleteConfirmation !== null} onOpenChange={() => setDeleteConfirmation(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this item?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteConfirmation && handleDeleteConfirm(deleteConfirmation)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

