import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../store'; 
import { adicionarItem, removerItem } from '../../store/cestaSlice';

interface CardCestaProps {
  id: number;
  nome: string;
  preco: number;
}

const CardCesta: React.FC<CardCestaProps> = ({ id, nome, preco }) => {
  const dispatch = useDispatch();
  
  // Verifica se o item já está no Redux
  const itensNaCesta = useSelector((state: RootState) => state.cesta);
const estaNaCesta = itensNaCesta.some((item: { id: number }) => item.id === id);

  const handleAcao = () => {
    if (estaNaCesta) {
      dispatch(removerItem(id));
    } else {
      dispatch(adicionarItem({ id, nome, quantidade: 1 }));
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '15px', 
      width: '200px',
      backgroundColor: 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>{nome}</h3>
      <p style={{ color: '#27ae60', fontWeight: 'bold', fontSize: '1.2rem' }}>
        R$ {preco.toFixed(2)}
      </p>
      
      <button 
        onClick={handleAcao}
        style={{
          width: '100%',
          padding: '8px',
          marginTop: '10px',
          backgroundColor: estaNaCesta ? '#e74c3c' : '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {estaNaCesta ? 'Remover' : 'Adicionar'}
      </button>
    </div>
  );
};

// Export default do componente
export default CardCesta;