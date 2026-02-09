import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import TabelaProducao from './tabelaProducao';
import '@testing-library/jest-dom';

const mockProducao = [
  { 
    id: 1, 
    produto: 'Tomate', 
    quantidade: '50 kg',
    status: 'Colhido',
    dataColheita: '2023-10-15'
  },
  { 
    id: 2, 
    produto: 'Alface', 
    quantidade: '30 maços',
    status: 'Em Crescimento',
    dataColheita: '2023-11-01'
  }
];

describe('Componente TabelaProducao', () => {

  // Teste 1: Cabeçalhos
  it('deve renderizar os cabeçalhos da tabela corretamente', () => {
    render(<TabelaProducao dadosIniciais={mockProducao} />);
    expect(screen.getByText('Produto')).toBeInTheDocument();
    expect(screen.getByText('Qtd')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
  });

  // Teste 2: Dados nas linhas
  it('deve exibir os dados dos produtos nas linhas', () => {
    render(<TabelaProducao dadosIniciais={mockProducao} />);
    expect(screen.getByText('Tomate')).toBeInTheDocument();
    expect(screen.getByText('50 kg')).toBeInTheDocument();
    expect(screen.getByText('2023-10-15')).toBeInTheDocument();
  });

  // Teste 3: Quantidade de linhas
  it('deve renderizar uma linha para cada item', () => {
    render(<TabelaProducao dadosIniciais={mockProducao} />);
    // Verifica se "Tomate" e "Alface" estão presentes
    expect(screen.getByText('Tomate')).toBeInTheDocument();
    expect(screen.getByText('Alface')).toBeInTheDocument();
  });

  // Teste 4: Renderização Geral (Container)
  it('deve renderizar a tabela sem erros', () => {
    const { container } = render(<TabelaProducao dadosIniciais={mockProducao} />);
    expect(container).toBeInTheDocument();
  });

  // Teste 5: Área de Adicionar (Input e Botão)
  it('deve exibir o campo de entrada e o botão de adicionar', () => {
    render(<TabelaProducao dadosIniciais={mockProducao} />);
    
    const input = screen.getByPlaceholderText(/Nome do produto/i);
    expect(input).toBeInTheDocument();

    const botao = screen.getByRole('button', { name: /\+ Adicionar/i });
    expect(botao).toBeInTheDocument();
  });
});