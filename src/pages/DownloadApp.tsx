import { useEffect, useState } from "react";
import { Smartphone, Monitor, Loader2 } from "lucide-react";
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

  useEffect(() => {
    const detected = detectPlatform();
    setPlatform(detected);

    if (detected === "android" || detected === "ios") {
      const timer = setTimeout(() => {
        window.location.href = STORE_URLS[detected];
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center border border-border">
        {/* Logo */}
        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-primary-foreground font-bold text-2xl">CF</span>
        </div>

        {platform === "detecting" && (
          <>
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Detectando seu dispositivo...
            </h1>
            <p className="text-muted-foreground">
              Aguarde enquanto identificamos o melhor lugar para baixar o app.
            </p>
          </>
        )}

        {platform === "android" && (
          <>
            <Smartphone className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Dispositivo Android detectado!
            </h1>
            <p className="text-muted-foreground mb-6">
              Você será redirecionado para a Google Play Store em instantes...
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <span className="text-sm text-muted-foreground">Redirecionando...</span>
            </div>
            <Button
              onClick={() => window.location.href = STORE_URLS.android}
              className="w-full"
              size="lg"
            >
              Ir para Google Play
            </Button>
          </>
        )}

        {platform === "ios" && (
          <>
            <Smartphone className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Dispositivo iOS detectado!
            </h1>
            <p className="text-muted-foreground mb-6">
              Você será redirecionado para a App Store em instantes...
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <span className="text-sm text-muted-foreground">Redirecionando...</span>
            </div>
            <Button
              onClick={() => window.location.href = STORE_URLS.ios}
              className="w-full"
              size="lg"
            >
              Ir para App Store
            </Button>
          </>
        )}

        {platform === "desktop" && (
          <>
            <Monitor className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Você está em um computador
            </h1>
            <p className="text-muted-foreground mb-6">
              O app ConnectFibra está disponível apenas para dispositivos móveis. 
              Escaneie o QR code abaixo com seu celular para baixar.
            </p>
            
            {/* QR Code Placeholder */}
            <div className="bg-background border-2 border-dashed border-border rounded-2xl p-6 mb-6">
              <div className="w-32 h-32 bg-foreground mx-auto rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 ${
                        Math.random() > 0.5 ? "bg-background" : "bg-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Escaneie para baixar
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open(STORE_URLS.android, "_blank")}
              >
                Google Play
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open(STORE_URLS.ios, "_blank")}
              >
                App Store
              </Button>
            </div>
          </>
        )}

        <p className="text-xs text-muted-foreground mt-8">
          ConnectFibra © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default DownloadApp;
