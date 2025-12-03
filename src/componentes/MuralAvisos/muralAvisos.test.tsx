import { render, screen } from '@testing-library/react';
import MuralAvisos from './muralAvisos';
import { muralMock } from './mural.mock';
import { describe, it, expect } from 'vitest';

describe('Componente MuralAvisos', () => {
  // Teste 1: Verifica comportamento quando há avisos
  it('deve renderizar os avisos passados por prop', () => {
    render(<MuralAvisos postagens={muralMock} />);
    
    // Verifica se o título do primeiro post do mock aparece
    expect(screen.getByText(muralMock[0].titulo)).toBeInTheDocument();
  });

  // Teste 2: Verifica o comportamento quando a lista está vazia
  it('deve exibir mensagem de "Nenhum aviso" quando a lista for vazia', () => {
    render(<MuralAvisos postagens={[]} />);
    
    expect(screen.getByText('Nenhum aviso no momento.')).toBeInTheDocument();
  });
});