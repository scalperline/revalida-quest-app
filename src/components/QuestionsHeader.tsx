
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestionsHeaderProps {
  anoSelecionado: number;
  setAnoSelecionado: (ano: number) => void;
  totalQuestoes: number;
  tipoProva?: string;
  setTipoProva?: (tipo: string) => void;
}

export function QuestionsHeader({
  anoSelecionado,
  setAnoSelecionado,
  totalQuestoes,
  tipoProva,
  setTipoProva,
}: QuestionsHeaderProps) {
  return (
    <div className="max-w-6xl mx-auto w-full mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h1 className="text-3xl font-bold text-foreground">
          Questões do Revalida
        </h1>
        <div className="flex items-center gap-4">
          <Select
            onValueChange={(value) => setAnoSelecionado(parseInt(value))}
            defaultValue={anoSelecionado.toString()}
          >
            <SelectTrigger className="w-[180px] bg-card">
              <SelectValue placeholder="Selecione o Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2011">Revalida 2011</SelectItem>
              <SelectItem value="2012">Revalida 2012</SelectItem>
              <SelectItem value="2013">Revalida 2013</SelectItem>
            </SelectContent>
          </Select>
          {anoSelecionado === 2013 && tipoProva && setTipoProva && (
            <Select onValueChange={setTipoProva} defaultValue={tipoProva}>
              <SelectTrigger className="w-[180px] bg-card">
                <SelectValue placeholder="Selecione a Prova" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cinza">Prova Cinza</SelectItem>
                <SelectItem value="Vermelha">Prova Vermelha</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="text-sm text-muted-foreground">
          {totalQuestoes > 0
            ? `Mostrando ${totalQuestoes} questões para os filtros selecionados.`
            : "Nenhuma questão encontrada."}
        </div>
      </div>
    </div>
  );
}
