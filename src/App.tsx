import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Home from './pages/Home';
import Questions from './pages/Questions';
import Missions from './pages/Missions';
import Stats from './pages/Stats';
import Ranking from './pages/Ranking';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';
import Simulado from './pages/Simulado';
import Auth from './pages/Auth';
import { QueryClient } from '@tanstack/react-query';
import SupremeChallenge from '@/pages/SupremeChallenge';

function App() {
  return (
    <QueryClient>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/missions" element={<Missions />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/simulado" element={<Simulado />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/supreme-challenge" element={<SupremeChallenge />} />
            </Routes>
            <Toaster />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClient>
  );
}

export default App;
