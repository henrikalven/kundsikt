import { MoreHorizontal, Save, FileText, Download, Settings, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getRelativeTimeString, formatDate } from "@/lib/dateUtils"
import Link from 'next/link'

interface HeaderProps {
  projectName: string;
  lastSaved: number;
  sidebarExpanded: boolean;
  onProjectSave: () => void;
}

export function Header({ projectName, lastSaved, sidebarExpanded, onProjectSave }: HeaderProps) {
  return (
    <header className="border-b bg-background">
      <div className={cn(
        "mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 transition-all duration-300",
        sidebarExpanded ? "max-w-[calc(100%-16rem)]" : "max-w-[calc(100%-4rem)]"
      )}>
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <Link href="/prosjekt" passHref>
            <Button variant="ghost" size="icon" className="mr-2 sm:mr-4">
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Go back to projects</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold">{projectName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                Active
              </span>
              <span className="text-sm text-muted-foreground">Sist lagret: {formatDate(lastSaved)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={onProjectSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="sm:hidden" onClick={onProjectSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

