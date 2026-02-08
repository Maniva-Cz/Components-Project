import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import CardMembro from './cardMembro';
import '@testing-library/jest-dom';

// Mock 1: Agricultor Ativo
const mockMembroAtivo = {
  id: 1,
  nome: 'Maria Silva',
  tipo: 'Agricultor' as const,
  status: 'Ativo' as const,
  fotoUrl: 'https://via.placeholder.com/150'
};

// Mock 2: Co-agricultor Pendente
const mockMembroPendente = {
  id: 2,
  nome: 'João Consumidor',
  tipo: 'Co-agricultor' as const,
  status: 'Pendente' as const
};

describe('Componente CardMembro', () => {

  // Teste 1: Renderização do Nome
  it('deve renderizar o nome do membro corretamente', () => {
    render(<CardMembro dados={mockMembroAtivo} />);
    expect(screen.getByText('Maria Silva')).toBeInTheDocument();
  });

  // Teste 2: Renderização do Tipo
  it('deve exibir o tipo de associação (Agricultor)', () => {
    render(<CardMembro dados={mockMembroAtivo} />);
    expect(screen.getByText(/Agricultor/)).toBeInTheDocument();
  });

  // Teste 3: Status Ativo
  it('deve mostrar status Ativo', () => {
    render(<CardMembro dados={mockMembroAtivo} />);
    expect(screen.getByText(/Ativo/)).toBeInTheDocument();
  });

  // Teste 4: Status Pendente
  it('deve mostrar status Pendente para co-agricultores novos', () => {
    render(<CardMembro dados={mockMembroPendente} />);
    expect(screen.getByText(/Pendente/)).toBeInTheDocument();
  });

  // Teste 5: Renderização da Imagem
  it('deve renderizar a imagem de perfil quando fornecida', () => {
    render(<CardMembro dados={mockMembroAtivo} />);
    const imagem = screen.getByRole('img');
    expect(imagem).toHaveAttribute('src', mockMembroAtivo.fotoUrl);
    expect(imagem).toHaveAttribute('alt', mockMembroAtivo.nome);
  });
});