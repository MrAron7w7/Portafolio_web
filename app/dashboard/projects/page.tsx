"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  ExternalLink,
  Github,
} from "lucide-react";

// Datos de ejemplo para proyectos
const initialProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "Plataforma de comercio electrónico completa con carrito de compras, pagos y panel de administración.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Aplicación de gestión de tareas con funciones de colaboración en tiempo real y notificaciones.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Next.js", "Firebase", "Tailwind CSS", "TypeScript"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 3,
    title: "Fitness Tracker",
    description:
      "Aplicación móvil para seguimiento de actividad física, nutrición y progreso personal.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Flutter", "Firebase", "RESTful API", "Charts"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: 4,
    title: "Real Estate Platform",
    description:
      "Plataforma para búsqueda y listado de propiedades con mapas interactivos y filtros avanzados.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React", "Django", "PostgreSQL", "Google Maps API"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "/placeholder.svg?height=400&width=600",
    technologies: "",
    demoUrl: "",
    githubUrl: "",
  });

  // Filtrar proyectos por búsqueda
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Manejar cambios en el formulario de nuevo proyecto
  const handleNewProjectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  // Añadir nuevo proyecto
  const handleAddProject = () => {
    const techArray = newProject.technologies
      .split(",")
      .map((tech) => tech.trim());
    const newId =
      projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;

    setProjects([
      ...projects,
      {
        id: newId,
        ...newProject,
        technologies: techArray,
      },
    ]);

    setNewProject({
      title: "",
      description: "",
      image: "/placeholder.svg?height=400&width=600",
      technologies: "",
      demoUrl: "",
      githubUrl: "",
    });

    setIsAddDialogOpen(false);
  };

  // Preparar edición de proyecto
  const handleEditClick = (project: any) => {
    setCurrentProject(project);
    setIsEditDialogOpen(true);
  };

  // Actualizar proyecto
  const handleUpdateProject = () => {
    if (!currentProject) return;

    const techArray =
      typeof currentProject.technologies === "string"
        ? currentProject.technologies.split(",").map((tech) => tech.trim())
        : currentProject.technologies;

    setProjects(
      projects.map((p) =>
        p.id === currentProject.id
          ? { ...currentProject, technologies: techArray }
          : p
      )
    );

    setIsEditDialogOpen(false);
  };

  // Preparar eliminación de proyecto
  const handleDeleteClick = (project: any) => {
    setCurrentProject(project);
    setIsDeleteDialogOpen(true);
  };

  // Eliminar proyecto
  const handleDeleteProject = () => {
    if (!currentProject) return;

    setProjects(projects.filter((p) => p.id !== currentProject.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Gestión de Proyectos
        </h1>
        <p className="text-muted-foreground">
          Administra los proyectos que se muestran en tu portafolio.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64 md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar proyectos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Proyecto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Proyecto</DialogTitle>
              <DialogDescription>
                Completa los detalles del nuevo proyecto para añadirlo a tu
                portafolio.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  value={newProject.title}
                  onChange={handleNewProjectChange}
                  placeholder="Nombre del proyecto"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newProject.description}
                  onChange={handleNewProjectChange}
                  placeholder="Describe tu proyecto"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">URL de la imagen</Label>
                <Input
                  id="image"
                  name="image"
                  value={newProject.image}
                  onChange={handleNewProjectChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="technologies">
                  Tecnologías (separadas por comas)
                </Label>
                <Input
                  id="technologies"
                  name="technologies"
                  value={newProject.technologies}
                  onChange={handleNewProjectChange}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="demoUrl">URL de Demo</Label>
                  <Input
                    id="demoUrl"
                    name="demoUrl"
                    value={newProject.demoUrl}
                    onChange={handleNewProjectChange}
                    placeholder="https://ejemplo.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="githubUrl">URL de GitHub</Label>
                  <Input
                    id="githubUrl"
                    name="githubUrl"
                    value={newProject.githubUrl}
                    onChange={handleNewProjectChange}
                    placeholder="https://github.com/usuario/proyecto"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleAddProject}>Guardar Proyecto</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Opciones</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditClick(project)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(project)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech: string, i: number) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button asChild size="sm" variant="outline">
                <Link href={project.demoUrl} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Demo
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href={project.githubUrl} target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Diálogo de edición */}
      {currentProject && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Proyecto</DialogTitle>
              <DialogDescription>
                Actualiza los detalles del proyecto.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  value={currentProject.title}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea
                  id="edit-description"
                  value={currentProject.description}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">URL de la imagen</Label>
                <Input
                  id="edit-image"
                  value={currentProject.image}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      image: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-technologies">
                  Tecnologías (separadas por comas)
                </Label>
                <Input
                  id="edit-technologies"
                  value={
                    Array.isArray(currentProject.technologies)
                      ? currentProject.technologies.join(", ")
                      : currentProject.technologies
                  }
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      technologies: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-demoUrl">URL de Demo</Label>
                  <Input
                    id="edit-demoUrl"
                    value={currentProject.demoUrl}
                    onChange={(e) =>
                      setCurrentProject({
                        ...currentProject,
                        demoUrl: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-githubUrl">URL de GitHub</Label>
                  <Input
                    id="edit-githubUrl"
                    value={currentProject.githubUrl}
                    onChange={(e) =>
                      setCurrentProject({
                        ...currentProject,
                        githubUrl: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleUpdateProject}>Guardar Cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Diálogo de confirmación de eliminación */}
      {currentProject && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar el proyecto "
                {currentProject.title}"? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDeleteProject}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Mensaje cuando no hay proyectos */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">No se encontraron proyectos</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery
              ? "No hay proyectos que coincidan con tu búsqueda. Intenta con otros términos."
              : "Añade tu primer proyecto haciendo clic en el botón 'Nuevo Proyecto'."}
          </p>
        </div>
      )}
    </div>
  );
}
