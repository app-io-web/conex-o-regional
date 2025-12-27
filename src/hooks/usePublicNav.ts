import { useMemo } from "react";

export interface NavItem {
  label: string;
  href: string;
  kind: "route" | "anchor";
  children?: NavItem[];
  position?: number;
}

const defaultNavItems: NavItem[] = [
  { label: "Início", href: "/", kind: "anchor", position: 1 },
  { label: "Empresas", href: "/empresas", kind: "route", position: 2 },
  { label: "Cadastre-se", href: "/cadastro", kind: "route", position: 3 },
  { label: "Trabalhe Conosco", href: "/trabalhe-conosco", kind: "route", position: 4 },
  { label: "Contato", href: "/#contato", kind: "anchor", position: 5 },
  { label: "Planos", href: "/#planos", kind: "anchor", position: 6 },
  {
    label: "Áreas",
    href: "#",
    kind: "anchor",
    position: 7,
    children: [
      { label: "Área Standard", href: "/area/standard", kind: "route", position: 1 },
      { label: "Área Advanced", href: "/area/advanced", kind: "route", position: 2 },
      { label: "Área Top", href: "/area/top", kind: "route", position: 3 },
      { label: "Área Premium", href: "/area/premium", kind: "route", position: 4 },
    ],
  },
];

export function usePublicNav(fallback?: NavItem[]) {
  const items = useMemo(() => {
    // Por enquanto retorna os itens padrão
    // Futuramente pode buscar de uma API ou banco de dados
    return fallback || defaultNavItems;
  }, [fallback]);

  return { items };
}
