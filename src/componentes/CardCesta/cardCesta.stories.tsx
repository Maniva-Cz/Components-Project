import type { Meta, StoryObj } from '@storybook/react';
import CardCesta from './cardCesta';
import { cestaMock } from './cesta.mock';

// Configuração Principal do Componente
const meta = {
  title: 'Maniva/CardCesta', 
  component: CardCesta,
  parameters: {
    layout: 'centered', 
  },
  tags: ['autodocs'], 
} satisfies Meta<typeof CardCesta>;

export default meta;
type Story = StoryObj<typeof meta>;

// Cesta Padrão 
export const Padrao: Story = {
  args: {
    dados: cestaMock,
  },
};

// Variação da Cesta pro status de "Entregue"
export const Entregue: Story = {
  args: {
    dados: {
      ...cestaMock, 
      status: 'Entregue', 
      dataEntrega: '01/12/2025'
    },
  },
};