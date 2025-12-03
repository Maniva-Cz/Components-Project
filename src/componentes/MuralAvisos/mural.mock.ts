export interface Postagem {
  id: number;
  autor: string;
  data: string;
  titulo: string;
  mensagem: string;
  tipo: 'Oferta' | 'Ajuda' | 'Geral';
}

export const muralMock: Postagem[] = [
  {
    id: 1,
    autor: "João (Agricultor)",
    data: "03/12/2025",
    titulo: "Excedente de Abóbora",
    mensagem: "Temos 5kg de abóbora extra. Alguém tem interesse em trocar por macaxeira?",
    tipo: 'Oferta'
  },
  {
    id: 2,
    autor: "Maria (Co-agricultora)",
    data: "02/12/2025",
    titulo: "Mutirão de Colheita",
    mensagem: "Precisamos de voluntários para o próximo sábado de manhã.",
    tipo: 'Ajuda'
  },
  {
    id: 3,
    autor: "Coordenação",
    data: "01/12/2025",
    titulo: "Reunião Mensal",
    mensagem: "Lembrete da reunião de alinhamento na próxima quarta-feira.",
    tipo: 'Geral'
  }
];