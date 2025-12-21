import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Wifi, User } from "lucide-react";

const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Planos", href: "/#planos" },
  { label: "Empresas", href: "/#empresas" },
  { label: "Trabalhe Conosco", href: "/trabalhe-conosco", isLink: true },
  { label: "Contato", href: "/#contato" },
  { label: "Cadastre-se", href: "/cadastro", isLink: true },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Wifi className="w-5 h-5 text-primary" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              Connect<span className="text-primary">Fibra</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              item.isLink ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors rounded-lg hover:bg-muted"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://central.exemplo.com" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg">
                <User className="w-4 h-4 mr-2" />
                Central do Assinante
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-up">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                item.isLink ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="px-4 py-3 text-sm font-medium text-primary hover:text-primary/80 hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <a href="https://central.exemplo.com" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                <Button variant="hero" size="lg" className="mt-2 w-full">
                  <User className="w-4 h-4 mr-2" />
                  Central do Assinante
                </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
