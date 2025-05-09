"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Layers,
  Database,
  Code2,
  Palette,
  Server,
  GitBranch,
} from "lucide-react";
import type { JSX } from "react";

// Datos de ejemplo para habilidades
const initialSkills = [
  { id: 1, name: "HTML5", icon: "🌐", category: "Frontend" },
  { id: 2, name: "CSS3/SASS", icon: "🎨", category: "Frontend" },
  { id: 3, name: "JavaScript", icon: "📜", category: "Frontend" },
  { id: 4, name: "TypeScript", icon: "🔷", category: "Frontend" },
  { id: 5, name: "React", icon: "⚛️", category: "Frontend" },
  { id: 6, name: "Next.js", icon: "▲", category: "Frontend" },
  { id: 7, name: "Flutter Web", icon: "💙", category: "Frontend" },
  { id: 8, name: "Tailwind CSS", icon: "🌊", category: "Frontend" },
  { id: 9, name: "Node.js", icon: "🟢", category: "Backend" },
  { id: 10, name: "Express", icon: "🚂", category: "Backend" },
  { id: 11, name: "NestJS", icon: "🐈", category: "Backend" },
  { id: 12, name: "Laravel", icon: "🔺", category: "Backend" },
  { id: 13, name: "Django", icon: "🐍", category: "Backend" },
  { id: 14, name: "GraphQL", icon: "◼️", category: "Backend" },
  { id: 15, name: "REST API", icon: "🔄", category: "Backend" },
  { id: 16, name: "MySQL", icon: "🐬", category: "Bases de Datos" },
  { id: 17, name: "PostgreSQL", icon: "🐘", category: "Bases de Datos" },
  { id: 18, name: "MongoDB", icon: "🍃", category: "Bases de Datos" },
  { id: 19, name: "Firebase", icon: "🔥", category: "Bases de Datos" },
  { id: 20, name: "Redis", icon: "🔴", category: "Bases de Datos" },
];

const categoryIcons: Record<string, JSX.Element> = {
  Frontend: <Layers className="h-5 w-5" />,
  Backend: <Server className="h-5 w-5" />,
  "Bases de Datos": <Database className="h-5 w-5" />,
  Herramientas: <GitBranch className="h-5 w-5" />,
  "Desarrollo Móvil": <Code2 className="h-5 w-5" />,
  Diseño: <Palette className="h-5 w-5" />,
};

const categories = [
  "Frontend",
  "Backend",
  "Bases de Datos",
  "Herramientas",
  "Desarrollo Móvil",
  "Diseño",
];

export default function SkillsPage() {
  const [skills, setSkills] = useState(initialSkills);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<any>(null);
  const [newSkill, setNewSkill] = useState({
    name: "",
    icon: "",
    category: "",
  });

  // Filtrar habilidades por búsqueda y categoría
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? skill.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  // Agrupar habilidades por categoría
  const groupedSkills = filteredSkills.reduce(
    (acc: Record<string, any[]>, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {}
  );

  // Manejar cambios en el formulario de nueva habilidad
  const handleNewSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar cambio de categoría en el formulario
  const handleCategoryChange = (value: string) => {
    setNewSkill((prev) => ({ ...prev, category: value }));
  };

  // Añadir nueva habilidad
  const handleAddSkill = () => {
    const newId =
      skills.length > 0 ? Math.max(...skills.map((s) => s.id)) + 1 : 1;

    setSkills([
      ...skills,
      {
        id: newId,
        ...newSkill,
      },
    ]);

    setNewSkill({
      name: "",
      icon: "",
      category: "",
    });

    setIsAddDialogOpen(false);
  };

  // Preparar edición de habilidad
  const handleEditClick = (skill: any) => {
    setCurrentSkill(skill);
    setIsEditDialogOpen(true);
  };

  // Actualizar habilidad
  const handleUpdateSkill = () => {
    if (!currentSkill) return;

    setSkills(skills.map((s) => (s.id === currentSkill.id ? currentSkill : s)));

    setIsEditDialogOpen(false);
  };

  // Preparar eliminación de habilidad
  const handleDeleteClick = (skill: any) => {
    setCurrentSkill(skill);
    setIsDeleteDialogOpen(true);
  };

  // Eliminar habilidad
  const handleDeleteSkill = () => {
    if (!currentSkill) return;

    setSkills(skills.filter((s) => s.id !== currentSkill.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Gestión de Habilidades
        </h1>
        <p className="text-muted-foreground">
          Administra las habilidades técnicas que se muestran en tu portafolio.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar habilidades..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={selectedCategory || ""}
            onValueChange={(value) => setSelectedCategory(value || null)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Habilidad
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Añadir Nueva Habilidad</DialogTitle>
              <DialogDescription>
                Completa los detalles de la nueva habilidad técnica.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  value={newSkill.name}
                  onChange={handleNewSkillChange}
                  placeholder="Nombre de la habilidad"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="icon">Icono (emoji o símbolo)</Label>
                <Input
                  id="icon"
                  name="icon"
                  value={newSkill.icon}
                  onChange={handleNewSkillChange}
                  placeholder="🚀"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={newSkill.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleAddSkill}>Guardar Habilidad</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {Object.keys(groupedSkills).length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">
              No se encontraron habilidades
            </h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery || selectedCategory
                ? "No hay habilidades que coincidan con tu búsqueda. Intenta con otros términos o categoría."
                : "Añade tu primera habilidad haciendo clic en el botón 'Nueva Habilidad'."}
            </p>
          </div>
        ) : (
          Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Card key={category} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                    {categoryIcons[category] || <Code2 className="h-5 w-5" />}
                  </div>
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-2 p-3 rounded-lg bg-muted hover:bg-primary/5 transition-colors group relative"
                    >
                      <div className="text-xl">{skill.icon}</div>
                      <span className="text-sm font-medium">{skill.name}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Opciones</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEditClick(skill)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(skill)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Diálogo de edición */}
      {currentSkill && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Habilidad</DialogTitle>
              <DialogDescription>
                Actualiza los detalles de la habilidad técnica.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nombre</Label>
                <Input
                  id="edit-name"
                  value={currentSkill.name}
                  onChange={(e) =>
                    setCurrentSkill({ ...currentSkill, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-icon">Icono (emoji o símbolo)</Label>
                <Input
                  id="edit-icon"
                  value={currentSkill.icon}
                  onChange={(e) =>
                    setCurrentSkill({ ...currentSkill, icon: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Categoría</Label>
                <Select
                  value={currentSkill.category}
                  onValueChange={(value) =>
                    setCurrentSkill({ ...currentSkill, category: value })
                  }
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleUpdateSkill}>Guardar Cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Diálogo de confirmación de eliminación */}
      {currentSkill && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar la habilidad "
                {currentSkill.name}"? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDeleteSkill}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
