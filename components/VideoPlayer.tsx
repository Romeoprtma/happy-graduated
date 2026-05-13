"use client";

// Mendefinisikan tipe data secara eksplisit agar TypeScript tenang
interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export default function VideoPlayer({
  src,
  poster,
}: VideoPlayerProps) {
  const handlePlay = () => {
    // Mengirim sinyal untuk mematikan lagu latar di MusicPlayer.tsx
    window.dispatchEvent(new Event("pauseMusic"));
  };

  return (
    <video
      controls
      className="w-full h-full object-contain"
      onPlay={handlePlay}
      poster={poster}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
