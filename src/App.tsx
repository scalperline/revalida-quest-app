
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '@/components/Navbar';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Pricing from '@/pages/Pricing';
import { SuccessPage } from '@/pages/SuccessPage';
import Stats from '@/pages/Stats';
import Profile from '@/pages/Profile';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<><Navbar /><Index /></>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/success" element={<><Navbar /><SuccessPage /></>} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Toaster />
          </ErrorBoundary>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
