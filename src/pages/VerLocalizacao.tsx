import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ExternalLink, AlertCircle, Loader2, RefreshCw } from "lucide-react";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  expiresAt: number;
}

const VerLocalizacao = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const [status, setStatus] = useState<"loading" | "active" | "expired" | "not-found">("loading");
  const [location, setLocation] = useState<LocationData | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // Fetch location data
  const fetchLocation = () => {
    // In production, this would fetch from a database via API
    // For demo purposes, we're using localStorage
    const storedData = localStorage.getItem(`location_${shareId}`);
    
    if (!storedData) {
      setStatus("not-found");
      return;
    }

    try {
      const data: LocationData = JSON.parse(storedData);
      
      if (Date.now() > data.expiresAt) {
        setStatus("expired");
        localStorage.removeItem(`location_${shareId}`);
        return;
      }

      setLocation(data);
      setTimeRemaining(Math.max(0, Math.floor((data.expiresAt - Date.now()) / 1000)));
      setLastUpdate(new Date(data.timestamp).toLocaleTimeString("pt-BR"));
      setStatus("active");
    } catch {
      setStatus("not-found");
    }
  };

  // Initial fetch and polling
  useEffect(() => {
    fetchLocation();
    
    // Poll for updates every 5 seconds
    const pollInterval = setInterval(fetchLocation, 5000);
    
    return () => clearInterval(pollInterval);
  }, [shareId]);

  // Countdown timer
  useEffect(() => {
    if (status !== "active") return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setStatus("expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const openInMaps = () => {
    if (!location) return;
    const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
    window.open(url, "_blank");
  };

  const openInWaze = () => {
    if (!location) return;
    const url = `https://waze.com/ul?ll=${location.latitude},${location.longitude}&navigate=yes`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-foreground">Localização do Cliente</CardTitle>
          <CardDescription>
            ID: {shareId}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {status === "loading" && (
            <div className="text-center space-y-4 py-8">
              <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
              <p className="text-muted-foreground">Carregando localização...</p>
            </div>
          )}

          {status === "active" && location && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 text-primary">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <span className="font-medium">Localização em tempo real</span>
              </div>

              {/* Mini Map Placeholder */}
              <div className="relative h-48 bg-muted rounded-lg overflow-hidden border border-border">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="w-8 h-8 text-primary mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>
                {/* Grid overlay for map effect */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full grid grid-cols-8 grid-rows-6">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-foreground/20" />
                    ))}
                  </div>
                </div>
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
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Última atualização:</span>
                  <span className="font-mono text-foreground">{lastUpdate}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-foreground">Expira em: {formatTime(timeRemaining)}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={openInMaps} className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Google Maps
                </Button>
                <Button onClick={openInWaze} variant="outline" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Waze
                </Button>
              </div>

              <Button variant="ghost" onClick={fetchLocation} className="w-full gap-2">
                <RefreshCw className="w-4 h-4" />
                Atualizar Localização
              </Button>
            </div>
          )}

          {status === "expired" && (
            <div className="text-center space-y-4 py-8">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <p className="font-medium text-foreground">Compartilhamento expirado</p>
                <p className="text-sm text-muted-foreground">
                  O tempo de compartilhamento foi atingido ou o cliente parou de compartilhar.
                </p>
              </div>
            </div>
          )}

          {status === "not-found" && (
            <div className="text-center space-y-4 py-8">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
              <div>
                <p className="font-medium text-foreground">Localização não encontrada</p>
                <p className="text-sm text-muted-foreground">
                  Este link de compartilhamento não existe ou já expirou.
                </p>
              </div>
              <Button variant="ghost" onClick={fetchLocation} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Tentar Novamente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerLocalizacao;
