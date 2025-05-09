"use client";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaDocker,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiNextdotjs,
} from "react-icons/si";

function Skills() {
  const frontendSkills = [
    { icon: FaReact, name: "React", level: 90 },
    { icon: SiNextdotjs, name: "Next.js", level: 85 },
    { icon: SiJavascript, name: "JavaScript", level: 90 },
    { icon: SiTypescript, name: "TypeScript", level: 85 },
    { icon: FaHtml5, name: "HTML5", level: 95 },
    { icon: FaCss3Alt, name: "CSS3", level: 90 },
    { icon: SiTailwindcss, name: "Tailwind CSS", level: 88 },
  ];

  const backendSkills = [
    { icon: FaNodeJs, name: "Node.js", level: 85 },
    { icon: SiMongodb, name: "MongoDB", level: 80 },
    { icon: SiPostgresql, name: "PostgreSQL", level: 82 },
    { icon: FaDocker, name: "Docker", level: 75 },
    { icon: FaGitAlt, name: "Git", level: 88 },
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Habilidades Técnicas
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Frontend Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Frontend Development
            </h3>
            <div className="space-y-6">
              {frontendSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <skill.icon className="w-6 h-6 text-blue-600" />
                    <span className="text-gray-700 font-medium">
                      {skill.name}
                    </span>
                    <span className="ml-auto text-gray-500">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-blue-600 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Backend Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Backend Development
            </h3>
            <div className="space-y-6">
              {backendSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <skill.icon className="w-6 h-6 text-blue-600" />
                    <span className="text-gray-700 font-medium">
                      {skill.name}
                    </span>
                    <span className="ml-auto text-gray-500">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-blue-600 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
