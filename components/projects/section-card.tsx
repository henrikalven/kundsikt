"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { InfoIcon, Plus, Trash2, Pencil } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface Item {
  id: string;
  title: string;
}

interface SectionCardProps {
  title: string;
  count?: number;
  items: Item[];
  onAdd: () => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  addLabel: string;
  infoText: string;
  emoji?: string;
  className?: string;
}

export function SectionCard({ title, count, items, onAdd, onEdit, onDelete, addLabel, infoText, emoji, className }: SectionCardProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);

  const handleEditStart = (item: Item) => {
    setEditingId(item.id);
    setEditingTitle(item.title);
  };

  const handleEditSave = () => {
    if (editingId && editingTitle.trim()) {
      onEdit(editingId, editingTitle);
      setEditingId(null);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleDeleteConfirm = (id: string) => {
    setDeleteConfirmation(null);
    onDelete(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  return (
    <Card className={cn("mb-6 overflow-hidden border shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4 px-5 bg-muted/50">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            {emoji && <span>{emoji}</span>}
            {title}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="w-4 h-4 text-muted-foreground cursor-help ml-1" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{infoText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </div>
        {count !== undefined && (
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {count}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {items.map((item) => (
            <div key={item.id} className="group relative flex items-center gap-3 py-3.5 px-5 hover:bg-muted/50 transition-colors">
              {editingId === item.id ? (
                <div className="flex-grow space-y-2">
                  <Textarea value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} onKeyDown={handleKeyDown} className="w-full resize-none min-h-[80px]" placeholder="Enter text here..." autoFocus />
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={handleEditCancel}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleEditSave} disabled={!editingTitle.trim()}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <button onClick={() => handleEditStart(item)} className="flex-grow text-sm py-1 text-left hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
                    {item.title}
                  </button>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleEditStart(item)}>
                      <Pencil className="w-4 h-4" />
                      <span className="sr-only">Edit item</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => setDeleteConfirmation(item.id)}>
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Delete item</span>
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
          <div className="p-4">
            <Button variant="ghost" className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10" onClick={onAdd}>
              <Plus className="w-4 h-4 mr-2" />
              {addLabel}
            </Button>
          </div>
        </div>
      </CardContent>

      <AlertDialog open={deleteConfirmation !== null} onOpenChange={() => setDeleteConfirmation(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this item? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteConfirmation && handleDeleteConfirm(deleteConfirmation)} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
