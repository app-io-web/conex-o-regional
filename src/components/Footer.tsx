import { Wifi, Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer id="contato" className="pt-16 pb-8 border-t border-border bg-section-dark text-section-dark-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-primary" />
              </div>
              <span className="font-heading font-bold text-xl text-section-dark-foreground">
                Connect<span className="text-primary">Fibra</span>
              </span>
            </a>
            <p className="text-section-dark-foreground/60 text-sm mb-6">
              Internet de alta velocidade para sua região. Conectando famílias e empresas há mais de 10 anos.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors group">
                <Instagram className="w-5 h-5 text-section-dark-foreground/60 group-hover:text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors group">
                <Facebook className="w-5 h-5 text-section-dark-foreground/60 group-hover:text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors group">
                <MessageCircle className="w-5 h-5 text-section-dark-foreground/60 group-hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-section-dark-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#inicio" className="text-section-dark-foreground/60 hover:text-primary transition-colors text-sm">Início</a>
              </li>
              <li>
                <a href="#planos" className="text-section-dark-foreground/60 hover:text-primary transition-colors text-sm">Nossos Planos</a>
              </li>
              <li>
                <a href="#empresas" className="text-section-dark-foreground/60 hover:text-primary transition-colors text-sm">Para Empresas</a>
              </li>
              <li>
                <a href="#app" className="text-section-dark-foreground/60 hover:text-primary transition-colors text-sm">Baixe o App</a>
              </li>
              <li>
                <a href="#" className="text-section-dark-foreground/60 hover:text-primary transition-colors text-sm">Segunda Via</a>
              </li>
            </ul>
          </div>

          {/* Trabalhe Conosco */}
          <div id="trabalhe">
            <h4 className="font-heading font-bold text-section-dark-foreground mb-4">Trabalhe Conosco</h4>
            <p className="text-section-dark-foreground/60 text-sm mb-4">
              Faça parte do nosso time! Estamos sempre em busca de talentos.
            </p>
            <a href="#" className="text-primary hover:underline text-sm font-medium">
              Ver vagas disponíveis →
            </a>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-heading font-bold text-section-dark-foreground mb-4">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-section-dark-foreground/50">Central de Atendimento</p>
                  <p className="text-sm text-section-dark-foreground font-medium">(11) 3000-0000</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-section-dark-foreground/50">WhatsApp</p>
                  <p className="text-sm text-section-dark-foreground font-medium">(11) 99000-0000</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-section-dark-foreground/50">E-mail</p>
                  <p className="text-sm text-section-dark-foreground font-medium">contato@connectfibra.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-section-dark-foreground/50">Endereço</p>
                  <p className="text-sm text-section-dark-foreground font-medium">Av. Principal, 1000 - Centro</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-section-dark-foreground/50 text-sm">
              © 2024 ConnectFibra. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-section-dark-foreground/50 hover:text-primary transition-colors text-sm">
                Política de Privacidade
              </a>
              <a href="#" className="text-section-dark-foreground/50 hover:text-primary transition-colors text-sm">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
