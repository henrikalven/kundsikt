import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react'

interface PersonaProps {
  id: string
  name: string
  age: number
  job: string
  image?: string
  initials: string
  onClick: () => void
  onEdit: () => void
  onDelete: () => void
}

export function PersonaCard({ id, name, age, job, image, initials, onClick, onEdit, onDelete }: PersonaProps) {
  return (
    <div
      className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors relative"
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-2">
        <Avatar className="w-16 h-16">
          {image ? <AvatarImage src={image} alt={name} /> : null}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{age} år, {job}</div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Åpne meny</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(); }}>
            Rediger
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete(); }}>
            Slett
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

