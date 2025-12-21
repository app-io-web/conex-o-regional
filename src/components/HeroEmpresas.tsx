import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Shield, Headphones, ChevronLeft, ChevronRight, Server } from "lucide-react";
import { Link } from "react-router-dom";
import slideWifi from "@/assets/slide-wifi.png";
import slideFibra from "@/assets/slide-fibra.png";
import slideSuporte from "@/assets/slide-suporte.png";

const slides = [
  {
    image: slideWifi,
    badge: "Conectividade empresarial de alta performance",
    title: "Internet dedicada para sua",
    highlight: "Empresa",
    description: "Conexão estável e de alta velocidade para manter sua operação sempre online, sem interrupções.",
  },
  {
    image: slideFibra,
    badge: "Infraestrutura robusta para negócios",
    title: "Fibra óptica com",
    highlight: "SLA garantido",
    description: "Banda larga dedicada com garantia de disponibilidade e tempo de resposta para seu negócio.",
  },
  {
    image: slideSuporte,
    badge: "Suporte técnico prioritário",
    title: "Atendimento especializado",
    highlight: "24 horas",
    description: "Equipe técnica dedicada para empresas. Suporte prioritário e resolução rápida de problemas.",
  },
];

export function HeroEmpresas() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        </div>
      ))}

      {/* Green decorative lines */}
      <div className="absolute top-20 left-0 right-0 h-1 bg-primary z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Content with transitions */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                index === currentSlide 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-4 absolute pointer-events-none"
              }`}
            >
              {index === currentSlide && (
                <>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{slide.badge}</span>
                  </div>

                  {/* Headline */}
                  <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                    {slide.title}{" "}
                    <span className="text-gradient">{slide.highlight}</span>
                  </h1>

                  {/* Subheadline */}
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    {slide.description}
                  </p>
                </>
              )}
            </div>
          ))}

          {/* CTA Buttons - Always visible */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/cadastro">
              <Button variant="hero" size="xl">
                Ver Planos Empresariais
              </Button>
            </Link>
            <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
              <Button variant="hero-outline" size="xl">
                Falar com Consultor
              </Button>
            </a>
          </div>

          {/* Trust Badges - Always visible */}
          <div className="flex flex-wrap gap-8 mt-16 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Server className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">IP Dedicado</p>
                <p className="text-sm">para sua empresa</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">SLA 99.9%</p>
                <p className="text-sm">garantido</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Suporte Prioritário</p>
                <p className="text-sm">24h exclusivo</p>
              </div>
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex gap-3 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-primary w-8"
                    : "bg-foreground/20 w-2 hover:bg-foreground/40"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg z-20"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg z-20"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Green Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary z-10" />
    </section>
  );
}
