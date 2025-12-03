import { render, screen, fireEvent } from '@testing-library/react';
import TabelaProducao from './tabelaProducao';
import { producaoMock } from './producao.mock';
import { describe, it, expect } from 'vitest';

describe('Componente TabelaProducao', () => {
  // Teste 1: Renderização inicial
  it('deve renderizar a tabela com os dados iniciais', () => {
    render(<TabelaProducao dadosIniciais={producaoMock} />);
    
    // Verifica se o produto do mock está na tela
    expect(screen.getByText(producaoMock[0].produto)).toBeInTheDocument();
  });

  // Teste 2: Interação de adicionar novo item
  it('deve adicionar um novo item à tabela ao clicar no botão', () => {
    render(<TabelaProducao dadosIniciais={producaoMock} />);
    
    // 1. Encontra o input e o botão
    const input = screen.getByPlaceholderText('Nome do produto (ex: Batata)');
    const botao = screen.getByText('+ Adicionar');

    // 2. Digita no input e clica
    fireEvent.change(input, { target: { value: 'Cenoura Nova' } });
    fireEvent.click(botao);

    // 3. Verifica se apareceu na tabela
    expect(screen.getByText('Cenoura Nova')).toBeInTheDocument();
  });
});