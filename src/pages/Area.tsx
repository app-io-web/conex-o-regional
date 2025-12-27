import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Tv, 
  ShoppingBag, 
  Music, 
  Gamepad2, 
  Check, 
  AlertTriangle,
  Crown,
  Star,
  Zap,
  Shield
} from "lucide-react";

type AreaType = "standard" | "advanced" | "top" | "premium";

interface AppInfo {
  nome: string;
  icon: React.ReactNode;
  descricao: string;
  temAds?: boolean;
}

interface AreaData {
  titulo: string;
  subtitulo: string;
  icon: React.ReactNode;
  cor: string;
  aplicativos: AppInfo[];
  vantagens: string[];
  contratuais: string[];
}

const areasData: Record<AreaType, AreaData> = {
  standard: {
    titulo: "Área Standard",
    subtitulo: "O essencial para você começar",
    icon: <Shield className="w-8 h-8" />,
    cor: "from-slate-500 to-slate-600",
    aplicativos: [
      { nome: "Globoplay", icon: <Tv className="w-5 h-5" />, descricao: "Streaming de TV e novelas", temAds: true },
      { nome: "Pluto TV", icon: <Tv className="w-5 h-5" />, descricao: "Canais ao vivo gratuitos", temAds: true },
    ],
    vantagens: [
      "Acesso aos aplicativos básicos de streaming",
      "Suporte técnico em horário comercial",
      "Instalação gratuita",
    ],
    contratuais: [
      "Fidelidade mínima de 12 meses",
      "Multa proporcional em caso de cancelamento antecipado",
      "Equipamento em comodato",
    ],
  },
  advanced: {
    titulo: "Área Advanced",
    subtitulo: "Mais conteúdo para toda a família",
    icon: <Zap className="w-8 h-8" />,
    cor: "from-blue-500 to-blue-600",
    aplicativos: [
      { nome: "Globoplay", icon: <Tv className="w-5 h-5" />, descricao: "Streaming de TV e novelas", temAds: true },
      { nome: "Pluto TV", icon: <Tv className="w-5 h-5" />, descricao: "Canais ao vivo gratuitos", temAds: true },
      { nome: "Deezer", icon: <Music className="w-5 h-5" />, descricao: "Streaming de música", temAds: true },
      { nome: "Magalu", icon: <ShoppingBag className="w-5 h-5" />, descricao: "Compras online" },
    ],
    vantagens: [
      "Todos os benefícios do plano Standard",
      "Aplicativos de música inclusos",
      "Suporte técnico estendido",
      "Prioridade no atendimento",
    ],
    contratuais: [
      "Fidelidade mínima de 12 meses",
      "Multa proporcional em caso de cancelamento antecipado",
      "Equipamento em comodato",
      "Upgrade disponível a qualquer momento",
    ],
  },
  top: {
    titulo: "Área Top",
    subtitulo: "Entretenimento completo com propagandas",
    icon: <Star className="w-8 h-8" />,
    cor: "from-orange-500 to-orange-600",
    aplicativos: [
      { nome: "Netflix", icon: <Tv className="w-5 h-5" />, descricao: "Streaming de filmes e séries", temAds: true },
      { nome: "HBO Max", icon: <Tv className="w-5 h-5" />, descricao: "Filmes e séries exclusivas", temAds: true },
      { nome: "Amazon Prime Video", icon: <Tv className="w-5 h-5" />, descricao: "Streaming e benefícios Prime", temAds: true },
      { nome: "Spotify", icon: <Music className="w-5 h-5" />, descricao: "Streaming de música", temAds: true },
      { nome: "Mercado Livre", icon: <ShoppingBag className="w-5 h-5" />, descricao: "Compras online" },
      { nome: "Xbox Game Pass", icon: <Gamepad2 className="w-5 h-5" />, descricao: "Jogos por assinatura" },
    ],
    vantagens: [
      "Todos os benefícios do plano Advanced",
      "Aplicativos de streaming premium (com ADS)",
      "Aplicativos de games inclusos",
      "Suporte técnico 24h",
      "Visita técnica prioritária",
    ],
    contratuais: [
      "Fidelidade mínima de 12 meses",
      "Multa proporcional em caso de cancelamento antecipado",
      "Equipamento em comodato",
      "Os aplicativos de streaming possuem propagandas (ADS)",
      "Upgrade para Premium disponível",
    ],
  },
  premium: {
    titulo: "Área Premium",
    subtitulo: "A melhor experiência, sem propagandas",
    icon: <Crown className="w-8 h-8" />,
    cor: "from-primary to-purple-600",
    aplicativos: [
      { nome: "Netflix Premium", icon: <Tv className="w-5 h-5" />, descricao: "5 telas, Ultra HD, sem propagandas", temAds: false },
      { nome: "HBO Max", icon: <Tv className="w-5 h-5" />, descricao: "Sem propagandas, qualidade máxima", temAds: false },
      { nome: "Disney+", icon: <Tv className="w-5 h-5" />, descricao: "Todo conteúdo Disney, Marvel e Star Wars", temAds: false },
      { nome: "Amazon Prime Video", icon: <Tv className="w-5 h-5" />, descricao: "Streaming premium completo", temAds: false },
      { nome: "Spotify Premium", icon: <Music className="w-5 h-5" />, descricao: "Música sem anúncios, offline", temAds: false },
      { nome: "Mercado Livre", icon: <ShoppingBag className="w-5 h-5" />, descricao: "Compras online com frete grátis" },
      { nome: "Xbox Game Pass Ultimate", icon: <Gamepad2 className="w-5 h-5" />, descricao: "Todos os jogos, Cloud Gaming" },
    ],
    vantagens: [
      "Todos os benefícios do plano Top",
      "Streaming SEM PROPAGANDAS",
      "Netflix com 5 telas simultâneas",
      "Qualidade 4K/Ultra HD em todos os apps",
      "Suporte VIP dedicado",
      "Prioridade máxima em atendimento",
      "Equipamento premium incluso",
    ],
    contratuais: [
      "Fidelidade mínima de 12 meses",
      "Multa proporcional em caso de cancelamento antecipado",
      "Equipamento premium em comodato",
      "Todos os aplicativos de streaming SEM propagandas",
      "Garantia estendida nos equipamentos",
    ],
  },
};

