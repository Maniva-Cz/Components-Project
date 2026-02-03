import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ItemCesta {
  id: number;
  nome: string;
  quantidade: number;
}

const initialState: ItemCesta[] = [];

const cestaSlice = createSlice({
  name: 'cesta',
  initialState,
  reducers: {
    adicionarItem: (state, action: PayloadAction<ItemCesta>) => {
      state.push(action.payload);
    },
    removerItem: (state, action: PayloadAction<number>) => {
      return state.filter(item => item.id !== action.payload);
    }
  }
});

// Exporta as ações para usar nos componentes
export const { adicionarItem, removerItem } = cestaSlice.actions;

// Exporta o reducer como default para a store poder importar
export default cestaSlice.reducer;