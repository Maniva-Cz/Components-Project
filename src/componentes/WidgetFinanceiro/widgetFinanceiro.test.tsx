import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import WidgetFinanceiro from './widgetFinanceiro';
import '@testing-library/jest-dom';

const mockDadosPositivos = {
  mesReferencia: 'Novembro/2023',
  totalArrecadado: 2000.00,      
  totalCustos: 499.50,           
  saldo: 1500.50                  
};

const mockDadosNegativos = {
  mesReferencia: 'Dezembro/2023',
  totalArrecadado: 50.00,
  totalCustos: 150.00,
  saldo: -100.00
};

describe('Componente WidgetFinanceiro', () => {
  
  // Teste 1: Renderização dos títulos e mês
  it('deve exibir os títulos e o mês de referência', () => {
    render(<WidgetFinanceiro dados={mockDadosPositivos} />);
    
    expect(screen.getByText(/Financeiro/i)).toBeInTheDocument();
    // Verifica se o mês passado no mock aparece na tela
    expect(screen.getByText(/Novembro\/2023/)).toBeInTheDocument();
  });

  // Teste 2: Formatação de moeda (Arrecadado)
  it('deve formatar o valor arrecadado como moeda (R$)', () => {
    render(<WidgetFinanceiro dados={mockDadosPositivos} />);
    expect(screen.getByText(/R\$\s?2\.000,00/)).toBeInTheDocument();
  });

  // Teste 3: Formatação de moeda (Custos)
  it('deve formatar o valor de custos corretamente', () => {
    render(<WidgetFinanceiro dados={mockDadosPositivos} />);
    expect(screen.getByText(/R\$\s?499,50/)).toBeInTheDocument();
  });

  // Teste 4: Saldo Positivo
  it('deve exibir o saldo final positivo', () => {
    render(<WidgetFinanceiro dados={mockDadosPositivos} />);
    expect(screen.getByText(/R\$\s?1\.500,50/)).toBeInTheDocument();
  });

  // Teste 5: Saldo Negativo
  it('deve renderizar corretamente saldo negativo', () => {
    render(<WidgetFinanceiro dados={mockDadosNegativos} />);
    // Verifica formatos possíveis de negativo: "-R$ 100,00" ou "R$ -100,00"
    expect(screen.getByText(/-R\$\s?100,00|R\$\s?-100,00/)).toBeInTheDocument();
  });
});