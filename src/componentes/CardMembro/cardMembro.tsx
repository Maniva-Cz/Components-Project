import React, { useState } from 'react';
import type { MembroData } from './membros.mock';

interface CardMembroProps {
  dados: MembroData;
}

const CardMembro: React.FC<CardMembroProps> = ({ dados }) => {
  const [statusAtual, setStatusAtual] = useState(dados.status);

  const aprovarMembro = () => {
    setStatusAtual('Ativo');
  };

  const badgeBase: React.CSSProperties = {
    padding: '4px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    border: '1px solid #e5e7eb',
    background: '#f9fafb',
    color: '#374151',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6
  };

  const badgeStatus: React.CSSProperties =
    statusAtual === 'Ativo'
      ? { ...badgeBase, background: '#ecfdf5', borderColor: '#a7f3d0', color: '#065f46' }
      : { ...badgeBase, background: '#fffbeb', borderColor: '#fde68a', color: '#92400e' };

  const badgeTipo: React.CSSProperties =
    dados.tipo === 'Agricultor'
      ? { ...badgeBase, background: '#eff6ff', borderColor: '#bfdbfe', color: '#1d4ed8' }
      : { ...badgeBase, background: '#f5f3ff', borderColor: '#ddd6fe', color: '#6d28d9' };

  return (
    <div
      style={{
        width: 360,
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 16,
        padding: 16,
        boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
        display: 'flex',
        gap: 14,
        alignItems: 'center'
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          background: '#f3f4f6',
          flexShrink: 0,
          display: 'grid',
          placeItems: 'center'
        }}
      >
        {dados.fotoUrl ? (
          <img
            src={dados.fotoUrl}
            alt={dados.nome}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ fontWeight: 800, color: '#6b7280' }}>
            {dados.nome?.trim()?.[0]?.toUpperCase() ?? 'M'}
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 800,
            color: '#111827',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          title={dados.nome}
        >
          {dados.nome}
        </h4>

        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          <span style={badgeTipo}>👤 {dados.tipo}</span>
          <span style={badgeStatus}>
            {statusAtual === 'Ativo' ? '✅' : '⏳'} {statusAtual}
          </span>
        </div>
      </div>

      {/* Ação */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {statusAtual === 'Pendente' ? (
          <button
            onClick={aprovarMembro}
            style={{
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid #bbf7d0',
              background: '#22c55e',
              color: '#fff',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 6px 14px rgba(34,197,94,0.25)'
            }}
          >
            Aprovar
          </button>
        ) : (
          <span
            style={{
              padding: '8px 10px',
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              background: '#f9fafb',
              color: '#6b7280',
              fontWeight: 700,
              fontSize: 12
            }}
          >
            Aprovado
          </span>
        )}
      </div>
    </div>
  );
};

export default CardMembro;