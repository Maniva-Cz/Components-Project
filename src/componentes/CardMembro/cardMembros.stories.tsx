import type { Meta, StoryObj } from '@storybook/react';
import CardMembro from './cardMembro';
import { membroMock } from './membros.mock';

const meta = {
  title: 'Maniva/CardMembro',
  component: CardMembro,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof CardMembro>;

export default meta;
type Story = StoryObj<typeof meta>;

// CORREÇÃO: Pega o primeiro item da lista e não mais um objeto isolado
export const Pendente: Story = {
  args: {
    dados: membroMock[0], 
  },
};

export const Ativo: Story = {
  args: {
    dados: {
      ...membroMock[0], 
      status: 'Ativo',
      nome: "Carlos (Agricultor)",
      tipo: "Agricultor"
    },
  },
};