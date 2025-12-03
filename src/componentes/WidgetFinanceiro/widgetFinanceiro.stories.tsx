import type { Meta, StoryObj } from '@storybook/react';
import WidgetFinanceiro from './widgetFinanceiro';
import { financeiroMock } from './financeiro.mock';

const meta = {
  title: 'Maniva/WidgetFinanceiro',
  component: WidgetFinanceiro,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof WidgetFinanceiro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SaldoPositivo: Story = {
  args: {
    dados: financeiroMock,
  },
};

export const SaldoNegativo: Story = {
  args: {
    dados: {
      ...financeiroMock,
      totalArrecadado: 2000.00,
      totalCustos: 3000.00,
      saldo: -1000.00
    },
  },
};