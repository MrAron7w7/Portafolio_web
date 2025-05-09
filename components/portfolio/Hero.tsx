"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";

function Hero() {
  return (
    <div
      id="home"
      className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Contenido de texto */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 text-xl font-medium"
          >
            Hola, soy
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white"
          >
            Aron Magallanes
          </motion.h1>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-semibold"
          >
            Desarrollador Full Stack
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl"
          >
            Creando experiencias digitales excepcionales con código limpio y
            diseño centrado en el usuario.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex gap-4 pt-6"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Ver Proyectos
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Descargar CV
            </Button>
          </motion.div>
        </motion.div>

        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative"
        >
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mx-auto">
            <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-400/10 rounded-full -z-10 transform translate-x-4 translate-y-4"></div>
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl">
              <img
                src="https://i.pinimg.com/736x/97/32/93/973293648dbbe7381ca24d5500d82c66.jpg"
                alt="Aron Magallanes"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
