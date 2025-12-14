import { Gauge, Shield, Clock, Wrench, MapPin, CreditCard } from "lucide-react";

const benefits = [
  {
    icon: Gauge,
    title: "Velocidade Real",
    description: "Entregamos a velocidade contratada. Sem surpresas, sem asteriscos.",
  },
  {
    icon: Shield,
    title: "Conexão Estável",
    description: "Infraestrutura moderna com 99.9% de uptime garantido.",
  },
  {
    icon: Clock,
    title: "Suporte 24 horas",
    description: "Equipe técnica disponível a qualquer hora para te ajudar.",
  },
  {
    icon: Wrench,
    title: "Instalação Rápida",
    description: "Agendamento flexível e instalação em até 48 horas.",
  },
  {
    icon: MapPin,
    title: "Atendimento Local",
    description: "Conhecemos sua região e oferecemos um atendimento personalizado.",
  },
  {
    icon: CreditCard,
    title: "Sem Fidelidade",
    description: "Liberdade para cancelar quando quiser, sem multas.",
  },
];

export function Benefits() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 hero-glow opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Por que escolher a <span className="text-gradient">ConnectFibra</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Mais do que internet, oferecemos uma experiência completa de conectividade.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group p-6 rounded-2xl card-gradient border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
