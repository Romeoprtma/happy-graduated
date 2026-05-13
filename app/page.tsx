import StarfieldCanvas from "@/components/StarfieldCanvas";
import Hero from "@/components/Hero";
import Constellation from "@/components/Constellation";
import NebulaWishes from "@/components/NebulaWishes";
import CosmicGallery from "@/components/CosmicGallery";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <MusicPlayer />
      <StarfieldCanvas />
      <div className="relative z-10">
        <Hero />
        <Constellation />
        <NebulaWishes />
        <CosmicGallery />
      </div>
    </main>
  );
}
