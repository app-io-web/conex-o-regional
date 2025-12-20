import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HeroSlider } from "@/components/HeroSlider";
import { Plans } from "@/components/Plans";
import { Benefits } from "@/components/Benefits";
import { AppSection } from "@/components/AppSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HeroSlider />
        <Plans />
        <Benefits />
        <AppSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
