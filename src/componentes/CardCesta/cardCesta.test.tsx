import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../utils/test-utils';
import CardCesta from './cardCesta';
import '@testing-library/jest-dom';

describe('Componente CardCesta', () => {
  const mockProps = {
    id: 1,
    nome: 'Produto Teste',
    preco: 10.00
  };

  // Teste 1: Renderização básica
  it('deve renderizar o nome do produto corretamente', () => {
    render(<CardCesta {...mockProps} />);
    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
  });

  // Teste 2: Formatação de preço
  it('deve exibir o preço formatado com R$', () => {
    render(<CardCesta {...mockProps} />);
    expect(screen.getByText(/R\$\s?10.00/)).toBeInTheDocument();
  });

  // Teste 3: Botão inicial
  it('deve exibir o botão de "Adicionar" inicialmente', () => {
    render(<CardCesta {...mockProps} />);
    const botao = screen.getByRole('button');
    expect(botao).toHaveTextContent('Adicionar');

    // Não prende em HEX específico; só valida que existe um background definido
    expect((botao as HTMLButtonElement).style.background).not.toBe('');
  });

  // Teste 4: Interação (Redux)
  it('deve mudar o texto do botão para "Remover" ao clicar', () => {
    render(<CardCesta {...mockProps} />);
    const botao = screen.getByRole('button', { name: /Adicionar/i });

    fireEvent.click(botao);

    expect(botao).toHaveTextContent('Remover');
  });

  // Teste 5: Estilo condicional (verifica background conforme estado, sem assumir estado inicial)
  it('deve mudar o estilo do botão quando o item está na cesta', () => {
    render(<CardCesta {...mockProps} />);
    const botao = screen.getByRole('button') as HTMLButtonElement;

    const textoAntes = botao.textContent; // "Adicionar" ou "Remover"
    const bgAntes = getComputedStyle(botao).backgroundColor;

    fireEvent.click(botao);

    const textoDepois = botao.textContent; // deve inverter
    const bgDepois = getComputedStyle(botao).backgroundColor;

    // texto deve mudar (Adicionar <-> Remover)
    expect(textoDepois).not.toBe(textoAntes);

    // estilo deve mudar também
    expect(bgDepois).not.toBe(bgAntes);
  });

});
