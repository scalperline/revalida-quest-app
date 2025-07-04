
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SupremeChallenge from '@/pages/SupremeChallenge';

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<div>Home placeholder</div>} />
              <Route path="/questions" element={<div>Questions placeholder</div>} />
              <Route path="/missions" element={<div>Missions placeholder</div>} />
              <Route path="/stats" element={<div>Stats placeholder</div>} />
              <Route path="/ranking" element={<div>Ranking placeholder</div>} />
              <Route path="/profile" element={<div>Profile placeholder</div>} />
              <Route path="/pricing" element={<div>Pricing placeholder</div>} />
              <Route path="/simulado" element={<div>Simulado placeholder</div>} />
              <Route path="/auth" element={<div>Auth placeholder</div>} />
              <Route path="/supreme-challenge" element={<SupremeChallenge />} />
            </Routes>
            <Toaster />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
