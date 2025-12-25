import { Check, Smartphone } from "lucide-react";

const appFeatures = [
  "Segunda via de conta",
  "Mudar senha do Wi-Fi",
  "Suporte técnico",
  "Religar serviço",
  "Alterar endereço",
  "Assinar serviços",
  "Mudar plano",
];

export function AppSection() {
  return (
    <section id="app" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Logo Badge */}
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
              <span className="text-primary-foreground font-heading font-bold text-xl">CF</span>
            </div>

            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Resolva tudo no app ConnectFibra
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 mb-10">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - QR Code + Phone + Store Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12">
            {/* QR Code */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-foreground p-2 rounded-lg">
                <div className="w-full h-full bg-background rounded grid grid-cols-5 grid-rows-5 gap-0.5 p-1">
                  {/* QR Code Pattern */}
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24].includes(i)
                          ? "bg-foreground"
                          : "bg-background"
                      } rounded-sm`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm mt-3">Baixe o app ConnectFibra</p>
            </div>

            {/* Phone Mockup */}
            <div className="relative">
              <div className="w-48 md:w-56 bg-muted rounded-[2rem] p-2">
                <div className="bg-primary rounded-[1.75rem] overflow-hidden aspect-[9/19] relative">
                  {/* Phone Screen Content */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xs">CF</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-primary-foreground/20" />
                      </div>
                    </div>
                    <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-3 mb-3">
                      <p className="text-primary-foreground/80 text-[10px]">Conecte sua</p>
                      <p className="text-primary-foreground font-bold text-sm">Experiência digital</p>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-lg bg-primary-foreground/20" />
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-3">
                      <p className="text-primary-foreground/80 text-[10px]">Ofertas disponíveis</p>
                      <p className="text-primary-foreground font-bold text-xs">Confira agora</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground">Disponível na</p>
                  <p className="text-sm font-semibold text-foreground">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5V3.5c0-.59.34-1.11.84-1.35l10.16 8.85-10.16 8.85c-.5-.24-.84-.76-.84-1.35zM14 12l2.93-2.93c.13-.13.2-.3.2-.48 0-.37-.3-.67-.67-.67-.18 0-.35.07-.48.2L12 12l3.98 3.88c.13.13.3.2.48.2.37 0 .67-.3.67-.67 0-.18-.07-.35-.2-.48L14 12zM14 12l7 5.5v-11L14 12z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground">Disponível no</p>
                  <p className="text-sm font-semibold text-foreground">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
