export interface MembroData {
  id: number;
  nome: string;
  tipo: 'Agricultor' | 'Co-agricultor';
  status: 'Ativo' | 'Pendente';
  fotoUrl?: string; // Opcional
}

export const membroMock: MembroData = {
  id: 1,
  nome: "Ana Silva",
  tipo: "Co-agricultor",
  status: "Pendente",
  fotoUrl: "/perfil.jpg"
};