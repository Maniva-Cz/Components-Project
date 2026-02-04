export interface MembroData {
  id: number;
  nome: string;
  tipo: 'Agricultor' | 'Co-agricultor';
  status: 'Ativo' | 'Pendente';
  fotoUrl?: string;
}

// CORREÇÃO: Transformando o mock em uma lista para que o método map possa iterar
export const membroMock: MembroData[] = [
  {
    id: 1,
    nome: "Ana Silva",
    tipo: "Co-agricultor",
    status: "Pendente",
    fotoUrl: "/perfil.jpg"
  },

  {
    id: 2,
    nome: "João Souza",
    tipo: "Agricultor",
    status: "Ativo"
  }
];