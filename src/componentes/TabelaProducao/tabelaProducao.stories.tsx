import type { Meta, StoryObj } from '@storybook/react';
import TabelaProducao from './tabelaProducao';
import { producaoMock } from './producao.mock';

const meta = {
  title: 'Maniva/TabelaProducao',
  component: TabelaProducao,
  tags: ['autodocs'],
} satisfies Meta<typeof TabelaProducao>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComDados: Story = {
  args: {
    dadosIniciais: producaoMock,
  },
};

export const Vazia: Story = {
  args: {
    dadosIniciais: [],
  },
};