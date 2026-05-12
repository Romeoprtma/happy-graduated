"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MEMORIES } from "@/constants/memories";
import { Star, Lock } from "lucide-react";

export default function Constellation() {
  const [openedMemories, setOpenedMemories] = useState<
    number[]
  >([]);

  const toggleMemory = (id: number) => {
    if (!openedMemories.includes(id)) {
      setOpenedMemories((prev) => [...prev, id]);
    }
  };

  return (
    <section
      id="memories"
      className="relative min-h-screen bg-transparent py-20 md:py-32 px-4 md:px-6 overflow-hidden">
      {/* Nebula Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[60%] h-[40%] bg-blue-900/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[60%] h-[40%] bg-pink-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-28">
          <h2 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-pink-200 mb-4 md:mb-6 font-['Space_Grotesk'] tracking-tight">
            Galaksi Kenangan Kita
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-base md:text-lg font-light">
            Beberapa koordinat cinta masih tersembunyi. Klik
            untuk membuka memori yang abadi.
          </p>
        </motion.div>

        <div className="relative">
          {/* Garis Tengah (Desktop) / Garis Samping (Mobile) */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="absolute left-[20px] md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500/40 via-pink-500/40 to-transparent"
          />

          {MEMORIES.map((item) => {
            const isOpened = openedMemories.includes(
              item.id,
            );

            return (
              <div
                key={item.id}
                className={`relative flex flex-row md:items-center justify-between mb-16 md:mb-32 w-full ${
                  item.side === "left"
                    ? "md:flex-row-reverse"
                    : "md:flex-row"
                }`}>
                {/* Kontainer Kartu */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: item.side === "left" ? 40 : -40,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  onClick={() => toggleMemory(item.id)}
                  className="w-[calc(100%-50px)] ml-auto md:ml-0 md:w-[46%] group cursor-pointer">
                  <div
                    className={`relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md p-2 md:p-3 transition-all duration-700 ${isOpened ? "border-pink-500/30 shadow-[0_0_30px_rgba(244,114,182,0.1)]" : "hover:bg-white/10"}`}>
                    <div className="relative h-48 md:h-80 w-full overflow-hidden rounded-[1.2rem] md:rounded-[2rem]">
                      <motion.div
                        animate={{
                          filter: isOpened
                            ? "blur(0px)"
                            : "blur(15px) grayscale(1)",
                        }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className={`object-cover transition-transform duration-700 ${isOpened ? "group-hover:scale-110" : ""}`}
                          sizes="(max-w-768px) 100vw, 50vw"
                        />
                      </motion.div>

                      <AnimatePresence>
                        {!isOpened && (
                          <motion.div
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-4 text-center">
                            <Lock className="w-8 h-8 mb-2 opacity-80" />
                            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium opacity-60">
                              Buka Memori
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.div
                      animate={{
                        opacity: isOpened ? 1 : 0.4,
                        filter: isOpened
                          ? "blur(0px)"
                          : "blur(2px)",
                      }}
                      className="p-4 md:p-8">
                      <span className="text-blue-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-1 md:mb-3 block">
                        {item.date}
                      </span>
                      <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-3">
                        {isOpened ? item.title : "Terkunci"}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light">
                        {isOpened
                          ? item.description
                          : "Klik untuk melihat..."}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Titik Koneksi (Bintang) */}
                <div className="absolute left-0 md:relative md:left-auto flex items-start md:items-center justify-center w-[40px] md:w-12 h-full">
                  <div
                    className={`mt-6 md:mt-0 w-8 h-8 md:w-12 md:h-12 rounded-full transition-all duration-1000 ${isOpened ? "bg-pink-500/20 border-pink-500/50" : "bg-white/5 border-white/20"} border backdrop-blur-sm flex items-center justify-center z-10`}>
                    <motion.div
                      animate={{
                        scale: isOpened ? [1, 1.2, 1] : 1,
                        rotate: isOpened ? 360 : 0,
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}>
                      <Star
                        className={`w-3 h-3 md:w-5 md:h-5 transition-colors duration-1000 ${isOpened ? "text-pink-400 fill-pink-400" : "text-yellow-200/50"}`}
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="hidden md:block w-[46%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
