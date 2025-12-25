import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cadastro from "./pages/Cadastro";
import TrabalheConosco from "./pages/TrabalheConosco";
import Empresas from "./pages/Empresas";
import Contato from "./pages/Contato";
import DownloadApp from "./pages/DownloadApp";
import SiteManager from "./pages/SiteManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/baixar-app" element={<DownloadApp />} />
          <Route path="/site-manager" element={<SiteManager />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
