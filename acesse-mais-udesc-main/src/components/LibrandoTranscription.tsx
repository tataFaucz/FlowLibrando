import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LibrandoTranscriptionProps {
  transcript: string;
  isListening: boolean;
  finalTranscript: string[];
}

export function LibrandoTranscription({ 
  transcript, 
  isListening, 
  finalTranscript 
}: LibrandoTranscriptionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript, finalTranscript]);

  const handleCopy = async () => {
    const fullText = [...finalTranscript, transcript].join(' ').trim();
    if (fullText) {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasContent = finalTranscript.length > 0 || transcript.trim() !== '';

  return (
    <section className="w-full" aria-labelledby="transcription-title">
      <Card className="card-accessible h-96 border-2 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle id="transcription-title" className="flex items-center gap-2 text-lg">
              <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
              Transcrição de Fala
            </CardTitle>
            
            <div className="flex items-center gap-2">
              {hasContent && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 px-2"
                  aria-label="Copiar texto transcrito"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">{copied ? "Texto copiado" : "Copiar texto"}</span>
                </Button>
              )}
              
              <Badge 
                variant={isListening ? "destructive" : "secondary"}
                className="animate-fade-in"
              >
                <span className={`mr-1 h-2 w-2 rounded-full ${
                  isListening ? 'bg-red-500 animate-pulse' : 'bg-muted-foreground'
                }`} aria-hidden="true"></span>
                {isListening ? "Ouvindo..." : "Pausado"}
                <span className="sr-only">
                  Status do microfone: {isListening ? "ativo" : "inativo"}
                </span>
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="h-full pb-4">
          <ScrollArea 
            className="h-full w-full rounded-md border bg-background/50 p-4"
            ref={scrollRef}
          >
            <div 
              className="space-y-3 text-foreground"
              role="log" 
              aria-live="polite" 
              aria-label="Transcrição de fala em tempo real"
            >
              {finalTranscript.length === 0 && !transcript && (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" aria-hidden="true" />
                  <p className="text-sm">
                    Clique no botão do microfone para começar a transcrição
                  </p>
                  <p className="text-xs mt-1 opacity-75">
                    Clique nos textos transcritos para traduzir com VLibras
                  </p>
                </div>
              )}
              
              {finalTranscript.map((sentence, index) => (
                <div 
                  key={index}
                  className="group animate-fade-in rounded bg-muted/30 p-3 text-sm leading-relaxed cursor-pointer hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20"
                  onClick={() => {
                    // Enviar texto para VLibras
                    if (window.VLibras && window.VLibras.Api) {
                      window.VLibras.Api.translate(sentence);
                    }
                  }}
                  title="Clique para traduzir com VLibras"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (window.VLibras && window.VLibras.Api) {
                        window.VLibras.Api.translate(sentence);
                      }
                    }
                  }}
                  aria-label={`Texto transcrito: ${sentence}. Clique para traduzir em Libras`}
                >
                  {sentence}
                  <span className="text-xs text-muted-foreground ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    👆 Clique para Libras
                  </span>
                </div>
              ))}
              
              {transcript && (
                <div className="animate-fade-in rounded bg-primary/10 p-3 text-sm leading-relaxed border border-primary/20">
                  {transcript}
                  <span className="ml-1 inline-block h-3 w-0.5 animate-pulse bg-primary" aria-hidden="true"></span>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {isListening && (
            <div className="mt-2 text-xs text-muted-foreground">
              <p>💡 Fale claramente e pausas serão interpretadas como fim de frase</p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}