export default function Area() {
  const { tipo } = useParams<{ tipo: string }>();
  const areaType = (tipo as AreaType) || "standard";
  const area = areasData[areaType] || areasData.standard;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        {/* Hero da Área */}
        <section className={`bg-gradient-to-r ${area.cor} py-16 md:py-24`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-xl text-white">
                {area.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                  {area.titulo}
                </h1>
                <p className="text-lg md:text-xl text-white/80 mt-2">
                  {area.subtitulo}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Aplicativos */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Aplicativos Inclusos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {area.aplicativos.map((app, index) => (
                <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {app.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{app.nome}</h3>
                          {app.temAds !== undefined && (
                            <Badge 
                              variant={app.temAds ? "secondary" : "default"}
                              className={app.temAds ? "bg-yellow-500/20 text-yellow-600" : "bg-green-500/20 text-green-600"}
                            >
                              {app.temAds ? "Com ADS" : "Sem ADS"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {app.descricao}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Vantagens e Contratuais */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vantagens */}
              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    Vantagens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {area.vantagens.map((vantagem, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-foreground/90">{vantagem}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Questões Contratuais */}
              <Card className="border-yellow-500/30 bg-yellow-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-600">
                    <AlertTriangle className="w-5 h-5" />
                    Questões Contratuais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {area.contratuais.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Interessado na {area.titulo}?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Entre em contato com nossa equipe para saber mais sobre este plano e como contratar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cadastro">
                <Button size="lg" className="w-full sm:w-auto">
                  Quero Contratar
                </Button>
              </Link>
              <Link to="/#contato">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Falar com Atendimento
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
