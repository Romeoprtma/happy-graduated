import GalleryClient from "./GalleryClient";
import VideoPlayer from "./VideoPlayer";

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
          max_results: 67,
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

// 2. Fungsi Fetch Video
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
          max_results: 1,
          sort_by: [{ created_at: "desc" }],
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) return null;
    const data = await response.json();
    return data.resources[0] || null;
  } catch (error) {
    console.error("🚨 ERROR FETCH VIDEO:", error);
    return null;
  }
}

// 3. Komponen Utama
export default async function CosmicGallery() {
  const [rawImages, rawVideo] = await Promise.all([
    getCloudinaryImages(),
    getCloudinaryVideo(),
  ]);

  // Perbaikan TypeScript: Memberikan struktur data yang jelas untuk 'res'
  const formattedImages = rawImages.map(
    (res: {
      public_id: string;
      secure_url: string;
      width: number;
      height: number;
    }) => ({
      public_id: res.public_id,
      src: res.secure_url.replace(
        "/upload/",
        "/upload/q_auto,f_auto/",
      ),
      width: res.width,
      height: res.height,
    }),
  );

  // Perbaikan TypeScript: Deklarasi tipe eksplisit untuk videoData
  let videoData: { src: string; poster: string } | null =
    null;
  if (rawVideo) {
    videoData = {
      src: rawVideo.secure_url,
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

        {videoData && (
          <div className="mb-24 relative group">
            <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(244,114,182,0.15)] bg-black">
              <VideoPlayer
                src={videoData.src}
                poster={videoData.poster}
              />
            </div>
          </div>
        )}

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
