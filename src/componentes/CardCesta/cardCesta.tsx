import React, { useMemo } from 'react';
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

  const itensNaCesta = useSelector((state: RootState) => state.cesta);
  const estaNaCesta = useMemo(
    () => itensNaCesta.some((item: { id: number }) => item.id === id),
    [itensNaCesta, id]
  );

  const handleAcao = () => {
    if (estaNaCesta) {
      dispatch(removerItem(id));
    } else {
      dispatch(adicionarItem({ id, nome, quantidade: 1 }));
    }
  };

  const formatarMoeda = (valor: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  return (
    <div
      style={{
        width: 280,
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 16,
        padding: 14,
        boxShadow: '0 8px 18px rgba(0,0,0,0.06)',
        display: 'grid',
        gap: 10
      }}
    >
      {/* Cabeçalho visual */}
      <div
        style={{
          height: 90,
          borderRadius: 14,
          border: '1px solid #e5e7eb',
          background: 'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 55%, #f5f3ff 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: 12
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 900,
            color: '#065f46',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            padding: '4px 10px',
            borderRadius: 999
          }}
        >
          Produto
        </span>

        <span style={{ fontSize: 22 }}>🧺</span>
      </div>

      <div style={{ display: 'grid', gap: 6 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 900,
            color: '#111827',
            lineHeight: 1.2
          }}
          title={nome}
        >
          {nome}
        </h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 13, color: '#6b7280' }}>Preço</span>
          <strong style={{ fontSize: 18, color: '#111827' }}>{formatarMoeda(preco)}</strong>
        </div>
      </div>

      {/* Importante: manter o texto "Adicionar"/"Remover" para os testes */}
      <button
        onClick={handleAcao}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 12,
          border: estaNaCesta ? '1px solid #fecaca' : '1px solid #bbf7d0',
          background: estaNaCesta ? '#fee2e2' : '#22c55e',
          color: estaNaCesta ? '#991b1b' : '#fff',
          fontWeight: 900,
          cursor: 'pointer',
          boxShadow: estaNaCesta ? 'none' : '0 10px 16px rgba(34,197,94,0.22)'
        }}
      >
        {estaNaCesta ? 'Remover' : 'Adicionar'}
      </button>
    </div>
  );
};

export default CardCesta;
