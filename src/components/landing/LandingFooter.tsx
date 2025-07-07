
import { Stethoscope, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">RevalidaQuest</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              A plataforma de preparação para o Revalida mais completa do Brasil.
              Transforme seus estudos em uma jornada gamificada rumo à aprovação.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>contato@revalidaquest.com.br</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/auth" className="hover:text-white transition-colors">Entrar</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Preços</Link></li>
              <li><a href="#features" className="hover:text-white transition-colors">Recursos</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Depoimentos</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Informações</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/termos" className="hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link to="/privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
              <li><Link to="/ajuda" className="hover:text-white transition-colors">Ajuda</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} RevalidaQuest. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            Feito com ❤️ para médicos brasileiros
          </p>
        </div>
      </div>
    </footer>
  );
}
