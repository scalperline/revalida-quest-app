
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Book, Timer, FileText } from "lucide-react";

const actions = [
  {
    label: "Banco de Questões",
    to: "/questoes",
    icon: Book,
    desc: "Veja todas questões do Revalida, filtre por ano, área, resolva e confira o gabarito.",
  },
  {
    label: "Simulado",
    to: "/simulado",
    icon: Timer,
    desc: "Faça um simulado com tempo real de prova e veja seu resultado na hora!",
  },
  {
    label: "Estatísticas",
    to: "/estatisticas",
    icon: FileText,
    desc: "Acompanhe seu progresso por área do conhecimento com gráficos.",
  },
];

export default function Index() {
  return (
    <div className="w-full min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-5xl py-10">
        <h1 className="text-4xl font-bold mb-2">Bem-vindo ao RevalidaQuest 👩‍⚕️👨‍⚕️</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Prepare-se com todas as questões oficiais do Revalida INEP de todas as edições! Acesse o banco de questões, faça simulados cronometrados e acompanhe sua evolução por gráficos de performance.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {actions.map(({ label, to, desc, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="bg-card border rounded-xl shadow p-6 group flex flex-col gap-2 hover:bg-primary/5 transition"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={28} className="text-primary group-hover:scale-110 transition" />
                <span className="text-xl font-medium">{label}</span>
              </div>
              <span className="text-gray-700 text-base">{desc}</span>
            </Link>
          ))}
        </div>
        <div className="mt-14 text-center text-sm text-muted-foreground">
          RevalidaQuest é um projeto independente e não possui vínculo com o INEP.<br/>
          Para uso em estudos pessoais/demonstração. Questões meramente ilustrativas neste MVP.
        </div>
      </div>
    </div>
  );
}
