import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Share2, Clock, CheckCircle, Loader2, AlertCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

const CompartilharLocalizacao = () => {
  const [status, setStatus] = useState<"idle" | "requesting" | "sharing" | "expired" | "error">("idle");
  const [location, setLocation] = useState<LocationData | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60); // 30 minutes in seconds
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();

  // Generate unique share ID
  const generateShareId = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  // Request location permission and start sharing
  const startSharing = () => {
    setStatus("requesting");
    
    if (!navigator.geolocation) {
      setStatus("error");
      setErrorMessage("Seu navegador não suporta geolocalização.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now(),
        };
        
        setLocation(locationData);
        setShareId(generateShareId());
        setStatus("sharing");
        setTimeRemaining(30 * 60);
        
        // Store in localStorage for demo purposes (in production, this would go to a database)
        localStorage.setItem(`location_${shareId}`, JSON.stringify({
          ...locationData,
          expiresAt: Date.now() + 30 * 60 * 1000,
        }));
        
        toast({
          title: "Localização compartilhada!",
          description: "Seu link de compartilhamento foi gerado.",
        });
      },
      (error) => {
        setStatus("error");
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage("Você negou o acesso à localização. Por favor, permita o acesso nas configurações do navegador.");
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMessage("Não foi possível obter sua localização. Verifique se o GPS está ativado.");
            break;
          case error.TIMEOUT:
            setErrorMessage("Tempo esgotado ao obter localização. Tente novamente.");
            break;
          default:
            setErrorMessage("Erro desconhecido ao obter localização.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Update location in real-time while sharing
  useEffect(() => {
    if (status !== "sharing") return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now(),
        };
        setLocation(locationData);
        
        // Update localStorage (in production, this would update the database)
        if (shareId) {
          localStorage.setItem(`location_${shareId}`, JSON.stringify({
            ...locationData,
            expiresAt: Date.now() + timeRemaining * 1000,
          }));
        }
      },
      (error) => {
        console.error("Error watching position:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [status, shareId, timeRemaining]);

  // Countdown timer
  useEffect(() => {
    if (status !== "sharing") return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setStatus("expired");
          if (shareId) {
            localStorage.removeItem(`location_${shareId}`);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, shareId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const shareLink = shareId ? `${window.location.origin}/ver-localizacao/${shareId}` : "";

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência.",
    });
  };

  const stopSharing = () => {
    if (shareId) {
      localStorage.removeItem(`location_${shareId}`);
    }
    setStatus("idle");
    setLocation(null);
    setShareId(null);
    setTimeRemaining(30 * 60);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-foreground">Compartilhar Localização</CardTitle>
          <CardDescription>
            Compartilhe sua localização em tempo real por 30 minutos
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {status === "idle" && (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground text-sm">
                Ao clicar em compartilhar, você permitirá que nossa equipe veja sua localização em tempo real para melhor atendê-lo.
              </p>
              <Button onClick={startSharing} className="w-full gap-2" size="lg">
                <Share2 className="w-5 h-5" />
                Compartilhar Minha Localização
              </Button>
            </div>
          )}

          {status === "requesting" && (
            <div className="text-center space-y-4 py-8">
              <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
              <p className="text-muted-foreground">Obtendo sua localização...</p>
              <p className="text-sm text-muted-foreground">
                Por favor, permita o acesso à localização quando solicitado.
              </p>
            </div>
          )}

          {status === "sharing" && location && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 text-primary">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Localização ativa</span>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Latitude:</span>
                  <span className="font-mono text-foreground">{location.latitude.toFixed(6)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Longitude:</span>
                  <span className="font-mono text-foreground">{location.longitude.toFixed(6)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Precisão:</span>
                  <span className="font-mono text-foreground">±{location.accuracy.toFixed(0)}m</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-foreground">Expira em: {formatTime(timeRemaining)}</span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Link de compartilhamento:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm font-mono"
                  />
                  <Button variant="outline" size="icon" onClick={copyLink}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Envie este link para o atendente visualizar sua localização.
                </p>
              </div>

              <Button variant="destructive" onClick={stopSharing} className="w-full">
                Parar de Compartilhar
              </Button>
            </div>
          )}

          {status === "expired" && (
            <div className="text-center space-y-4 py-4">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <p className="font-medium text-foreground">Compartilhamento expirado</p>
                <p className="text-sm text-muted-foreground">
                  O tempo de 30 minutos foi atingido.
                </p>
              </div>
              <Button onClick={startSharing} className="w-full gap-2">
                <Share2 className="w-5 h-5" />
                Compartilhar Novamente
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="text-center space-y-4 py-4">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
              <div>
                <p className="font-medium text-foreground">Erro ao obter localização</p>
                <p className="text-sm text-muted-foreground">{errorMessage}</p>
              </div>
              <Button onClick={startSharing} className="w-full gap-2">
                <Share2 className="w-5 h-5" />
                Tentar Novamente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompartilharLocalizacao;
