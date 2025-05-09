"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Save, Download } from "lucide-react";

export default function AboutPage() {
  const [profileData, setProfileData] = useState({
    name: "Carlos Rodríguez",
    title: "Desarrollador Full Stack",
    bio: "Soy un desarrollador con más de 5 años de experiencia creando aplicaciones web y móviles. Me especializo en tecnologías modernas como React, Node.js y Flutter, siempre enfocado en crear experiencias de usuario excepcionales.\n\nMi enfoque combina habilidades técnicas con una mentalidad orientada a resultados. Disfruto resolviendo problemas complejos y transformando ideas en productos digitales funcionales y atractivos.",
    image: "/placeholder.svg?height=400&width=400",
    cvLink: "/cv.pdf",
    favoriteSkills: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Flutter",
      "Firebase",
    ],
    interests: [
      { icon: "💻", text: "Desarrollo Web" },
      { icon: "📱", text: "Desarrollo Móvil" },
      { icon: "🎨", text: "Diseño UI/UX" },
      { icon: "🌐", text: "Open Source" },
    ],
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  // Simular carga de imagen
  const handleImageUpload = () => {
    setIsUploading(true);
    // Simulación de carga
    setTimeout(() => {
      setIsUploading(false);
      // No cambiamos la imagen en este ejemplo, pero aquí se actualizaría
    }, 1500);
  };

  // Guardar cambios
  const handleSave = () => {
    setIsSaving(true);
    // Simulación de guardado
    setTimeout(() => {
      setIsSaving(false);
      // Aquí se enviarían los datos a una API
    }, 1500);
  };

  // Añadir nueva habilidad favorita
  const handleAddSkill = () => {
    if (
      newSkill.trim() &&
      !profileData.favoriteSkills.includes(newSkill.trim())
    ) {
      setProfileData({
        ...profileData,
        favoriteSkills: [...profileData.favoriteSkills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  // Eliminar habilidad
  const handleRemoveSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      favoriteSkills: profileData.favoriteSkills.filter((s) => s !== skill),
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Sobre Mí</h1>
        <p className="text-muted-foreground">
          Edita tu información personal y profesional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <Image
                src={profileData.image || "/placeholder.svg"}
                alt="Foto de perfil"
                fill
                className="object-cover rounded-full border-4 border-primary/20"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleImageUpload}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Cambiar foto
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cvLink">Enlace al CV</Label>
                <div className="flex gap-2">
                  <Input
                    id="cvLink"
                    value={profileData.cvLink}
                    onChange={(e) =>
                      setProfileData({ ...profileData, cvLink: e.target.value })
                    }
                    placeholder="/cv.pdf"
                  />
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={profileData.cvLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Intereses</Label>
                <div className="grid grid-cols-2 gap-2">
                  {profileData.interests.map((interest, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted"
                    >
                      <div className="text-xl">{interest.icon}</div>
                      <span className="text-sm">{interest.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Título Profesional</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) =>
                      setProfileData({ ...profileData, title: e.target.value })
                    }
                    placeholder="Tu título o rol"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  placeholder="Escribe sobre ti..."
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label>Tecnologías Favoritas</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileData.favoriteSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-primary/10 text-primary hover:bg-primary/20 pl-2 pr-1 py-1"
                    >
                      {skill}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-transparent"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Nueva tecnología..."
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  />
                  <Button onClick={handleAddSkill}>Añadir</Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
