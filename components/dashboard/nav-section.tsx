"use client";
import { Button } from "@/components/ui/button";
import {
  FolderKanban,
  Code2,
  MessageSquare,
  LayoutDashboard,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavSection() {
  const pathName = usePathname();
  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: "Panel Principal",
      href: "/dashboard",
    },
    {
      icon: FolderKanban,
      label: "Proyectos",
      href: "/dashboard/projects",
    },
    {
      icon: Code2,
      label: "Habilidades",
      href: "/dashboard/skills",
    },
    {
      icon: User,
      label: "Sobre Mí",
      href: "/dashboard/about",
    },
    {
      icon: MessageSquare,
      label: "Mensajes",
      href: "/dashboard/messages",
    },
    // {
    //   icon: Settings,
    //   label: "Configuración",
    //   href: "/dashboard/settings",
    // },
  ];

  console.log(pathName);
  return (
    <nav className="flex flex-col gap-2 p-4">
      {sidebarItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathName === item.href ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
