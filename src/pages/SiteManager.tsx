import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Palette, 
  FileText, 
  Image, 
  Users, 
  Phone, 
  Globe,
  Save,
  LayoutDashboard,
  Package,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SiteManager = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Configurações salvas!",
        description: "As alterações foram aplicadas com sucesso.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Site Manager</h1>
              <p className="text-sm text-muted-foreground">Gerencie todo o conteúdo do seu site</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="geral" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto gap-2 bg-transparent p-0">
            <TabsTrigger value="geral" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card border border-border">
              <Settings className="h-4 w-4 mr-2" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="aparencia" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card border border-border">
              <Palette className="h-4 w-4 mr-2" />
              Aparência
            </TabsTrigger>
            <TabsTrigger value="hero" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card border border-border">
              <Image className="h-4 w-4 mr-2" />
              Hero/Slides
            </TabsTrigger>
            <TabsTrigger value="planos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card border border-border">
              <Package className="h-4 w-4 mr-2" />
              Planos
            </TabsTrigger>
            <TabsTrigger value="paginas" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card border border-border">
              <FileText className="h-4 w-4 mr-2" />
              Páginas
            </TabsTrigger>
            <TabsTrigger value="contato" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card border border-border">
              <Phone className="h-4 w-4 mr-2" />
              Contato
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-card border border-border">
              <Globe className="h-4 w-4 mr-2" />
              SEO
            </TabsTrigger>
          </TabsList>

          {/* Configurações Gerais */}
          <TabsContent value="geral">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>Informações básicas do seu provedor de internet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nome da Empresa</Label>
                    <Input id="company-name" defaultValue="ClickNet" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slogan">Slogan</Label>
                    <Input id="slogan" defaultValue="Internet de verdade para você!" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" defaultValue="00.000.000/0001-00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail Principal</Label>
                    <Input id="email" type="email" defaultValue="contato@clicknet.com.br" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Textarea id="address" defaultValue="Rua Exemplo, 123 - Centro, Cidade - Estado" />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <Label>Modo Manutenção</Label>
                    <p className="text-sm text-muted-foreground">Ativar página de manutenção</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aparência */}
          <TabsContent value="aparencia">
            <Card>
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
                <CardDescription>Personalize as cores e o visual do site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Cor Primária</Label>
                    <div className="flex gap-2">
                      <Input id="primary-color" type="color" defaultValue="#ea580c" className="w-16 h-10 p-1" />
                      <Input defaultValue="#ea580c" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Cor Secundária</Label>
                    <div className="flex gap-2">
                      <Input id="secondary-color" type="color" defaultValue="#1e293b" className="w-16 h-10 p-1" />
                      <Input defaultValue="#1e293b" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Cor de Destaque</Label>
                    <div className="flex gap-2">
                      <Input id="accent-color" type="color" defaultValue="#f97316" className="w-16 h-10 p-1" />
                      <Input defaultValue="#f97316" className="flex-1" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Logo do Site</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-16 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                        <span className="text-sm text-muted-foreground">Logo</span>
                      </div>
                      <Button variant="outline">Alterar Logo</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                        <span className="text-xs text-muted-foreground">ICO</span>
                      </div>
                      <Button variant="outline">Alterar Favicon</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero/Slides */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Slides do Hero</CardTitle>
                <CardDescription>Configure os slides da página inicial e empresas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Slides da Página Inicial</Label>
                  {[1, 2, 3].map((slide) => (
                    <div key={slide} className="p-4 border border-border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Slide {slide}</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Título</Label>
                          <Input defaultValue={`Título do Slide ${slide}`} />
                        </div>
                        <div className="space-y-2">
                          <Label>Subtítulo</Label>
                          <Input defaultValue={`Subtítulo do Slide ${slide}`} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Imagem</Label>
                        <div className="flex items-center gap-4">
                          <div className="w-40 h-24 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                            <Image className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <Button variant="outline">Alterar Imagem</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    + Adicionar Novo Slide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Planos */}
          <TabsContent value="planos">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Planos</CardTitle>
                <CardDescription>Configure os planos de internet disponíveis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {["200 MEGA", "400 MEGA", "600 MEGA"].map((plano, index) => (
                  <div key={plano} className="p-4 border border-border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-lg">{plano}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`destaque-${index}`} className="text-sm">Destaque</Label>
                          <Switch id={`destaque-${index}`} defaultChecked={index === 1} />
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Velocidade (Mega)</Label>
                        <Input type="number" defaultValue={[200, 400, 600][index]} />
                      </div>
                      <div className="space-y-2">
                        <Label>Preço (R$)</Label>
                        <Input type="number" step="0.01" defaultValue={[89.90, 109.90, 139.90][index]} />
                      </div>
                      <div className="space-y-2">
                        <Label>Desconto (%)</Label>
                        <Input type="number" defaultValue={0} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Serviços Inclusos</Label>
                      <div className="flex flex-wrap gap-2">
                        {["Paramount+", "Max", "Deezer", "Watch"].map((service) => (
                          <div key={service} className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                            <span className="text-sm">{service}</span>
                            <button className="text-muted-foreground hover:text-destructive">×</button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm">+ Adicionar</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Benefícios</Label>
                      <Textarea defaultValue="Wi-Fi de alta performance&#10;Instalação grátis&#10;Suporte 24 horas" rows={3} />
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  + Adicionar Novo Plano
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Páginas */}
          <TabsContent value="paginas">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Páginas</CardTitle>
                <CardDescription>Ative ou desative páginas do site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Página Inicial", path: "/", active: true },
                  { name: "Empresas", path: "/empresas", active: true },
                  { name: "Cadastro", path: "/cadastro", active: true },
                  { name: "Trabalhe Conosco", path: "/trabalhe-conosco", active: true },
                ].map((page) => (
                  <div key={page.path} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{page.name}</p>
                      <p className="text-sm text-muted-foreground">{page.path}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Switch defaultChecked={page.active} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contato */}
          <TabsContent value="contato">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
                <CardDescription>Configure telefones, WhatsApp e redes sociais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone Principal</Label>
                    <Input id="phone" defaultValue="(00) 0000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input id="whatsapp" defaultValue="(00) 00000-0000" />
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Redes Sociais</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input id="facebook" placeholder="https://facebook.com/..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input id="instagram" placeholder="https://instagram.com/..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="youtube">YouTube</Label>
                      <Input id="youtube" placeholder="https://youtube.com/..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tiktok">TikTok</Label>
                      <Input id="tiktok" placeholder="https://tiktok.com/..." />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-message">Mensagem Padrão WhatsApp</Label>
                  <Textarea 
                    id="whatsapp-message" 
                    defaultValue="Olá! Gostaria de mais informações sobre os planos de internet."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO */}
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>Otimização SEO</CardTitle>
                <CardDescription>Configure meta tags e informações para buscadores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Título da Página (Meta Title)</Label>
                  <Input id="meta-title" defaultValue="ClickNet - Internet Fibra Óptica de Alta Velocidade" />
                  <p className="text-xs text-muted-foreground">Recomendado: até 60 caracteres</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Descrição (Meta Description)</Label>
                  <Textarea 
                    id="meta-description" 
                    defaultValue="Planos de internet fibra óptica com até 600 Mega. Wi-Fi de alta performance, instalação grátis e suporte 24 horas."
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">Recomendado: até 160 caracteres</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">Palavras-chave</Label>
                  <Input id="keywords" defaultValue="internet, fibra óptica, provedor, wifi, banda larga" />
                </div>
                <div className="space-y-4">
                  <Label>Open Graph (Redes Sociais)</Label>
                  <div className="space-y-2">
                    <Label htmlFor="og-image">Imagem de Compartilhamento</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-48 h-24 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Button variant="outline">Alterar Imagem</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Recomendado: 1200x630 pixels</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="google-analytics">Google Analytics ID</Label>
                  <Input id="google-analytics" placeholder="G-XXXXXXXXXX" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SiteManager;
