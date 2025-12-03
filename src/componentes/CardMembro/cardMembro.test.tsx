import { render, screen, fireEvent } from '@testing-library/react';
import CardMembro from './cardMembro';
import { membroMock } from './membros.mock';
import { describe, it, expect } from 'vitest';

describe('Componente CardMembro', () => {
  // Teste 1: Renderização correta
  it('deve exibir o nome e o status do membro', () => {
    render(<CardMembro dados={membroMock} />);
    
    expect(screen.getByText(membroMock.nome)).toBeInTheDocument();
    expect(screen.getByText(membroMock.status)).toBeInTheDocument();
  });

  // Teste 2: Aprovação de membro
  it('deve mudar o status para "Ativo" ao clicar em Aprovar', () => {
    // Usando o mock padrão que é "Pendente"
    render(<CardMembro dados={membroMock} />);
    
    const botaoAprovar = screen.getByText('Aprovar');
    fireEvent.click(botaoAprovar);

    // Verifica se o texto mudou para Ativo
    expect(screen.getByText('Ativo')).toBeInTheDocument();
    // Verifica se o botão sumiu 
    expect(screen.queryByText('Aprovar')).not.toBeInTheDocument();
  });
});