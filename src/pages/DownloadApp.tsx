import { useEffect, useState } from "react";
import { Smartphone, Monitor, Loader2, Wifi, Zap, Shield, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type Platform = "android" | "ios" | "desktop" | "detecting";

const STORE_URLS = {
  android: "https://play.google.com/store/apps/details?id=com.connectfibra.app",
  ios: "https://apps.apple.com/br/app/connectfibra/id123456789",
};

const detectPlatform = (): Platform => {
  const userAgent = navigator.userAgent || navigator.vendor;

  if (/android/i.test(userAgent)) {
    return "android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "ios";
  }

  return "desktop";
};

const DownloadApp = () => {
  const [platform, setPlatform] = useState<Platform>("detecting");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar during detection
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    const timer = setTimeout(() => {
      const detected = detectPlatform();
      setPlatform(detected);

      if (detected === "android" || detected === "ios") {
        setTimeout(() => {
          window.location.href = STORE_URLS[detected];
        }, 2500);
      }
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  const features = [
    { icon: Wifi, text: "Gerencie sua conexão" },
    { icon: Zap, text: "Velocidade máxima" },
    { icon: Shield, text: "Segurança total" },
  ];

  return (
    <div className="min-h-screen bg-section-dark relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Main card */}
        <div className="bg-section-dark/80 backdrop-blur-xl rounded-3xl border border-primary/20 p-8 md:p-10 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                <Wifi className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Brand */}
          <h2 className="text-center text-section-dark-foreground/60 text-sm font-medium tracking-widest uppercase mb-2">
            ConnectFibra
          </h2>

          {platform === "detecting" && (
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full border-2 border-primary/30 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-primary/50 flex items-center justify-center animate-ping" style={{ animationDuration: '1.5s' }}>
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-section-dark-foreground mb-3">
                Detectando dispositivo...
              </h1>
              <p className="text-section-dark-foreground/60 mb-6">
                Identificando a melhor opção para você
              </p>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-section-dark-foreground/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {(platform === "android" || platform === "ios") && (
            <div className="text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-primary/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                </div>
                <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border border-primary/30">
                  <Smartphone className="w-12 h-12 text-primary" />
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary text-sm font-medium">
                  {platform === "android" ? "Android" : "iOS"} detectado
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-section-dark-foreground mb-3">
                Preparando download...
              </h1>
              <p className="text-section-dark-foreground/60 mb-8">
                Você será redirecionado para a {platform === "android" ? "Google Play" : "App Store"} em instantes
              </p>

              {/* Loading animation */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <span className="text-section-dark-foreground/50 text-sm">Redirecionando</span>
              </div>

              <Button
                onClick={() => window.location.href = STORE_URLS[platform]}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Ir para {platform === "android" ? "Google Play" : "App Store"}
              </Button>
            </div>
          )}

          {platform === "desktop" && (
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-section-dark-foreground/10 to-section-dark-foreground/5 rounded-full flex items-center justify-center border border-section-dark-foreground/10">
                  <Monitor className="w-12 h-12 text-section-dark-foreground/60" />
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-section-dark-foreground mb-3">
                App exclusivo para celular
              </h1>
              <p className="text-section-dark-foreground/60 mb-8">
                Escaneie o QR code com seu smartphone para baixar o app ConnectFibra
              </p>
              
              {/* QR Code */}
              <div className="relative inline-block mb-8">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl" />
                <div className="relative bg-section-dark-foreground p-4 rounded-2xl">
                  <div className="w-40 h-40 bg-section-dark rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-7 gap-1 p-2">
                      {Array.from({ length: 49 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded-sm ${
                            [0,1,2,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48].includes(i) ||
                            Math.random() > 0.6 ? "bg-section-dark-foreground" : "bg-section-dark"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-section-dark-foreground/40 text-xs mt-3">
                  Aponte a câmera do seu celular
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-section-dark-foreground/60 text-xs">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Store buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 border-section-dark-foreground/20 text-section-dark-foreground hover:bg-section-dark-foreground/10"
                  onClick={() => window.open(STORE_URLS.android, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Google Play
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12 border-section-dark-foreground/20 text-section-dark-foreground hover:bg-section-dark-foreground/10"
                  onClick={() => window.open(STORE_URLS.ios, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  App Store
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-section-dark-foreground/30 text-xs mt-6">
          ConnectFibra © {new Date().getFullYear()} • Internet de alta velocidade
        </p>
      </div>
    </div>
  );
};

export default DownloadApp;
