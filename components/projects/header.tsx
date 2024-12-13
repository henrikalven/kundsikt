import { MoreHorizontal, Save, FileText, Download, Settings, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/dateUtils";
import Link from "next/link";

interface HeaderProps {
  projectName: string;
  lastSaved: number;
  sidebarExpanded: boolean;
  onProjectSave: () => void;
}

export function Header({ projectName, lastSaved, sidebarExpanded, onProjectSave }: HeaderProps) {
  return (
    <header className="">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4">
        <div className="flex items-center space-x-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">{projectName}</h1>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">Active</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Sist lagret: {formatDate(lastSaved)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <Button variant="outline" size="default" className="hidden sm:inline-flex" onClick={onProjectSave}>
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
    </header>
  );
}
