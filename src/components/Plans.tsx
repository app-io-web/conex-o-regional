import { Button } from "@/components/ui/button";
import { Check, Wifi, Zap, Star } from "lucide-react";

const plans = [
  {
    name: "Essencial",
    speed: "200",
    price: "89",
    popular: false,
    features: [
      "Download até 200 Mbps",
      "Upload até 100 Mbps",
      "Wi-Fi 5 incluso",
      "Suporte técnico",
      "Instalação grátis",
    ],
    services: [
      { name: "Estudart", color: "bg-emerald-500" },
      { name: "Ubook Plus", color: "bg-slate-400" },
      { name: "Playkids", color: "bg-green-400" },
    ],
    servicesNote: "Obs.: Cliente tem acesso exclusivo a apenas 1 dos serviços",
  },
  {
    name: "Avançado",
    speed: "400",
    price: "119",
    popular: true,
    features: [
      "Download até 400 Mbps",
      "Upload até 200 Mbps",
      "Wi-Fi 6 incluso",
      "Suporte prioritário",
      "Instalação grátis",
      "IP fixo opcional",
    ],
    services: [
      { name: "Max", color: "bg-blue-900" },
      { name: "Sky", color: "bg-red-500" },
      { name: "Estudart", color: "bg-emerald-500" },
      { name: "Kaspersky", color: "bg-green-500" },
      { name: "O Jornalista", color: "bg-gray-800" },
      { name: "Docway", color: "bg-teal-400" },
      { name: "Queima", color: "bg-orange-500" },
    ],
    servicesNote: null,
  },
  {
    name: "Ultra",
    speed: "600",
    price: "159",
    popular: false,
    features: [
      "Download até 600 Mbps",
      "Upload até 300 Mbps",
      "Wi-Fi 6 incluso",
      "Suporte VIP 24h",
      "Instalação expressa",
      "IP fixo incluso",
      "Garantia de velocidade",
    ],
    services: [
      { name: "Noping", color: "bg-cyan-400" },
      { name: "Estudart", color: "bg-emerald-500" },
      { name: "Kaspersky", color: "bg-green-500" },
      { name: "Deezer", color: "bg-purple-600" },
      { name: "O Jornalista", color: "bg-gray-800" },
      { name: "Queima", color: "bg-orange-500" },
      { name: "Playkids", color: "bg-green-400" },
    ],
    servicesNote: null,
  },
];

export function Plans() {
  return (
    <section id="planos" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Wifi className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Nossos Planos</span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Escolha a velocidade ideal
          </h2>
          <p className="text-muted-foreground text-lg">
            Planos para todos os perfis. Sem fidelidade e com instalação gratuita.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "bg-gradient-to-b from-primary/10 to-card border-2 border-primary shadow-lg"
                  : "bg-card border border-border hover:border-primary/50 shadow-md"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    <Star className="w-4 h-4" />
                    Mais Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="text-5xl md:text-6xl font-heading font-bold text-gradient">{plan.speed}</span>
                  <span className="text-lg text-muted-foreground mb-2">Mega</span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Included Services */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-foreground mb-3 text-center">Serviços Inclusos</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {plan.services.map((service) => (
                    <div
                      key={service.name}
                      className={`${service.color} text-white text-xs font-medium px-3 py-1.5 rounded-lg`}
                    >
                      {service.name}
                    </div>
                  ))}
                </div>
                {plan.servicesNote && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">{plan.servicesNote}</p>
                )}
              </div>

              {/* CTA */}
              <Button
                variant={plan.popular ? "hero" : "hero-outline"}
                size="lg"
                className="w-full"
              >
                {plan.popular ? "Assinar Agora" : "Escolher Plano"}
              </Button>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div id="empresas" className="mt-16 text-center p-8 rounded-2xl bg-card border border-border shadow-md max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-primary" />
            <h3 className="font-heading text-xl font-bold text-foreground">Planos Empresariais</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Soluções personalizadas para sua empresa com link dedicado, SLA garantido e suporte exclusivo.
          </p>
          <Button variant="hero-outline" size="lg">
            Falar com Consultor
          </Button>
        </div>
      </div>
    </section>
  );
}
