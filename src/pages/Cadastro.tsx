import { Header } from "@/components/Header";
import RegistrationForm from "@/components/RegistrationForm";
import { Footer } from "@/components/Footer";

const Cadastro = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Cadastro;
