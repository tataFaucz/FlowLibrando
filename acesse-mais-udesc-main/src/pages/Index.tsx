// Update this page (the content is just a fallback if you fail to update the page)

import { useState, useEffect } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useToast } from "@/hooks/use-toast";

import { LibrandoHeader } from "@/components/LibrandoHeader";
import { LibrandoTranscription } from "@/components/LibrandoTranscription";
import { LibrandoStatus } from "@/components/LibrandoStatus";
import { LibrandoFooter } from "@/components/LibrandoFooter";

const Index = () => {
  const { toast } = useToast();
  const {
    isListening,
    transcript,
    finalTranscript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
    error
  } = useSpeechRecognition();

  // Atualizar toast quando há nova transcrição final
  useEffect(() => {
    if (finalTranscript.length > 0) {
      const latestText = finalTranscript[finalTranscript.length - 1];
      
      // Toast de feedback para usuário
      toast({
        title: "Texto transcrito",
        description: "Clique no texto para traduzir com VLibras",
        duration: 3000,
      });
    }
  }, [finalTranscript, toast]);

  // Gerenciar início/parada da gravação
  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Retry em caso de erro
  const handleRetry = () => {
    if (isListening) {
      stopListening();
    }
    setTimeout(() => {
      startListening();
    }, 500);
  };

  // Reset completo
  const handleReset = () => {
    resetTranscript();
    toast({
      title: "Sistema reiniciado",
      description: "Todas as transcrições foram limpas.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Cabeçalho com controles principais */}
      <LibrandoHeader 
        isListening={isListening} 
        onToggleListening={handleToggleListening}
      />

      {/* Área principal da aplicação */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Status e alertas do sistema */}
        <LibrandoStatus
          isListening={isListening}
          error={error}
          isSupported={isSupported}
          onRetry={handleRetry}
          onReset={handleReset}
        />

        {/* Área de transcrição */}
        <div className="max-w-4xl mx-auto">
          <LibrandoTranscription
            transcript={transcript}
            isListening={isListening}
            finalTranscript={finalTranscript}
          />
        </div>

        {/* Informações adicionais para usuários */}
        {isSupported && !error && (
          <div className="rounded-lg bg-card/50 backdrop-blur-sm border p-6">
            <h2 className="text-lg font-semibold mb-3 text-primary">
              Como usar o FlowLibrando
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-medium mb-1">Clique no Microfone</h3>
                <p className="text-sm text-muted-foreground">
                  Autorize o uso do microfone e clique para iniciar
                </p>
              </div>
              <div className="text-center">
                <div className="rounded-full bg-secondary/10 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-secondary font-bold">2</span>
                </div>
                <h3 className="font-medium mb-1">Fale Naturalmente</h3>
                <p className="text-sm text-muted-foreground">
                  Sua fala será transcrita em tempo real
                </p>
              </div>
              <div className="text-center">
                <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-accent font-bold">3</span>
                </div>
                <h3 className="font-medium mb-1">Clique para Libras</h3>
                <p className="text-sm text-muted-foreground">
                  Clique no texto transcrito para traduzir com VLibras
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Rodapé com informações institucionais */}
      <LibrandoFooter />
    </div>
  );
};

export default Index;
