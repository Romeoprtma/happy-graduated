// src/components/CosmicGallery.tsx
import GalleryClient from "./GalleryClient";

// 1. Fungsi Fetch Gambar
async function getCloudinaryImages() {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error("🚨 Kunci API kosong!");
    return [];
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
          max_results: 67, // Mengambil hingga 67 gambar
          sort_by: [{ created_at: "desc" }],
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) return [];
    const data = await response.json();
    return data.resources;
  } catch (error) {
    console.error("🚨 ERROR FETCH IMAGES:", error);
    return [];
  }
}

// 2. Fungsi Fetch Video Baru
async function getCloudinaryVideo() {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) return null;

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
          expression: "resource_type:video",
          max_results: 1, // Kita hanya ambil 1 video terbaru untuk highlight
          sort_by: [{ created_at: "desc" }],
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) return null;
    const data = await response.json();
    return data.resources[0] || null; // Kembalikan objek video pertama (terbaru)
  } catch (error) {
    console.error("🚨 ERROR FETCH VIDEO:", error);
    return null;
  }
}

// 3. Komponen Utama
export default async function CosmicGallery() {
  // Menjalankan fetch gambar dan video secara bersamaan (paralel) agar lebih cepat
  const [rawImages, rawVideo] = await Promise.all([
    getCloudinaryImages(),
    getCloudinaryVideo(),
  ]);

  // Format Data Gambar
  const formattedImages = rawImages.map((res: any) => ({
    public_id: res.public_id,
    src: res.secure_url.replace(
      "/upload/",
      "/upload/q_auto,f_auto/",
    ),
    width: res.width,
    height: res.height,
  }));

  // Format Data Video (Jika Ada)
  let videoData = null;
  if (rawVideo) {
    videoData = {
      src: rawVideo.secure_url,
      // Cloudinary otomatis membuat thumbnail frame pertama dengan mengubah ekstensi ke .jpg
      poster: rawVideo.secure_url.replace(
        /\.[^/.]+$/,
        ".jpg",
      ),
    };
  }

  return (
    <section
      id="gallery"
      className="relative py-32 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 font-['Space_Grotesk']">
          Cosmic Gallery
        </h2>

        {/* Render Bagian Video Kenangan HANYA jika video ditemukan di Cloudinary */}
        {videoData && (
          <div className="mb-24 relative group">
            <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(244,114,182,0.15)] bg-black">
              <video
                controls
                className="w-full h-full object-contain"
                poster={videoData.poster}>
                <source
                  src={videoData.src}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        {/* Bagian Grid Foto Interaktif */}
        {formattedImages.length > 0 ? (
          <GalleryClient images={formattedImages} />
        ) : (
          <p className="text-white text-center opacity-70">
            Belum ada foto yang ditemukan.
          </p>
        )}
      </div>
    </section>
  );
}
