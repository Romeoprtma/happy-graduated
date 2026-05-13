// src/constants/memories.ts

export interface Memory {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  side: "left" | "right";
}

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

/**
 * Section: Constellation Memories
 * Data untuk timeline rasi bintang yang memiliki fitur interaktif (klik untuk buka).
 */
export const MEMORIES: Memory[] = [
  {
    id: 1,
    title: "Awal Galaksi Kita",
    date: "Tahun Pertama",
    description: "Momen di mana kamu mulai melangkah di kampus ini. Aku ingat binar matamu saat itu, penuh mimpi yang kini satu per satu jadi nyata.",
    imageUrl: "/images/1.jpg", 
    side: "left"
  },
  {
    id: 2,
    title: "Sinar di Tengah Malam",
    date: "Tahun Kedua",
    description: "Ratusan jam di depan layar, ditemani kopi dan diskusi kita. Aku bangga melihatmu tetap bersinar meski tugas terasa menjerat.",
    imageUrl: "/images/tahun-kedua.jpg",
    side: "right"
  },
  {
    id: 3,
    title: "Menaklukkan Nebula",
    date: "Masa Skripsi",
    description: "Revisi yang melelahkan dan air mata yang jatuh. Kamu sempat ingin berhenti, tapi lihatlah kamu justru terbang lebih tinggi.",
    imageUrl: "/images/masa-skripsii.jpg",
    side: "left"
  },
  {
    id: 4,
    title: "The Brightest Star",
    date: "13 Mei 2026",
    description: "Hari ini semesta merayakanmu. Kamu bukan lagi sekadar bintang, tapi pusat dari kebanggaanku. Selamat wisuda, Sayang ndut! ❤️",
    imageUrl: "/images/4.jpeg",
    side: "right"
  },
];

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export const GALLERY_IMAGES: GalleryImage[] = []; // Dikosongkan karena pakai API

export const VIDEO_DATA = {
  // Ganti URL ini dengan URL videomu yang asli di Cloudinary!
  src: "https://res.cloudinary.com/dzeih5wmo/video/upload/v12345/graduation-tribute.mp4", 
  poster: "https://res.cloudinary.com/dzeih5wmo/image/upload/v12345/video-thumbnail.jpg",
  title: "A Special Journey"
};