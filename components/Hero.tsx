"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  ArrowDown,
  Heart,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  const scrollToNext = () => {
    const element = document.getElementById("memories");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden font-['Space_Grotesk',_sans-serif] bg-transparent">
      {/* 
         CATATAN: Canvas sudah dihapus dari sini karena akan 
         menggunakan StarfieldCanvas global di page.tsx 
      */}

      {/* Konten Utama */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 text-center px-6 max-w-5xl">
        {/* Kombinasi Ikon Toga & Heart */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="p-4 rounded-full bg-blue-600/10 border border-blue-400/20 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <GraduationCap className="w-8 h-8 text-blue-400" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}>
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500/20" />
          </motion.div>
        </div>

        {/* Judul dengan Sentuhan Warna Hangat */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-pink-100 to-blue-200 mb-6 tracking-tight leading-[1.1]">
          To My Brightest Star
        </h1>

        <p className="text-gray-300/80 text-base md:text-xl max-w-xl mx-auto mb-10 font-light tracking-wide leading-relaxed">
          Di antara milyaran bintang di galaksi, hanya kamu
          yang sinarnya paling menenangkan.Anjayy,{" "}
          <span className="text-pink-400 font-medium">
            Happy Graduation Sayangkuh ndutt
          </span>
          . Scroll kebawah yaw dutkuh.
        </p>

        <div className="flex flex-col items-center gap-12">
          <motion.button
            onClick={scrollToNext}
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0px 0px 30px rgba(244, 114, 182, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-black rounded-full font-bold text-base hover:bg-pink-50 transition-all shadow-xl flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            Buka Dekapan Kenangan
          </motion.button>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-gray-500 flex flex-col items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
            onClick={scrollToNext}>
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium">
              Scroll Down
            </span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>

      {/* Atmospheric Glow (Aura di sudut-sudut layar) */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-pink-900/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[20%] h-[20%] bg-purple-900/10 blur-[80px] rounded-full pointer-events-none" />
    </section>
  );
}
