
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuestionsPaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  onPageChange: (page: number) => void;
}

export function QuestionsPagination({
  paginaAtual,
  totalPaginas,
  onPageChange,
}: QuestionsPaginationProps) {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPaginas <= maxVisiblePages) {
      for (let i = 1; i <= totalPaginas; i++) {
        pages.push(i);
      }
    } else {
      if (paginaAtual <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPaginas);
      } else if (paginaAtual >= totalPaginas - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPaginas - 3; i <= totalPaginas; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = paginaAtual - 1; i <= paginaAtual + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPaginas);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <Button
        onClick={() => onPageChange(paginaAtual - 1)}
        disabled={paginaAtual === 1}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 h-10 px-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-gray-600 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Anterior</span>
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <div key={`ellipsis-${index}`} className="px-2">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </div>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === paginaAtual;

          return (
            <Button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={`h-10 w-10 p-0 rounded-xl font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105 border-0"
                  : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 hover:scale-105"
              }`}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        onClick={() => onPageChange(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 h-10 px-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-gray-600 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <span className="hidden sm:inline">Próxima</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
