"use client";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Heart } from "lucide-react";

export default function NebulaWishes() {
  const { scrollYProgress } = useScroll();
  const yShift = useTransform(
    scrollYProgress,
    [0.7, 1],
    [0, -50],
  );

  return (
    <section
      id="wishes"
      className="relative py-40 bg-[#05070a] overflow-hidden">
      {/* Background Flowing Nebula */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-purple-600/20 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-nebula" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            style={{ y: yShift }}
            className="inline-block mb-6">
            <Heart className="w-12 h-12 text-pink-500 fill-pink-500/20 animate-bounce" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Space_Grotesk'] tracking-tight">
            Nebula of Future Dreams
          </h2>
          <p className="text-gray-400 text-lg">
            Harapan manis yang aku terbangkan ke langit
            untukmu.
          </p>
        </div>

        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {[
            "Semoga setiap ilmu yang kamu raih menjadi berkah yang tak terbatas.",
            "Aku akan selalu ada di setiap orbit kesuksesanmu, Sayang ndut.",
            "Mari bangun galaksi kita sendiri dengan cinta dan kebahagiaan.",
            "Dunia mungkin luas, tapi tempat ternyamanmu adalah di sini, bersamaku.",
          ].map((wish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="break-inside-avoid p-8 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-2xl hover:border-pink-400/30 transition-all duration-500">
              <p className="text-gray-200 text-lg font-light italic leading-relaxed">
                "{wish}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-8 h-[1px] bg-pink-500" />
                <span className="text-[10px] uppercase tracking-widest text-pink-400 font-bold">
                  Forever Yours
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
