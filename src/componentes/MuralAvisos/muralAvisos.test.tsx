import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import MuralAvisos from './muralAvisos';
import '@testing-library/jest-dom';

const mockAvisos = [
  {
    id: 1,
    titulo: 'Reunião Geral',
    mensagem: 'Sexta-feira às 18h.',
    autor: 'Presidente',
    data: '2023-11-20',
    tipo: 'Geral' as const
  },
  {
    id: 2,
    titulo: 'Entrega de Cestas',
    mensagem: 'Confirmada para sábado.',
    autor: 'Logística',
    data: '2023-11-21',
    tipo: 'Oferta' as const 
  }
];

describe('Componente MuralAvisos', () => {

  // Teste 1: Renderização da lista
  it('deve renderizar a quantidade correta de avisos', () => {
    render(<MuralAvisos postagens={mockAvisos} />);
    // Verifica se os títulos aparecem (pode ser heading ou texto)
    expect(screen.getByText('Reunião Geral')).toBeInTheDocument();
    expect(screen.getByText('Entrega de Cestas')).toBeInTheDocument();
  });

  // Teste 2: Conteúdo do Texto
  it('deve exibir a mensagem do aviso', () => {
    render(<MuralAvisos postagens={mockAvisos} />);
    expect(screen.getByText('Sexta-feira às 18h.')).toBeInTheDocument();
  });

  // Teste 3: Detalhes (Autor)
  it('deve exibir o autor da postagem', () => {
    render(<MuralAvisos postagens={mockAvisos} />);
    expect(screen.getByText(/Presidente/)).toBeInTheDocument();
  });

  // Teste 4: Lista Vazia
  it('deve exibir mensagem quando não houver avisos', () => {
    render(<MuralAvisos postagens={[]} />);
    // Verifica se aparece o texto de fallback
    expect(screen.getByText(/Nenhum aviso/i)).toBeInTheDocument();
  });

  // Teste 5: Estrutura básica
  it('deve renderizar sem erros', () => {
    const { container } = render(<MuralAvisos postagens={mockAvisos} />);
    expect(container).toBeInTheDocument();
  });
});