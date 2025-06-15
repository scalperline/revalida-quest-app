
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface QuestionsHeaderProps {
  filtro: string;
  setFiltro: (filter: string) => void;
  especialidade: string;
  setEspecialidade: (value: string) => void;
  anoSelecionado: number;
  setAnoSelecionado: (value: number) => void;
  // temaSelecionado: string;
  // setTemaSelecionado: (value: string) => void;
  totalQuestoes: number;
  abaSelecionada: "todas" | "favoritas" | "erradas" | "acertadas";
  setAbaSelecionada: (key: "todas" | "favoritas" | "erradas" | "acertadas") => void;
}

const ANOS_PROVA = [
  { value: 2011, label: "Revalida 2011" },
];

const ESPECIALIDADES = [
  { value: "clinica-medica", label: "Clínica Médica" },
  { value: "cirurgia-geral", label: "Cirurgia Geral" },
  { value: "ginecologia-obstetricia", label: "Ginecologia e Obstetrícia" },
  { value: "pediatria", label: "Pediatria" },
  { value: "medicina-preventiva", label: "Medicina Preventiva" },
];

// const TEMAS = [
//   { value: "tema1", label: "Tema 1" },
//   { value: "tema2", label: "Tema 2" },
// ];

const abas = [
  { key: "todas", label: "Todas" },
  { key: "favoritas", label: "Favoritas" },
  { key: "erradas", label: "Erradas" },
  { key: "acertadas", label: "Acertadas" },
];

export function QuestionsHeader({
  filtro,
  setFiltro,
  especialidade,
  setEspecialidade,
  anoSelecionado,
  setAnoSelecionado,
  // temaSelecionado,
  // setTemaSelecionado,
  totalQuestoes,
  abaSelecionada,
  setAbaSelecionada
}: QuestionsHeaderProps) {
  return (
    <>
      {/* Linha superior: voltar + Título + contador */}
      <div className="flex justify-between items-center mb-2 gap-2 max-w-6xl mx-auto w-full relative">
        {/* Botão Voltar */}
        <Link to="/" className="absolute left-0 top-1">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-4xl font-extrabold tracking-tight text-foreground mx-auto">
          Banco de Questões
        </h2>
        <span className="border rounded-full px-4 py-1 text-base font-semibold text-foreground bg-background shadow-md border-muted/60">
          {totalQuestoes} questões encontradas
        </span>
      </div>

      {/* Caixa de filtros (busca, especialidade, ano) - retirado campo de tema */}
      <div className="max-w-6xl mx-auto w-full p-6 rounded-2xl border border-muted bg-card shadow flex flex-col gap-6 mb-8">
        <div>
          <Label className="mb-1 text-lg font-semibold">Buscar</Label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-2.5 text-muted-foreground">
              <Search size={20} />
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 h-12 rounded-lg bg-background border border-muted text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="Buscar questões..."
              value={filtro}
              onChange={e => setFiltro(e.target.value)}
              type="search"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Especialidade */}
          <div className="flex flex-col gap-1">
            <Label className="font-semibold">Especialidade</Label>
            <Select
              value={especialidade}
              onValueChange={v => setEspecialidade(v)}
            >
              <SelectTrigger className="w-full h-12 rounded-lg bg-background border border-muted">
                <SelectValue placeholder="Selecione especialidade" />
              </SelectTrigger>
              <SelectContent>
                {ESPECIALIDADES.map(e => (
                  <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Ano */}
          <div className="flex flex-col gap-1">
            <Label className="font-semibold">Ano</Label>
            <Select
              value={anoSelecionado.toString()}
              onValueChange={v => setAnoSelecionado(Number(v))}
            >
              <SelectTrigger className="w-full h-12 rounded-lg bg-background border border-muted">
                <SelectValue placeholder="Selecione ano" />
              </SelectTrigger>
              <SelectContent>
                {ANOS_PROVA.map(a => (
                  <SelectItem key={a.value} value={a.value.toString()}>{a.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Abas de filtro */}
      <div className="max-w-6xl mx-auto w-full flex gap-1 md:gap-3 mb-6">
        {abas.map(tab => (
          <Button
            key={tab.key}
            variant={abaSelecionada === tab.key ? "secondary" : "ghost"}
            className={`rounded-xl px-5 py-2 font-semibold text-base border 
              ${abaSelecionada === tab.key ? "bg-secondary text-foreground border-ring shadow" : "bg-card text-muted-foreground border-border"}`}
            onClick={() => setAbaSelecionada(tab.key as typeof abaSelecionada)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </>
  );
}
