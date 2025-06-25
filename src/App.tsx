
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Questions from "./pages/Questions";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import Missions from "./pages/Missions";
import Ranking from "./pages/Ranking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/questoes" element={<Questions />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/missoes" element={<Missions />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/estatisticas" element={<Stats />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
