import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  XCircle, 
  RefreshCw,
  Settings
} from "lucide-react";

interface LibrandoStatusProps {
  isListening: boolean;
  error: string | null;
  isSupported: boolean;
  onRetry?: () => void;
  onReset?: () => void;
}

export function LibrandoStatus({ 
  isListening, 
  error, 
  isSupported, 
  onRetry, 
  onReset 
}: LibrandoStatusProps) {
  
  // Status de erro crítico
  if (!isSupported) {
    return (
      <Alert variant="destructive" className="animate-fade-in">
        <XCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>
            <strong>Navegador incompatível:</strong> Este navegador não suporta reconhecimento de fala. 
            Use Chrome, Edge ou Safari para melhor experiência.
          </span>
        </AlertDescription>
      </Alert>
    );
  }

  // Status de erro recuperável
  if (error) {
    return (
      <Alert variant="destructive" className="animate-fade-in">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between w-full">
          <span>
            <strong>Erro:</strong> {error}
          </span>
          <div className="flex items-center gap-2 ml-4">
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="h-7 px-2"
                aria-label="Tentar novamente"
              >
                <RefreshCw className="h-3 w-3 mr-1" aria-hidden="true" />
                Tentar novamente
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  // Status operacional
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-muted/30 p-4 animate-fade-in">
      <div className="flex items-center gap-3">
        {/* Indicador visual de status */}
        <div className="flex items-center gap-2">
          {isListening ? (
            <CheckCircle className="h-5 w-5 text-success animate-pulse" aria-hidden="true" />
          ) : (
            <Info className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          )}
          
          <div>
            <p className="text-sm font-medium">
              {isListening ? "Sistema Ativo" : "Sistema Pronto"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isListening 
                ? "Capturando e transcrevendo sua fala..." 
                : "Clique no microfone para começar"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Status badges e controles */}
      <div className="flex items-center gap-2">
        {/* Badge de status do microfone */}
        <Badge variant={isListening ? "success" : "secondary"} className="animate-fade-in">
          <span 
            className={`mr-1 h-2 w-2 rounded-full ${
              isListening ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
            }`} 
            aria-hidden="true"
          ></span>
          {isListening ? "Gravando" : "Inativo"}
          <span className="sr-only">
            Microfone {isListening ? "ativo" : "inativo"}
          </span>
        </Badge>

        {/* Badge de qualidade/status da rede */}
        <Badge variant="outline" className="text-xs">
          <span className="mr-1 h-2 w-2 rounded-full bg-green-400" aria-hidden="true"></span>
          Online
          <span className="sr-only">Conexão estável</span>
        </Badge>

        {/* Botão de reset (apenas quando não está gravando) */}
        {!isListening && onReset && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="h-7 px-2"
            aria-label="Limpar transcrições"
          >
            <Settings className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">Configurações e limpeza</span>
          </Button>
        )}
      </div>
    </div>
  );
}