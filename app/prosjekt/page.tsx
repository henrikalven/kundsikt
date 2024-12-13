"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Sparkles, SlidersHorizontal, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/dateUtils";

interface Project {
  id: string;
  name: string;
  phase: {
    name: string;
    color: string;
  };
  progress: number;
  lastSaved: number;
}

const phases = [
  { label: "Alle prosjekter", value: "all" },
  { label: "Verdiløfte", value: "value-prop" },
  { label: "Lean Canvas", value: "lean-canvas" },
  { label: "Fullført", value: "complete" },
];

type SortKey = "name" | "phase" | "progress" | "lastSaved";

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedPhase, setSelectedPhase] = useState("all");

  const itemsPerPage = 10;

  useEffect(() => {
    fetchProjects();
  }, [searchQuery, currentPage, sortKey, sortOrder, selectedPhase]);

  const fetchProjects = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      query: searchQuery,
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
      phase: selectedPhase,
      sortKey,
      sortOrder,
    });

    try {
      const response = await fetch(`/api/projects?${queryParams}`);
      const data = await response.json();
      setProjects(data.projects);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const handlePhaseChange = (phase: string) => {
    setSelectedPhase(phase.toLowerCase());
    setCurrentPage(1);
  };

  const activeCount = projects.filter((p) => p.phase.name !== "Fullført").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Prosjekter</h1>
          <p className="text-sm text-muted-foreground mt-1">{activeCount} aktive prosjekter</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="group relative overflow-hidden" size="lg">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 group-hover:opacity-75 opacity-0 transition-opacity" />
            <Sparkles className="w-4 h-4 mr-2 text-violet-500" />
            Nytt prosjekt med AI
          </Button>
          <Button size="lg" className="min-w-[140px]">
            Nytt prosjekt
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Søk i prosjekter..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[120px]">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {phases.map((phase) => (
              <DropdownMenuItem key={phase.value} onSelect={() => handlePhaseChange(phase.value)}>
                {phase.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-xl border shadow-sm bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%] cursor-pointer" onClick={() => handleSort("name")}>
                Prosjektnavn {sortKey === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("phase")}>
                Nåværende fase {sortKey === "phase" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("progress")}>
                Fremdrift {sortKey === "progress" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("lastSaved")}>
                Sist lagret {sortKey === "lastSaved" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-32" />
                    </TableCell>
                  </TableRow>
                ))
              : projects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Link href={`/prosjekt/${project.id}`} className="flex items-center gap-3 font-medium hover:text-primary transition-colors">
                        {project.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("font-normal", project.phase.color)}>
                        {project.phase.name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1.5">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={cn("w-2 h-2 rounded-full transition-colors", i < project.progress ? "bg-primary" : "bg-muted")} />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(project.lastSaved)}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Viser {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} av {totalItems} prosjekter
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1 || loading}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1 || loading}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages || loading}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages || loading}>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
