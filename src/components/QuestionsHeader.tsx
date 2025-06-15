
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
  tipoProva: string;
  setTipoProva: (tipo: string) => void;
}

// Adicionado 2012 na lista de anos disponíveis
const ANOS_PROVA = [
  { value: 2011, label: "Revalida 2011" },
  { value: 2012, label: "Revalida 2012" },
];

const TIPOS_PROVA = [
  { value: "objetiva", label: "Prova Objetiva" },
  { value: "discursiva", label: "Prova Discursiva" },
];

export function QuestionsHeader({
  anoSelecionado,
  setAnoSelecionado,
  totalQuestoes,
  tipoProva,
  setTipoProva,
}: QuestionsHeaderProps) {
  return (
    <>
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-2 gap-2 max-w-6xl mx-auto w-full relative">
        <Link to="/" className="absolute left-0 top-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border-2 border-primary shadow-lg hover:border-primary/70 transition"
          >
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

      {/* Filtro por ano e tipo de prova */}
      <div className="max-w-6xl mx-auto w-full p-6 rounded-2xl border border-muted bg-card shadow flex flex-col gap-6 mb-8">
        <div className="flex flex-col gap-1 w-full md:flex-row md:items-end md:gap-8">
          <div className="flex-1">
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
                  <SelectItem key={a.value} value={a.value.toString()}>
                    {a.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="mb-1 text-lg font-semibold">Tipo de prova</label>
            <Select
              value={tipoProva}
              onValueChange={v => setTipoProva(v)}
            >
              <SelectTrigger className="w-full h-12 rounded-lg bg-background border border-muted">
                <SelectValue placeholder="Selecione o tipo de prova" />
              </SelectTrigger>
              <SelectContent>
                {TIPOS_PROVA.map(tp => (
                  <SelectItem key={tp.value} value={tp.value}>
                    {tp.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}

