"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/tuusuario",
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/tuusuario",
      icon: FaLinkedin,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/tuusuario",
      icon: FaTwitter,
    },
    {
      name: "Email",
      url: "mailto:tu@email.com",
      icon: FaEnvelope,
    },
  ];

  const footerLinks = [
    { name: "Inicio", href: "#home" },
    { name: "Sobre Mí", href: "#about" },
    { name: "Proyectos", href: "#projects" },
    { name: "Contacto", href: "#contactme" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link
              href="/"
              className="text-2xl font-bold text-gray-800 dark:text-white"
            >
              AronDev_
            </Link>
            <p className="text-gray-600 dark:text-gray-300">
              Desarrollador Full Stack especializado en crear experiencias
              digitales excepcionales.
            </p>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Button
                    variant="link"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-0 h-auto"
                    asChild
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Redes Sociales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Sígueme
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Contacto
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              ¿Tienes un proyecto en mente?
              <br />
              ¡Hablemos sobre ello!
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              asChild
            >
              <Link href="#contactme">Contáctame</Link>
            </Button>
          </motion.div>
        </div>

        <Separator className="my-8 bg-gray-200 dark:bg-gray-700" />

        {/* Copyright */}
        <div className="text-center text-gray-600 dark:text-gray-300">
          <p>© {currentYear} AronDev_. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
