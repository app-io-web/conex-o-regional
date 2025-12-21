import { Header } from "@/components/Header";
import WorkWithUsForm from "@/components/WorkWithUsForm";
import { Footer } from "@/components/Footer";

const TrabalheConosco = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <WorkWithUsForm />
      </main>
      <Footer />
    </div>
  );
};

export default TrabalheConosco;
