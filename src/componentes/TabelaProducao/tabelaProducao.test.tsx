import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import TabelaProducao from './tabelaProducao';
import '@testing-library/jest-dom';

const mockProducao = [
  {
    id: 1,
    produto: 'Tomate',
    quantidade: '50 kg',
    dataColheita: '2023-10-15'
  },
  {
    id: 2,
    produto: 'Alface',
    quantidade: '30 maços',
    dataColheita: '2023-11-01'
  }
];

describe('Componente TabelaProducao', () => {
  const onAdicionar = vi.fn();
  const onRemover = vi.fn();

  // Teste 1: Cabeçalhos
  it('deve renderizar os cabeçalhos da tabela corretamente', () => {
    render(
      <TabelaProducao
        registros={mockProducao}
        onAdicionar={onAdicionar}
        onRemover={onRemover}
      />
    );

    expect(screen.getByText('Produto')).toBeInTheDocument();
    expect(screen.getByText('Qtd')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  // Teste 2: Dados nas linhas
  it('deve exibir os dados dos produtos nas linhas', () => {
    render(
      <TabelaProducao
        registros={mockProducao}
        onAdicionar={onAdicionar}
        onRemover={onRemover}
      />
    );

    expect(screen.getByText('Tomate')).toBeInTheDocument();
    expect(screen.getByText('50 kg')).toBeInTheDocument();
    expect(screen.getByText('2023-10-15')).toBeInTheDocument();
  });

  // Teste 3: Renderiza uma linha por item (usando data-testid)
  it('deve renderizar uma linha para cada item', () => {
    render(
      <TabelaProducao
        registros={mockProducao}
        onAdicionar={onAdicionar}
        onRemover={onRemover}
      />
    );

    expect(screen.getByTestId('producao-linha-1')).toBeInTheDocument();
    expect(screen.getByTestId('producao-linha-2')).toBeInTheDocument();
  });

  // Teste 4: Renderização Geral (container)
  it('deve renderizar a tabela sem erros', () => {
    const { container } = render(
      <TabelaProducao
        registros={mockProducao}
        onAdicionar={onAdicionar}
        onRemover={onRemover}
      />
    );

    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('producao-tabela')).toBeInTheDocument();
  });

  // Teste 5: Área de Adicionar (Input e Botão)
  it('deve exibir o campo de entrada e o botão de adicionar', () => {
    render(
      <TabelaProducao
        registros={mockProducao}
        onAdicionar={onAdicionar}
        onRemover={onRemover}
      />
    );

    expect(screen.getByTestId('producao-produto')).toBeInTheDocument();
    expect(screen.getByTestId('producao-adicionar')).toBeInTheDocument();
  });
});