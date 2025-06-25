
import React from 'react';

export function AuthStatsFooter() {
  return (
    <>
      {/* Rodapé com Estatísticas */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="font-bold text-blue-600">1.500+</div>
            <div className="text-gray-500 text-xs">Questões</div>
          </div>
          <div>
            <div className="font-bold text-green-600">95%</div>
            <div className="text-gray-500 text-xs">Aprovação</div>
          </div>
          <div>
            <div className="font-bold text-yellow-600">12k+</div>
            <div className="text-gray-500 text-xs">Médicos</div>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Problemas para acessar? Verifique seu email ou entre em contato conosco.
        </p>
      </div>
    </>
  );
}
