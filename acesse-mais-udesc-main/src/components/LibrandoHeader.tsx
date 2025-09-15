import { Mic, Volume2, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LibrandoHeaderProps {
  isListening: boolean;
  onToggleListening: () => void;
}

export function LibrandoHeader({ isListening, onToggleListening }: LibrandoHeaderProps) {
  return (
    <header className="w-full bg-gradient-primary shadow-lg" role="banner">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* Logo e título */}
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
              <Accessibility className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                FlowLibrando
              </h1>
              <p className="text-sm text-white/80 md:text-base">
                Tradução de Fala para Libras em Tempo Real
              </p>
            </div>
          </div>

          {/* Controles principais */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-white/70 uppercase tracking-wider">
                UDESC CCT
              </p>
              <p className="text-sm text-white/90">
                Tecnologia Assistiva
              </p>
            </div>
            
            <Button
              onClick={onToggleListening}
              size="lg"
              variant={isListening ? "destructive" : "secondary"}
              className={`
                h-12 w-12 rounded-full p-3 shadow-lg transition-all duration-200
                ${isListening 
                  ? "animate-pulse-ring bg-destructive hover:bg-destructive/90" 
                  : "bg-secondary hover:bg-secondary/90"
                }
              `}
              aria-label={isListening ? "Parar gravação de voz" : "Iniciar gravação de voz"}
              aria-pressed={isListening}
            >
              {isListening ? (
                <Volume2 className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Mic className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">
                {isListening ? "Microfone ativo - clique para parar" : "Microfone inativo - clique para iniciar"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}