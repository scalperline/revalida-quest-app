
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#3182ce", "#4FD1C5", "#68D391", "#F6AD55", "#F56565"];

type Dado = {
  nome: string;
  valor: number;
};

export default function PerformanceChart({ dados }: { dados: Dado[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={dados}
          dataKey="valor"
          nameKey="nome"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label
        >
          {dados.map((entry, idx) => (
            <Cell key={entry.nome} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
