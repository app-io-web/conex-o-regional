import { useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Wifi, User, ChevronDown } from "lucide-react";
import { usePublicNav, type NavItem } from "@/hooks/usePublicNav";

const fallbackNavItems: NavItem[] = [
  { label: "Início", href: "/", kind: "anchor" },
  { label: "Empresas", href: "/empresas", kind: "route" },
  { label: "Cadastre-se", href: "/cadastro", kind: "route" },
  { label: "Trabalhe Conosco", href: "/trabalhe-conosco", kind: "route" },
  { label: "Contato", href: "/#contato", kind: "anchor" },
  { label: "Planos", href: "/#planos", kind: "anchor" },
  {
    label: "Áreas",
    href: "#",
    kind: "anchor",
    children: [
      { label: "Área Standard", href: "/area/standard", kind: "route" },
      { label: "Área Advanced", href: "/area/advanced", kind: "route" },
      { label: "Área Top", href: "/area/top", kind: "route" },
      { label: "Área Premium", href: "/area/premium", kind: "route" },
    ],
  },
];

function isRoute(item: NavItem) {
  return item.kind === "route" || (!item.href.includes("#") && item.href.startsWith("/"));
}

function splitHref(href: string) {
  const [path, hash = ""] = href.split("#");
  return { path: path || "/", hash: hash ? `#${hash}` : "" };
}

function isItemActive(item: NavItem, pathname: string, hash: string) {
  const { path, hash: itemHash } = splitHref(item.href);

  if (isRoute(item)) {
    // rota exata (ajuste se quiser "startsWith" pra rotas pai)
    return pathname === path;
  }

  // anchors: só considera ativo se estiver na página certa e hash bater
  if (item.href.includes("#")) {
    const samePage = pathname === path;
    return samePage && hash === itemHash;
  }

  // anchor sem hash (tipo "/"): trata como home
  return pathname === path;
}

function isGroupActive(item: NavItem, pathname: string, hash: string) {
  if (isItemActive(item, pathname, hash)) return true;
  if (!item.children?.length) return false;
  return item.children.some((c) => isItemActive(c, pathname, hash));
}

function NavLink({
  item,
  className,
  onClick,
}: {
  item: NavItem;
  className: string;
  onClick?: () => void;
}) {
  if (isRoute(item)) {
    return (
      <Link to={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

const FIXED_ORDER: Record<string, number> = {
  "Início": 1,
  "Empresas": 2,
  "Cadastre-se": 3,
  "Trabalhe Conosco": 4,
  "Contato": 5,
  "Planos": 6,
  "Áreas": 7,
};

export function Header() {
  const { pathname, hash } = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroups, setOpenMobileGroups] = useState<Record<string, boolean>>({});

  const closeTimer = useRef<number | null>(null);

  const { items } = usePublicNav(fallbackNavItems);

  const navItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const pa = FIXED_ORDER[a.label] ?? 9999;
      const pb = FIXED_ORDER[b.label] ?? 9999;
      if (pa !== pb) return pa - pb;

      const posa = (a as any).position ?? 9999;
      const posb = (b as any).position ?? 9999;
      if (posa !== posb) return posa - posb;

      return a.label.localeCompare(b.label);
    });

    for (const it of sorted) {
      if (it.children?.length) {
        it.children = [...it.children].sort((x: any, y: any) => {
          const px = x.position ?? 9999;
          const py = y.position ?? 9999;
          if (px !== py) return px - py;
          return String(x.label).localeCompare(String(y.label));
        });
      }
    }

    return sorted;
  }, [items]);

  const centralUrl = useMemo(() => {
    return import.meta.env.VITE_CENTRAL_URL || "https://central.exemplo.com";
  }, []);

  function openMenu(label: string) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }

  function scheduleClose(label: string) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setOpenDropdown((v) => (v === label ? null : v));
    }, 120);
  }

  // classes "normal" vs "ativo"
  const baseLink =
    "px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-muted";
  const baseLinkMobile =
    "px-4 py-3 text-sm font-medium transition-colors rounded-lg hover:bg-muted";

  const clsActive = `${baseLink} text-primary bg-primary/10`;
  const clsInactive = `${baseLink} text-muted-foreground hover:text-foreground`;

  const clsActiveMobile = `${baseLinkMobile} text-primary bg-primary/10`;
  const clsInactiveMobile = `${baseLinkMobile} text-muted-foreground hover:text-foreground`;

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
            {navItems.map((item) => {
              const hasChildren = !!item.children?.length;
              const active = isGroupActive(item, pathname, hash);

              if (!hasChildren) {
                return (
                  <NavLink
                    key={item.label}
                    item={item}
                    className={active ? clsActive : clsInactive}
                  />
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openMenu(item.label)}
                  onMouseLeave={() => scheduleClose(item.label)}
                >
                  <button
                    type="button"
                    className={`${active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"} ${baseLink} inline-flex items-center gap-1`}
                    onClick={() => setOpenDropdown((v) => (v === item.label ? null : item.label))}
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {openDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 pt-2 w-56"
                      onMouseEnter={() => openMenu(item.label)}
                      onMouseLeave={() => scheduleClose(item.label)}
                    >
                      <div className="rounded-xl border border-border/60 bg-background/95 backdrop-blur shadow-lg overflow-hidden">
                        <div className="p-2">
                          {item.children!.map((child) => {
                            const childActive = isItemActive(child, pathname, hash);
                            return (
                              <NavLink
                                key={`${item.label}-${child.label}`}
                                item={child}
                                className={
                                  childActive
                                    ? "block px-3 py-2 text-sm rounded-lg bg-primary/10 text-primary"
                                    : "block px-3 py-2 text-sm rounded-lg hover:bg-muted text-foreground/90 hover:text-foreground transition-colors"
                                }
                                onClick={() => setOpenDropdown(null)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a href={centralUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg">
                <User className="w-4 h-4 mr-2" />
                Central do Assinante
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-foreground">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-up">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const hasChildren = !!item.children?.length;
                const active = isGroupActive(item, pathname, hash);

                if (!hasChildren) {
                  return (
                    <NavLink
                      key={item.label}
                      item={item}
                      className={active ? clsActiveMobile : clsInactiveMobile}
                      onClick={() => setIsMenuOpen(false)}
                    />
                  );
                }

                const open = !!openMobileGroups[item.label];

                return (
                  <div key={item.label} className="px-2">
                    <button
                      type="button"
                      className={`w-full px-2 py-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-between hover:bg-muted ${
                        active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() =>
                        setOpenMobileGroups((m) => ({ ...m, [item.label]: !m[item.label] }))
                      }
                    >
                      <span className="px-2">{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>

                    {open && (
                      <div className="mt-1 ml-3 pl-3 border-l border-border/60 flex flex-col gap-1">
                        {item.children!.map((child) => {
                          const childActive = isItemActive(child, pathname, hash);
                          return (
                            <NavLink
                              key={`${item.label}-${child.label}`}
                              item={child}
                              className={
                                childActive
                                  ? "px-4 py-2 text-sm rounded-lg bg-primary/10 text-primary"
                                  : "px-4 py-2 text-sm rounded-lg hover:bg-muted text-foreground/80 hover:text-foreground transition-colors"
                              }
                              onClick={() => setIsMenuOpen(false)}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <a
                href={centralUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
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
