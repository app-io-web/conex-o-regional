import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Plans } from "@/components/Plans";
import { Benefits } from "@/components/Benefits";
import { AppSection } from "@/components/AppSection";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Plans />
        <Benefits />
        <AppSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
