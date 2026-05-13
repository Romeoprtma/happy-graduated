"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Pause } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mengatur volume lagu agar tidak terlalu keras (opsional)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume di 50%
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99]">
      <audio
        ref={audioRef}
        loop
        src="/music/memories.mp3"
      />

      <motion.button
        onClick={togglePlay}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]">
        {isPlaying ? (
          <Pause size={24} className="text-pink-300" />
        ) : (
          <div className="relative">
            <Music size={24} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
