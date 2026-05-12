"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface GalleryClientProps {
  images: {
    public_id: string;
    src: string;
    width: number;
    height: number;
  }[];
}

export default function GalleryClient({
  images,
}: GalleryClientProps) {
  const [index, setIndex] = useState(-1);

  // Format array agar sesuai dengan kebutuhan Lightbox
  const slides = images.map((img) => ({
    src: img.src,
    width: img.width,
    height: img.height,
  }));

  return (
    <>
      <div className="columns-2 md:columns-4 gap-4 space-y-4">
        {images.map((img, i) => (
          <div
            key={img.public_id}
            onClick={() => setIndex(i)}
            className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 group bg-white/5 backdrop-blur-sm">
            <Image
              src={img.src}
              alt={img.public_id}
              width={img.width}
              height={img.height}
              unoptimized // 👈 PERBAIKAN: Mematikan optimasi bawaan Next.js
              className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
          </div>
        ))}
      </div>

      {/* Komponen Lightbox untuk melihat foto full screen */}
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </>
  );
}
