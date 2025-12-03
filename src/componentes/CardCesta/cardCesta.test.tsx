import { render, screen } from '@testing-library/react';
import CardCesta from './cardCesta';
import { cestaMock } from './cesta.mock';
import { describe, it, expect } from 'vitest';

describe('Componente CardCesta', () => {
  // Teste 1: Verifica se renderiza as informações básicas
  it('deve exibir o título e a data de entrega correta', () => {
    render(<CardCesta dados={cestaMock} />);
    
    expect(screen.getByText('Cesta da Semana')).toBeInTheDocument();
    expect(screen.getByText(cestaMock.dataEntrega)).toBeInTheDocument();
  });

  // Teste 2: Verifica se a lista de itens foi renderizada
  it('deve exibir a quantidade correta de itens da lista', () => {
    render(<CardCesta dados={cestaMock} />);
    
    // Verifica se existem 4 elementos de lista
    const itens = screen.getAllByRole('listitem');
    expect(itens).toHaveLength(4); // O mock tem 4 itens
  });
});