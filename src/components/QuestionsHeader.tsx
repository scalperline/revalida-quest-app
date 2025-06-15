
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface QuestionsHeaderProps {
  anoSelecionado: number;
  setAnoSelecionado: (value: number) => void;
  totalQuestoes: number;
}

const ANOS_PROVA = [
  { value: 2011, label: "Revalida 2011" },
];

export function QuestionsHeader({
  anoSelecionado,
  setAnoSelecionado,
  totalQuestoes,
}: QuestionsHeaderProps) {
  return (
    <>
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-2 gap-2 max-w-6xl mx-auto w-full relative">
        <Link to="/" className="absolute left-0 top-1">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-4xl font-extrabold tracking-tight text-foreground mx-auto">
          Banco de Questões
        </h2>
        <span className="border rounded-full px-4 py-1 text-base font-semibold text-foreground bg-background shadow-md border-muted/60">
          {totalQuestoes} questões
        </span>
      </div>

      {/* Filtro por ano */}
      <div className="max-w-6xl mx-auto w-full p-6 rounded-2xl border border-muted bg-card shadow flex flex-col gap-6 mb-8">
        <div className="flex flex-col gap-1 w-full">
          <label className="mb-1 text-lg font-semibold">Ano da prova</label>
          <Select
            value={anoSelecionado.toString()}
            onValueChange={v => setAnoSelecionado(Number(v))}
          >
            <SelectTrigger className="w-full h-12 rounded-lg bg-background border border-muted">
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              {ANOS_PROVA.map(a => (
                <SelectItem key={a.value} value={a.value.toString()}>{a.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
