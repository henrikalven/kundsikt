import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

interface ItemListProps {
  items: Item[]
  onAdd: () => void
  onEdit: (id: string, newTitle: string) => void
  onDelete: (id: string) => void
  addLabel: string
}

export function ItemList({ items, onAdd, onEdit, onDelete, addLabel }: ItemListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
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
    <div className="divide-y divide-border">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center gap-3 py-3 pl-4 pr-3 hover:bg-muted/50 group transition-colors"
        >
          {editingId === item.id ? (
            <>
              <Input
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                className="flex-grow"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEditSave()
                  if (e.key === 'Escape') handleEditCancel()
                }}
              />
              <Button size="sm" onClick={handleEditSave}>Save</Button>
              <Button size="sm" variant="outline" onClick={handleEditCancel}>Cancel</Button>
            </>
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
    </div>
  )
}

