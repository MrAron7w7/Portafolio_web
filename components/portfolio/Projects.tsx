"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardTitle } from "../ui/card";

function Projects() {
  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "Plataforma de comercio electrónico con carrito de compras, pagos en línea y panel de administración.",
      image: "/projects/ecommerce.jpg",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Stripe",
        "MongoDB",
      ],
      github: "https://github.com/yourusername/ecommerce",
      demo: "https://ecommerce-demo.com",
    },
    {
      title: "Task Management App",
      description:
        "Aplicación de gestión de tareas con características de colaboración en tiempo real y notificaciones.",
      image: "/projects/taskapp.jpg",
      technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
      github: "https://github.com/yourusername/taskapp",
      demo: "https://taskapp-demo.com",
    },
    {
      title: "Portfolio Website",
      description:
        "Sitio web personal con diseño moderno y responsivo, mostrando proyectos y habilidades.",
      image: "/projects/portfolio.jpg",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/yourusername/portfolio",
      demo: "https://portfolio-demo.com",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Una selección de mis proyectos más recientes y relevantes que
            demuestran mis habilidades y experiencia.
          </p>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <CardContent className="p-6">
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {project.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="secondary"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub className="w-5 h-5" />
                        <span>Código</span>
                      </a>
                    </Button>
                    <Button className="flex items-center gap-2" asChild>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        <span>Demo</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
