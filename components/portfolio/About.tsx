"use client";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaHtml5,
  FaCss3,
  FaJs,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiDart,
  SiFlutter,
  SiNextdotjs,
  SiShadcnui,
  SiGit,
} from "react-icons/si";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function About() {
  const technologies = [
    { icon: FaHtml5, name: "Html" },
    { icon: FaCss3, name: "Css" },
    { icon: FaJs, name: "Js" },
    { icon: FaReact, name: "React" },
    { icon: FaNodeJs, name: "Node.js" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: SiNextdotjs, name: "Nextjs" },
    { icon: SiShadcnui, name: "Shadcn" },
    { icon: SiDart, name: "Dart" },
    { icon: SiFlutter, name: "Flutter" },
    { icon: FaDatabase, name: "SQL" },
    { icon: SiTailwindcss, name: "Tailwind CSS" },
    { icon: SiGit, name: "Git" },
  ];

  const interests = [
    "Desarrollo Web Full Stack",
    "Arquitectura de Software",
    "Nuevas Tecnologías",
    "Desarrollo Ágil",
  ];

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Sobre Mí
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-12 mb-20"
        >
          <div className="flex-1 space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white"
            >
              Desarrollador Full Stack con pasión por crear soluciones digitales
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 text-lg"
            >
              Me especializo en crear experiencias digitales excepcionales que
              combinan diseño intuitivo con funcionalidad robusta. Mi enfoque se
              centra en desarrollar soluciones escalables y mantenibles que
              resuelvan problemas reales y mejoren la vida de los usuarios.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]"
          >
            <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-400/10 rounded-lg transform rotate-6"></div>
            <div className="relative w-full h-full rounded-lg overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
              <img
                src="https://i.pinimg.com/736x/97/32/93/973293648dbbe7381ca24d5500d82c66.jpg"
                alt="Foto de perfil"
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Tecnologías Favoritas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-6">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <tech.icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Intereses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {interest}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
