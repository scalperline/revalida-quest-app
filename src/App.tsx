
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Questions from '@/pages/Questions';
import Simulado from '@/pages/Simulado';
import Missions from '@/pages/Missions';
import Ranking from '@/pages/Ranking';
import Profile from '@/pages/Profile';
import Stats from '@/pages/Stats';
import Pricing from '@/pages/Pricing';
import './App.css';

const queryClient = new QueryClient();

function App() {
  console.log('App - rendering');
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/questions"
                element={
                  <ProtectedRoute>
                    <Questions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/simulado"
                element={
                  <ProtectedRoute>
                    <Simulado />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/missions"
                element={
                  <ProtectedRoute>
                    <Missions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ranking"
                element={
                  <ProtectedRoute>
                    <Ranking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/stats"
                element={
                  <ProtectedRoute>
                    <Stats />
                  </ProtectedRoute>
                }
              />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
