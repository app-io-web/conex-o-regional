import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Wifi, Download, Upload, Activity, RotateCcw } from "lucide-react";

type TestPhase = "idle" | "ping" | "download" | "upload" | "complete";

interface SpeedResults {
  ping: number;
  download: number;
  upload: number;
}

const TesteVelocidade = () => {
  const [phase, setPhase] = useState<TestPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [results, setResults] = useState<SpeedResults>({
    ping: 0,
    download: 0,
    upload: 0,
  });

  const simulateTest = async () => {
    setPhase("ping");
    setProgress(0);
    setResults({ ping: 0, download: 0, upload: 0 });

    // Simular teste de ping
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 50));
      setProgress(i);
    }
    const pingResult = Math.floor(Math.random() * 20) + 5;
    setResults((prev) => ({ ...prev, ping: pingResult }));

    // Simular teste de download
    setPhase("download");
    setProgress(0);
    for (let i = 0; i <= 100; i += 2) {
      await new Promise((r) => setTimeout(r, 50));
      setProgress(i);
      const speed = Math.floor(Math.random() * 50) + 80 + Math.sin(i / 10) * 20;
      setCurrentSpeed(speed);
    }
    const downloadResult = Math.floor(Math.random() * 100) + 100;
    setResults((prev) => ({ ...prev, download: downloadResult }));

    // Simular teste de upload
    setPhase("upload");
    setProgress(0);
    for (let i = 0; i <= 100; i += 2) {
      await new Promise((r) => setTimeout(r, 50));
      setProgress(i);
      const speed = Math.floor(Math.random() * 30) + 40 + Math.sin(i / 10) * 15;
      setCurrentSpeed(speed);
    }
    const uploadResult = Math.floor(Math.random() * 50) + 50;
    setResults((prev) => ({ ...prev, upload: uploadResult }));

    setPhase("complete");
    setCurrentSpeed(0);
  };

  const resetTest = () => {
    setPhase("idle");
    setProgress(0);
    setCurrentSpeed(0);
    setResults({ ping: 0, download: 0, upload: 0 });
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case "ping":
        return "Testando Latência...";
      case "download":
        return "Testando Download...";
      case "upload":
        return "Testando Upload...";
      case "complete":
        return "Teste Concluído!";
      default:
        return "Pronto para testar";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Teste de Velocidade
            </h1>
            <p className="text-muted-foreground">
              Verifique a velocidade da sua conexão de internet
            </p>
          </div>

          {/* Speedometer Display */}
          <Card className="mb-8 border-primary/20">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center">
                {/* Main Speed Circle */}
                <div className="relative w-48 h-48 mb-6">
                  <div className="absolute inset-0 rounded-full border-8 border-muted" />
                  <div
                    className="absolute inset-0 rounded-full border-8 border-primary transition-all duration-300"
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((progress / 100) * Math.PI * 2)}% ${50 - 50 * Math.cos((progress / 100) * Math.PI * 2)}%, 50% 50%)`,
                      opacity: phase !== "idle" && phase !== "complete" ? 1 : 0.3,
                    }}
                  />
                  <div className="absolute inset-4 rounded-full bg-card flex flex-col items-center justify-center shadow-inner">
                    {phase === "idle" ? (
                      <Wifi className="w-12 h-12 text-primary mb-2" />
                    ) : phase === "complete" ? (
                      <Activity className="w-12 h-12 text-primary mb-2" />
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-foreground">
                          {currentSpeed.toFixed(0)}
                        </span>
                        <span className="text-sm text-muted-foreground">Mbps</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Phase Label */}
                <p className="text-lg font-medium text-foreground mb-4">
                  {getPhaseLabel()}
                </p>

                {/* Progress Bar */}
                {phase !== "idle" && phase !== "complete" && (
                  <div className="w-full max-w-xs mb-4">
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                {/* Action Buttons */}
                {phase === "idle" && (
                  <Button
                    onClick={simulateTest}
                    size="lg"
                    className="px-8 py-6 text-lg"
                  >
                    <Activity className="w-5 h-5 mr-2" />
                    Iniciar Teste
                  </Button>
                )}

                {phase === "complete" && (
                  <Button
                    onClick={resetTest}
                    variant="outline"
                    size="lg"
                    className="px-8"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Testar Novamente
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Cards */}
          {(phase === "complete" || results.ping > 0) && (
            <div className="grid grid-cols-3 gap-4">
              <Card className={`text-center ${results.ping > 0 ? "border-primary/40" : ""}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
                    <Activity className="w-4 h-4" />
                    Ping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-foreground">
                    {results.ping > 0 ? `${results.ping}` : "-"}
                  </p>
                  <p className="text-xs text-muted-foreground">ms</p>
                </CardContent>
              </Card>

              <Card className={`text-center ${results.download > 0 ? "border-primary/40" : ""}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    {results.download > 0 ? `${results.download}` : "-"}
                  </p>
                  <p className="text-xs text-muted-foreground">Mbps</p>
                </CardContent>
              </Card>

              <Card className={`text-center ${results.upload > 0 ? "border-primary/40" : ""}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-foreground">
                    {results.upload > 0 ? `${results.upload}` : "-"}
                  </p>
                  <p className="text-xs text-muted-foreground">Mbps</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Info */}
          <p className="text-center text-xs text-muted-foreground mt-8">
            * Este é um teste simulado para demonstração. Para resultados reais,
            utilize ferramentas como Speedtest.net ou Fast.com
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TesteVelocidade;
