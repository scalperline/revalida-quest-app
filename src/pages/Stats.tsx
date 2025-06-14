
import PerformanceChart from "@/components/PerformanceChart";

const DATA_DEMO = [
  { nome: "Clínica", valor: 6 },
  { nome: "Pediatria", valor: 4 },
  { nome: "Cirurgia", valor: 2 },
  { nome: "Preventiva", valor: 3 },
  { nome: "GO", valor: 5 },
];

export default function Stats() {
  const total = DATA_DEMO.reduce((acc, curr) => acc + curr.valor, 0);
  return (
    <div className="max-w-4xl mx-auto pt-10 pb-8 px-3">
      <h2 className="text-2xl font-bold mb-1">Estatísticas e Performance</h2>
      <p className="mb-6 text-muted-foreground text-base">
        Visualize seu desempenho por área do conhecimento (dados fictícios para demonstração).
      </p>
      <div className="w-full bg-card p-6 rounded-xl border shadow mb-7">
        <PerformanceChart dados={DATA_DEMO} />
      </div>
      <div className="text-center text-xl font-semibold text-primary mt-3">
        Total de questões respondidas: {total}
      </div>
    </div>
  );
}
