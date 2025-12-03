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

export const Pendente: Story = {
  args: {
    dados: membroMock, // O mock padrão é pendente
  },
};

export const Ativo: Story = {
  args: {
    dados: {
      ...membroMock,
      status: 'Ativo',
      nome: "Carlos (Agricultor)",
      tipo: "Agricultor"
    },
  },
};