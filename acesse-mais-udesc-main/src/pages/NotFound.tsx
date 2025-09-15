import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-surface px-4">
      <Card className="card-accessible w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 rounded-full bg-warning/10 p-6 w-20 h-20 flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-warning" aria-hidden="true" />
          </div>
          
          <CardTitle className="text-2xl font-bold text-foreground">
            Página não encontrada
          </CardTitle>
          
          <p className="text-sm text-muted-foreground mt-2">
            A página que você está procurando não existe ou foi movida.
          </p>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">
              <strong>Rota solicitada:</strong> {location.pathname}
            </p>
          </div>
          
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              asChild
              variant="default"
              className="btn-primary"
            >
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" aria-hidden="true" />
                Voltar ao Início
                <span className="sr-only">Ir para página inicial do Librando</span>
              </Link>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
              aria-label="Voltar à página anterior"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Página Anterior
            </Button>
          </div>

          <div className="text-xs text-muted-foreground pt-2 border-t border-border">
            <p>
              Se você acredita que isso é um erro, entre em contato com o suporte da{" "}
              <strong>UDESC CCT</strong>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
