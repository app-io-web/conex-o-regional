import { useEffect, useState } from "react";
import { Smartphone, Monitor, Loader2, Wifi, Zap, Shield, Download, ExternalLink, CheckCircle2 } from "lucide-react";
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
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Subtle background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Main card */}
        <div className="bg-card rounded-3xl border border-border p-8 md:p-10 shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-md">
              <Wifi className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          {/* Brand */}
          <h2 className="text-center text-muted-foreground text-sm font-medium tracking-widest uppercase mb-4">
            ConnectFibra
          </h2>

          {platform === "detecting" && (
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-full border-2 border-primary/20 flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Detectando dispositivo...
              </h1>
              <p className="text-muted-foreground mb-6">
                Identificando a melhor opção para você
              </p>

              {/* Progress bar */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {(platform === "android" || platform === "ios") && (
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
                  <Smartphone className="w-10 h-10 text-primary" />
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">
                  {platform === "android" ? "Android" : "iOS"} detectado
                </span>
              </div>

              <h1 className="text-2xl font-bold text-foreground mb-2">
                Preparando download...
              </h1>
              <p className="text-muted-foreground mb-6">
                Redirecionando para a {platform === "android" ? "Google Play" : "App Store"}
              </p>

              {/* Loading dots */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>

              <Button
                onClick={() => window.location.href = STORE_URLS[platform]}
                className="w-full"
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
                <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Monitor className="w-10 h-10 text-muted-foreground" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-2">
                App exclusivo para celular
              </h1>
              <p className="text-muted-foreground mb-6">
                Escaneie o QR code com seu smartphone para baixar
              </p>
              
              {/* QR Code */}
              <div className="inline-block mb-6">
                <div className="bg-foreground p-3 rounded-xl">
                  <div className="w-32 h-32 bg-background rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-7 gap-0.5 p-1">
                      {Array.from({ length: 49 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-3.5 h-3.5 rounded-sm ${
                            [0,1,2,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48].includes(i) ||
                            Math.random() > 0.6 ? "bg-foreground" : "bg-background"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-2">
                  Aponte a câmera do seu celular
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-10 h-10 mx-auto mb-1 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground text-xs">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Store buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open(STORE_URLS.android, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Google Play
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
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
        <p className="text-center text-muted-foreground text-xs mt-6">
          ConnectFibra © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default DownloadApp;
