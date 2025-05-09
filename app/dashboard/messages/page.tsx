"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  Trash2,
  Mail,
  Reply,
  Star,
  StarOff,
  Filter,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Datos de ejemplo para mensajes
const initialMessages = [
  {
    id: 1,
    name: "María García",
    email: "maria@example.com",
    subject: "Oportunidad de colaboración",
    message:
      "Hola Carlos, me encantaría hablar contigo sobre una posible colaboración en un proyecto que estoy desarrollando. Creo que tus habilidades serían perfectas para lo que tengo en mente. ¿Podríamos agendar una llamada para discutir los detalles?",
    date: new Date(2023, 6, 15),
    read: true,
    starred: true,
  },
  {
    id: 2,
    name: "Juan Pérez",
    email: "juan@example.com",
    subject: "Consulta sobre desarrollo web",
    message:
      "Buenas tardes, estoy interesado en desarrollar una aplicación web para mi negocio y me gustaría saber si ofreces este tipo de servicios y cuáles serían tus tarifas aproximadas. Gracias de antemano por tu respuesta.",
    date: new Date(2023, 6, 18),
    read: true,
    starred: false,
  },
  {
    id: 3,
    name: "Ana Martínez",
    email: "ana@example.com",
    subject: "Oferta de trabajo",
    message:
      "Hola Carlos, soy reclutadora en TechCompany y estamos buscando un desarrollador full stack con tu perfil. Me impresionó mucho tu portafolio y me gustaría hablar contigo sobre una posición que tenemos disponible. ¿Estarías interesado?",
    date: new Date(2023, 6, 20),
    read: false,
    starred: true,
  },
  {
    id: 4,
    name: "Roberto Sánchez",
    email: "roberto@example.com",
    subject: "Feedback sobre tu portafolio",
    message:
      "¡Hola! Acabo de ver tu portafolio y quería felicitarte por el excelente trabajo. La interfaz es muy intuitiva y los proyectos que muestras son impresionantes. Como desarrollador senior, te recomendaría destacar más tus contribuciones específicas en cada proyecto. ¡Sigue así!",
    date: new Date(2023, 6, 22),
    read: false,
    starred: false,
  },
  {
    id: 5,
    name: "Laura Gómez",
    email: "laura@example.com",
    subject: "Consulta sobre tu proyecto E-commerce",
    message:
      "Hola Carlos, vi tu proyecto de plataforma E-commerce y me pareció muy interesante. Estoy trabajando en algo similar y me gustaría saber qué tecnologías utilizaste para el procesamiento de pagos y si tuviste algún desafío particular en la implementación. Gracias por compartir tu conocimiento.",
    date: new Date(2023, 6, 25),
    read: true,
    starred: false,
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<any>(null);

  // Filtrar mensajes
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "unread") return matchesSearch && !message.read;
    if (filter === "starred") return matchesSearch && message.starred;
    return matchesSearch;
  });

  // Ver mensaje
  const handleViewMessage = (message: any) => {
    // Marcar como leído
    if (!message.read) {
      setMessages(
        messages.map((m) => (m.id === message.id ? { ...m, read: true } : m))
      );
    }

    setCurrentMessage(message);
    setIsViewDialogOpen(true);
  };

  // Alternar destacado
  const handleToggleStar = (message: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages(
      messages.map((m) =>
        m.id === message.id ? { ...m, starred: !m.starred } : m
      )
    );
  };

  // Preparar eliminación de mensaje
  const handleDeleteClick = (message: any) => {
    setCurrentMessage(message);
    setIsDeleteDialogOpen(true);
  };

  // Eliminar mensaje
  const handleDeleteMessage = () => {
    if (!currentMessage) return;

    setMessages(messages.filter((m) => m.id !== currentMessage.id));
    setIsDeleteDialogOpen(false);

    // Si estábamos viendo el mensaje, cerrar el diálogo de vista
    if (isViewDialogOpen) {
      setIsViewDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Mensajes</h1>
        <p className="text-muted-foreground">
          Gestiona los mensajes recibidos a través del formulario de contacto.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64 md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar mensajes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {filter === "all"
                ? "Todos"
                : filter === "unread"
                ? "No leídos"
                : "Destacados"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilter("all")}>
              Todos los mensajes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("unread")}>
              No leídos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("starred")}>
              Destacados
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Bandeja de entrada</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredMessages.length === 0 ? (
            <div className="text-center py-10">
              <Mail className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="text-lg font-medium mt-2">No hay mensajes</h3>
              <p className="text-muted-foreground mt-1">
                {searchQuery
                  ? "No hay mensajes que coincidan con tu búsqueda."
                  : filter === "unread"
                  ? "No tienes mensajes sin leer."
                  : filter === "starred"
                  ? "No tienes mensajes destacados."
                  : "Tu bandeja de entrada está vacía."}
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`py-4 px-2 hover:bg-muted/50 cursor-pointer transition-colors ${
                    !message.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => handleViewMessage(message)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={(e) => handleToggleStar(message, e)}
                      >
                        {message.starred ? (
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        ) : (
                          <StarOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-medium ${
                              !message.read ? "font-semibold" : ""
                            }`}
                          >
                            {message.name}
                          </h3>
                          {!message.read && (
                            <Badge
                              variant="secondary"
                              className="bg-primary text-primary-foreground"
                            >
                              Nuevo
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {message.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {format(message.date, "d MMM", { locale: es })}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Opciones</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewMessage(message);
                            }}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Ver mensaje
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`;
                            }}
                          >
                            <Reply className="mr-2 h-4 w-4" />
                            Responder
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(message);
                            }}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="mt-1 pl-11">
                    <h4 className="text-sm font-medium">{message.subject}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                      {message.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Diálogo para ver mensaje */}
      {currentMessage && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{currentMessage.subject}</DialogTitle>
              <DialogDescription>
                De: {currentMessage.name} ({currentMessage.email})
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">
                  {format(currentMessage.date, "d 'de' MMMM 'de' yyyy, HH:mm", {
                    locale: es,
                  })}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setMessages(
                      messages.map((m) =>
                        m.id === currentMessage.id
                          ? { ...m, starred: !m.starred }
                          : m
                      )
                    );
                    setCurrentMessage({
                      ...currentMessage,
                      starred: !currentMessage.starred,
                    });
                  }}
                >
                  {currentMessage.starred ? (
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="whitespace-pre-line bg-muted/50 p-4 rounded-lg">
                {currentMessage.message}
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
              >
                Cerrar
              </Button>
              <Button
                variant="default"
                onClick={() =>
                  (window.location.href = `mailto:${currentMessage.email}?subject=Re: ${currentMessage.subject}`)
                }
              >
                <Reply className="mr-2 h-4 w-4" />
                Responder
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setIsViewDialogOpen(false);
                  handleDeleteClick(currentMessage);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Diálogo de confirmación de eliminación */}
      {currentMessage && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar este mensaje de{" "}
                {currentMessage.name}? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDeleteMessage}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
