
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface StatsResetDialogProps {
  onReset: () => void;
}

export function StatsResetDialog({ onReset }: StatsResetDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reiniciar Estatísticas
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reiniciar Estatísticas de Desempenho</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação irá apagar todas as suas estatísticas de questões e simulados, 
            mas manterá seu nível, XP e conquistas. Esta ação não pode ser desfeita.
            <br /><br />
            <strong>Será resetado:</strong>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>Total de questões respondidas</li>
              <li>Taxa de acertos por área</li>
              <li>Simulados concluídos</li>
              <li>Gráfico de desempenho</li>
            </ul>
            <br />
            <strong>Será mantido:</strong>
            <ul className="list-disc list-inside text-sm">
              <li>Nível atual e XP</li>
              <li>Conquistas desbloqueadas</li>
              <li>Streak de estudos</li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onReset}
            className="bg-red-600 hover:bg-red-700"
          >
            Confirmar Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
