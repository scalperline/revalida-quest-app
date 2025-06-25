
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/questions" element={
              <ProtectedRoute>
                <Questions />
              </ProtectedRoute>
            } />
            <Route path="/questoes" element={
              <ProtectedRoute>
                <Questions />
              </ProtectedRoute>
            } />
            <Route path="/missions" element={
              <ProtectedRoute>
                <Missions />
              </ProtectedRoute>
            } />
            <Route path="/missoes" element={
              <ProtectedRoute>
                <Missions />
              </ProtectedRoute>
            } />
            <Route path="/stats" element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            } />
            <Route path="/estatisticas" element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/perfil" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/ranking" element={
              <ProtectedRoute>
                <Ranking />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
