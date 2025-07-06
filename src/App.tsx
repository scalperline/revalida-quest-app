import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from '@/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { AuthPage } from '@/pages/AuthPage';
import { PricingPage } from '@/pages/PricingPage';
import { SimuladosPage } from '@/pages/SimuladosPage';
import { SimuladoPage } from '@/pages/SimuladoPage';
import { RankingPage } from '@/pages/RankingPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';
import { ErrorBoundary } from 'react-error-boundary';
import { SuccessPage } from './pages/SuccessPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="auth" element={<AuthPage />} />
                <Route path="pricing" element={<PricingPage />} />
                <Route path="success" element={<SuccessPage />} />
                <Route path="simulados" element={<SimuladosPage />} />
                <Route path="simulado/:id" element={<SimuladoPage />} />
                <Route path="ranking" element={<RankingPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="terms" element={<TermsPage />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
