"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Code2, MessageSquare, Eye } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// Datos de ejemplo para los gráficos
const visitData = [
  { name: "Ene", visits: 400 },
  { name: "Feb", visits: 300 },
  { name: "Mar", visits: 600 },
  { name: "Abr", visits: 800 },
  { name: "May", visits: 700 },
  { name: "Jun", visits: 900 },
  { name: "Jul", visits: 1100 },
];

const interactionData = [
  { name: "Proyectos", vistas: 800, interacciones: 400 },
  { name: "Sobre Mí", vistas: 600, interacciones: 300 },
  { name: "Habilidades", vistas: 900, interacciones: 500 },
  { name: "Contacto", vistas: 400, interacciones: 200 },
];

export default function Dashboard() {
  // Simulación de carga de datos
  useEffect(() => {
    // Aquí podrías cargar datos reales desde una API
  }, []);

  const stats = [
    {
      title: "Proyectos",
      value: "12",
      description: "Proyectos publicados",
      icon: <FolderKanban className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Habilidades",
      value: "36",
      description: "Tecnologías dominadas",
      icon: <Code2 className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      title: "Mensajes",
      value: "28",
      description: "Mensajes recibidos",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "bg-amber-500",
    },
    {
      title: "Visitas",
      value: "4,827",
      description: "Visitas este mes",
      icon: <Eye className="h-5 w-5" />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Panel Principal</h1>
        <p className="text-muted-foreground">
          Bienvenido, ArónDev. Aquí tienes un resumen de tu portafolio.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Visitas Mensuales</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={visitData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="hsl(var(--primary))"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Interacciones por Sección</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={interactionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="vistas" fill="hsl(var(--primary))" />
                <Bar dataKey="interacciones" fill="hsl(var(--primary) / 0.5)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "Nuevo mensaje recibido",
                user: "María García",
                time: "Hace 10 minutos",
              },
              {
                action: "Proyecto actualizado",
                user: "Tú",
                time: "Hace 2 horas",
              },
              {
                action: "Nueva habilidad añadida",
                user: "Tú",
                time: "Hace 1 día",
              },
              { action: "Perfil actualizado", user: "Tú", time: "Hace 3 días" },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted"
              >
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    Por {activity.user}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
