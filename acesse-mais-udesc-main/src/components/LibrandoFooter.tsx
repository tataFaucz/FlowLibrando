import { Heart, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LibrandoFooter() {
  return (
    <footer className="w-full bg-muted/30 border-t mt-8" role="contentinfo">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* Informações do projeto */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              <strong>FlowLibrando</strong> - Tecnologia Assistiva para Inclusão Digital
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Desenvolvido com {" "}
              <Heart className="inline h-3 w-3 text-red-500" aria-label="amor" /> 
              {" "} seguindo normas WCAG 2.1 AA de acessibilidade
            </p>
          </div>

          {/* Links e créditos */}
          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground text-center">
              <p><strong>UDESC CCT</strong></p>
              <p>Centro de Ciências Tecnológicas</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                aria-label="Ver projeto no GitHub"
                onClick={() => window.open("https://github.com/tataFaucz/librando", "_blank", "noopener,noreferrer")}
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                aria-label="Mais sobre VLibras"
                onClick={() => window.open("https://www.vlibras.gov.br/", "_blank", "noopener,noreferrer")}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        {/* Notas de acessibilidade */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              <strong>Acessibilidade:</strong> Esta aplicação foi desenvolvida seguindo as Diretrizes de Acessibilidade para Conteúdo Web (WCAG) 2.1 nível AA.
            </p>
            <p>
              <strong>Navegação:</strong> Use Tab para navegar, Enter/Espaço para ativar botões, e Esc para fechar modais.
            </p>
            <p>
              <strong>Suporte:</strong> Compatível com leitores de tela, navegação por teclado e alto contraste.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}