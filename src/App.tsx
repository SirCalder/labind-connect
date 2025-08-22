// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider"; // Importe o ThemeProvider
import Index from "./pages/Index";
import Projetos from "./pages/Projetos";
import Equipe from "./pages/Equipe";
import Publicacoes from "./pages/Publicacoes";
import Noticias from "./pages/Noticias";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminProjects from "./pages/AdminProjects";
import AdminProjectForm from "./pages/AdminProjectForm";
import ProjectDetail from "./pages/ProjectDetail";
import AdminNews from "./pages/AdminNews";
import AdminNewsForm from "./pages/AdminNewsForm";
import AdminTeam from "./pages/AdminTeam";
import AdminTeamForm from "./pages/AdminTeamForm";
import NewsDetail from "./pages/NewsDetail";
import AdminPublications from "./pages/AdminPublications";
import AdminPublicationForm from "./pages/AdminPublicationForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/labind-connect">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projetos/:id" element={<ProjectDetail />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/equipe" element={<Equipe />} />
            <Route path="/publicacoes" element={<Publicacoes />} />
            <Route path="/noticias/:id" element={<NewsDetail />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/contato" element={<Contato />} />
            
            {/* Rotas de Admin */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/projetos" element={<AdminProjects />} />
            <Route path="/admin/projetos/novo" element={<AdminProjectForm />} />
            <Route path="/admin/projetos/editar/:id" element={<AdminProjectForm />} />
            <Route path="/admin/noticias" element={<AdminNews />} />
            <Route path="/admin/noticias/novo" element={<AdminNewsForm />} />
            <Route path="/admin/noticias/editar/:id" element={<AdminNewsForm />} />
            <Route path="/admin/equipe" element={<AdminTeam />} />
            <Route path="/admin/equipe/novo" element={<AdminTeamForm />} />
            <Route path="/admin/equipe/editar/:id" element={<AdminTeamForm />} />
            <Route path="/admin/publicacoes" element={<AdminPublications />} />
            <Route path="/admin/publicacoes/novo" element={<AdminPublicationForm />} />
            <Route path="/admin/publicacoes/editar/:id" element={<AdminPublicationForm />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;