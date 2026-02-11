import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ItemCesta {
  id: number;        
  nome: string;       
  quantidade: number;
}

const initialState: ItemCesta[] = [];

const cestaSlice = createSlice({
  name: 'cesta',
  initialState,
  reducers: {
    setItens: (_state, action: PayloadAction<ItemCesta[]>) => {
      return action.payload;
    },
    adicionarItem: (state, action: PayloadAction<ItemCesta>) => {
      const existente = state.find(i => i.nome === action.payload.nome);
      if (existente) {
        existente.quantidade += action.payload.quantidade;
      } else {
        state.push(action.payload);
      }
    },
    removerItem: (state, action: PayloadAction<number>) => {
      return state.filter(item => item.id !== action.payload);
    }
  }
});

export const { setItens, adicionarItem, removerItem } = cestaSlice.actions;
export default cestaSlice.reducer;