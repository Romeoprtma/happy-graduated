// src/components/CosmicGallery.tsx
import { VIDEO_DATA } from "@/constants/memories";
import GalleryClient from "./GalleryClient";

async function getCloudinaryImages() {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // Cek apakah .env.local terbaca
  if (!cloudName || !apiKey || !apiSecret) {
    console.error(
      "🚨 Kunci API kosong! Pastikan file .env.local sudah benar dan server di-restart.",
    );
    return []; // Return array kosong agar web tidak crash
  }

  const auth = Buffer.from(
    `${apiKey}:${apiSecret}`,
  ).toString("base64");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expression: "resource_type:image",
          max_results: 67,
        }),
        cache: "no-store", // Matikan cache sementara untuk testing
      },
    );

    if (!response.ok) {
      // INI YANG PALING PENTING: Menangkap pesan error asli dari Cloudinary
      const errorData = await response.json();
      console.error(
        "🚨 ALASAN ERROR CLOUDINARY:",
        errorData,
      );
      return []; // Return array kosong agar web tidak crash
    }

    const data = await response.json();
    return data.resources;
  } catch (error) {
    console.error("🚨 ERROR SISTEM:", error);
    return [];
  }
}

export default async function CosmicGallery() {
  const rawImages = await getCloudinaryImages();

  // Bersihkan data API sebelum dikirim ke Client Component
  const formattedImages = rawImages.map((res: any) => ({
    public_id: res.public_id,
    src: res.secure_url.replace(
      "/upload/",
      "/upload/q_auto,f_auto/",
    ),
    width: res.width,
    height: res.height,
  }));

  return (
    <section
      id="gallery"
      className="relative py-32 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 font-['Space_Grotesk']">
          Cosmic Gallery
        </h2>

        {/* Bagian Video Kenangan */}
        <div className="mb-24 relative group">
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(244,114,182,0.15)]">
            <video
              controls
              className="w-full h-full object-cover"
              poster={VIDEO_DATA.poster}>
              <source
                src={VIDEO_DATA.src}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Bagian Grid Foto Interaktif */}
        <GalleryClient images={formattedImages} />
      </div>
    </section>
  );
}
