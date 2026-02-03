import type { Meta, StoryObj } from '@storybook/react';
import CardCesta from './cardCesta';


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

export const ProdutoPadrao: Story = {
  args: {
    id: 1,
    nome: 'Macaxeira (1kg)',
    preco: 5.00,
  },
};

// História 2: Um produto mais caro
export const ProdutoCaro: Story = {
  args: {
    id: 2,
    nome: 'Mel Orgânico',
    preco: 25.50,
  },
};