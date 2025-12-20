import { Button } from "@/components/ui/button";
import { Smartphone, Download, Receipt, Barcode, History, Wifi } from "lucide-react";

const appFeatures = [
  { icon: Receipt, text: "Baixar a segunda via de faturas" },
  { icon: Barcode, text: "Consultar o código de barras do boleto" },
  { icon: History, text: "Visualizar todo o seu histórico financeiro" },
  { icon: Wifi, text: "Verificar o consumo da sua conexão" },
];

export function AppSection() {
  return (
    <section id="app" className="py-24 bg-section-dark text-section-dark-foreground relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-verde-media/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <p className="text-primary font-semibold uppercase tracking-wider mb-4">
              Esqueça burocracias no atendimento
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              Com o app da ConnectFibra você pode:
            </h2>
            
            <ul className="space-y-4 mb-10">
              {appFeatures.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-4 justify-center lg:justify-start"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg text-section-dark-foreground/90">{feature.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Baixe Agora
              </Button>
              <div className="flex gap-3 justify-center">
                <a 
                  href="#" 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 2.406l-5.526 5.527-5.527-5.527L2.406 6.47l5.527 5.527-5.527 5.527 4.064 4.064 5.527-5.527 5.526 5.527 4.064-4.064-5.527-5.527 5.527-5.527z" opacity="0"/>
                    <path d="M3 20.5V3.5c0-.59.34-1.11.84-1.35l10.16 8.85-10.16 8.85c-.5-.24-.84-.76-.84-1.35zM14 12l2.93-2.93c.13-.13.2-.3.2-.48 0-.37-.3-.67-.67-.67-.18 0-.35.07-.48.2L12 12l3.98 3.88c.13.13.3.2.48.2.37 0 .67-.3.67-.67 0-.18-.07-.35-.2-.48L14 12zM14 12l7 5.5v-11L14 12z"/>
                  </svg>
                  <span className="text-sm font-medium">Google Play</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="text-sm font-medium">App Store</span>
                </a>
              </div>
            </div>
          </div>

          {/* Phone Mockups */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Phone */}
              <div className="relative z-20 w-64 h-auto">
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                    <div className="w-full h-full bg-gradient-to-b from-primary/20 to-background flex flex-col items-center justify-center p-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                        <Wifi className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-heading font-bold text-foreground text-center">ConnectFibra</p>
                      <p className="text-muted-foreground text-xs text-center mt-1">Área do Cliente</p>
                      <div className="mt-6 space-y-3 w-full">
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">Faturas</p>
                          <p className="text-sm font-semibold text-foreground">Acesse aqui</p>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">Suporte</p>
                          <p className="text-sm font-semibold text-foreground">24 horas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Phone */}
              <div className="absolute -right-16 top-12 z-10 w-56 h-auto opacity-80">
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-xl">
                  <div className="bg-background rounded-[2rem] overflow-hidden aspect-[9/19]">
                    <div className="w-full h-full bg-gradient-to-b from-verde-media/20 to-background flex flex-col items-center justify-center p-4">
                      <Smartphone className="w-10 h-10 text-primary mb-3" />
                      <p className="font-heading font-bold text-foreground text-sm text-center">WiFi Scanner</p>
                      <div className="mt-4 space-y-2 w-full">
                        <div className="bg-muted rounded-lg p-2 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Roteador</span>
                          <span className="text-xs font-mono text-primary">192.168.0.1</span>
                        </div>
                        <div className="bg-muted rounded-lg p-2 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Dispositivos</span>
                          <span className="text-xs font-semibold text-foreground">8 online</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Third Phone */}
              <div className="absolute -left-12 top-20 z-0 w-48 h-auto opacity-60">
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2rem] p-1.5 shadow-lg">
                  <div className="bg-background rounded-[1.75rem] overflow-hidden aspect-[9/19]">
                    <div className="w-full h-full bg-gradient-to-b from-primary/10 to-background flex flex-col items-center justify-center p-3">
                      <Receipt className="w-8 h-8 text-primary mb-2" />
                      <p className="font-heading font-bold text-foreground text-xs text-center">Faturas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
