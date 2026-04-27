import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-black jamzia-bg-grain">
      <Navbar />
      <main className="pt-16 relative z-10">
        <HeroSection />
      </main>
    </div>
  );
}
