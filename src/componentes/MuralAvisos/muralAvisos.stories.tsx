import type { Meta, StoryObj } from '@storybook/react';
import MuralAvisos from './muralAvisos';
import { muralMock } from './mural.mock';

const meta = {
  title: 'Maniva/MuralAvisos',
  component: MuralAvisos,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof MuralAvisos>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListaCompleta: Story = {
  args: {
    postagens: muralMock,
  },
};

export const Vazio: Story = {
  args: {
    postagens: [],
  },
};