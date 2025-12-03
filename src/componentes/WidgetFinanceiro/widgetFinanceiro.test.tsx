import { render, screen } from '@testing-library/react';
import WidgetFinanceiro from './widgetFinanceiro';
import { financeiroMock } from './financeiro.mock';
import { describe, it, expect } from 'vitest';

describe('Componente WidgetFinanceiro', () => {
  // Teste 1: Verifica se o saldo final é exibido
  it('deve exibir o saldo final', () => {
    render(<WidgetFinanceiro dados={financeiroMock} />);
    
    expect(screen.getByText('Saldo Final:')).toBeInTheDocument();
  });

  // Teste 2: Verifica formatação de moeda (R$)
  it('deve formatar os valores com o símbolo de Real (R$)', () => {
    render(<WidgetFinanceiro dados={financeiroMock} />);
    
    // Busca qualquer elemento que contenha "R$"
    const elementosComCifrao = screen.getAllByText(/R\$/);
    expect(elementosComCifrao.length).toBeGreaterThan(0);
  });
});