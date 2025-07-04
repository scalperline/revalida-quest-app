interface QuestionContentProps {
  enunciado: string;
  image?: string;
}

export function QuestionContent({ enunciado, image }: QuestionContentProps) {
  return (
    <>
      {/* Question Text */}
      <div className="mb-6">
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: enunciado }}
          />
        </div>
      </div>

      {/* Question Image if exists */}
      {image && (
        <div className="mb-6 text-center">
          <img 
            src={image} 
            alt="Imagem da questão" 
            className="max-w-full h-auto rounded-lg shadow-md mx-auto"
            onError={(e) => {
              console.error('Erro ao carregar imagem:', image);
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </>
  );
}