export interface ItemCesta {
  id: number;
  nome: string;
  quantidade: string;
}

export interface CestaData {
  id: number;
  dataEntrega: string;
  status: 'Em Separação' | 'Entregue' | 'Cancelada'; 
  itens: ItemCesta[];
}

export const cestaMock: CestaData = {
  id: 1,
  dataEntrega: "06/12/2025",
  status: "Em Separação",
  itens: [
    { id: 1, nome: "Alface Crespa", quantidade: "2 maços" },
    { id: 2, nome: "Tomate Cereja", quantidade: "500g" },
    { id: 3, nome: "Macaxeira", quantidade: "1kg" },
    { id: 4, nome: "Coentro", quantidade: "1 maço" }
  ]
};