// Declarações de tipo para o VLibras Widget
declare global {
  interface Window {
    VLibras: {
      Widget: new (url: string) => void;
      Api?: {
        translate: (text: string) => void;
      };
    };
  }
}

export {};