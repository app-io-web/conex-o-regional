import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Plans } from "@/components/Plans";
import { Benefits } from "@/components/Benefits";
import { AppSection } from "@/components/AppSection";
import RegistrationForm from "@/components/RegistrationForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Plans />
        <Benefits />
        <AppSection />
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
