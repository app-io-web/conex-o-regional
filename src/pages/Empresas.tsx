import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Wifi, 
  Headphones, 
  Shield, 
  Building2, 
  Check, 
  Zap, 
  Clock, 
  Lock, 
  Wrench,
  Server
} from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: Wifi,
    title: "Conexão Estável",
    description: "Rede dedicada para sua empresa operar sem interrupções.",
  },
  {
    icon: Headphones,
    title: "Suporte Empresarial",
    description: "Atendimento técnico prioritário e especializado.",
  },
  {
    icon: Shield,
    title: "Segurança Avançada",
    description: "Firewall, proteção contra ataques e backups automáticos.",
  },
  {
    icon: Building2,
    title: "Foco em sua Empresa",
    description: "Temos a Solução Ideal para sua Empresa.",
  },
];

const features = [
  { icon: Wifi, label: "Conexão Estável" },
  { icon: Headphones, label: "Suporte Prioritário" },
  { icon: Server, label: "Planos Flexíveis" },
  { icon: Clock, label: "Alta Disponibilidade" },
  { icon: Lock, label: "Proteção Avançada" },
  { icon: Wrench, label: "Instalação Ágil" },
];

const plans = [
  {
    name: "Startup Company",
    price: "199,90",
    features: [
      "100% Fibra Óptica",
      "Modem Wi-Fi 5G Premium",
      "SLA: 48 horas",
      "Suporte técnico",
    ],
    popular: false,
  },
  {
    name: "Medium Company",
    price: "299,90",
    features: [
      "100% Fibra Óptica",
      "Modem Wi-Fi 5G Premium",
      "IP: Fixo",
      "SLA: 24 horas",
      "Suporte Especializado",
    ],
    popular: true,
  },
  {
    name: "Big Company",
    price: "399,90",
    features: [
      "100% Fibra Óptica",
      "Modem Wi-Fi 5G Premium",
      "IP: Público",
      "SLA: 8 horas",
      "Suporte Especializado",
    ],
    popular: false,
  },
];

const Empresas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-verde-media/5" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
                SOLUÇÕES EMPRESARIAIS
              </span>
              
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Mais Performance e Segurança para sua{" "}
                <span className="text-primary">Empresa</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                A ConnectFibra Empresarial garante conectividade robusta e suporte técnico 
                dedicado para manter sua operação sempre online.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-card/50 border border-border/50 rounded-xl px-4 py-3"
                    >
                      <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground font-medium">
                        {feature.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                Temos o plano Ideal para Você{" "}
                <span className="text-primary">Assine Agora</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-card border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl ${
                    plan.popular
                      ? "border-primary shadow-lg shadow-primary/10 scale-105"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                        MAIS POPULAR
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-muted-foreground text-lg">R$</span>
                      <span className="text-4xl font-bold text-primary">
                        {plan.price.split(",")[0]}
                      </span>
                      <span className="text-muted-foreground">
                        ,{plan.price.split(",")[1]}
                      </span>
                      <span className="text-muted-foreground text-sm">/ mês</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/cadastro">
                    <Button
                      variant={plan.popular ? "hero" : "outline"}
                      className="w-full"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Assinar Agora
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary/10 to-verde-media/10 rounded-3xl p-8 md:p-12 border border-primary/20">
              <Building2 className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Precisa de uma solução personalizada?
              </h2>
              <p className="text-muted-foreground mb-8">
                Entre em contato com nossa equipe comercial e receba uma proposta 
                sob medida para as necessidades da sua empresa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cadastro">
                  <Button variant="hero" size="lg">
                    Falar com Consultor
                  </Button>
                </Link>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    WhatsApp Empresarial
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Empresas;
