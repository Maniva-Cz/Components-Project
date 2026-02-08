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
    // O regex ignora espaços em branco rígidos (&nbsp;)
    expect(screen.getByText(/R\$\s?10.00/)).toBeInTheDocument();
  });

  // Teste 3: Botão inicial
  it('deve exibir o botão de "Adicionar" inicialmente', () => {
    render(<CardCesta {...mockProps} />);
    const botao = screen.getByRole('button');
    expect(botao).toHaveTextContent('Adicionar');
    expect(botao).toHaveStyle({ backgroundColor: '#3498db' });
  });

  // Teste 4: Interação (Redux)
  it('deve mudar o texto do botão para "Remover" ao clicar', () => {
    render(<CardCesta {...mockProps} />);
    const botao = screen.getByRole('button', { name: /Adicionar/i });
    
    // Simula o clique
    fireEvent.click(botao);
    
    expect(botao).toHaveTextContent('Remover');
  });

  // Teste 5: Estilo condicional
  it('deve mudar a cor do botão quando o item está na cesta', () => {
    render(<CardCesta {...mockProps} />);
    const botao = screen.getByRole('button');
    
    if (botao.textContent === 'Adicionar') {
        fireEvent.click(botao);
    }
    
    expect(botao).toHaveStyle({ backgroundColor: '#e74c3c' });
  });
});