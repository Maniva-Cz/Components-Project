export interface RegistroProducao {
  id: number;
  produto: string;
  quantidade: string;
  dataColheita: string;
}

export const producaoMock: RegistroProducao[] = [
  { id: 1, produto: "Alface Americana", quantidade: "50 cabeças", dataColheita: "03/12/2025" },
  { id: 2, produto: "Tomate", quantidade: "10 kg", dataColheita: "03/12/2025" },
];