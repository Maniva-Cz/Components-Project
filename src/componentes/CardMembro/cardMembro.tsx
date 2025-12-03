import React, { useState } from 'react';
import type { MembroData } from './membros.mock';

interface CardMembroProps {
  dados: MembroData;
}

const CardMembro: React.FC<CardMembroProps> = ({ dados }) => {
  // Estado local para simular a aprovação
  const [statusAtual, setStatusAtual] = useState(dados.status);

  const aprovarMembro = () => {
    setStatusAtual('Ativo');
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '15px', 
      padding: '15px', 
      border: '1px solid #e0e0e0', 
      borderRadius: '12px',
      maxWidth: '400px',
      fontFamily: 'sans-serif'
    }}>
      {/* Foto */}
      <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ccc', overflow: 'hidden' }}>
        {dados.fotoUrl && <img src={dados.fotoUrl} alt={dados.nome} style={{ width: '100%' }} />}
      </div>

      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 5px 0' }}>{dados.nome}</h4>
        <div style={{ fontSize: '0.85rem', color: '#666' }}>
          {dados.tipo} • 
          <span style={{ 
            color: statusAtual === 'Ativo' ? 'green' : 'orange', 
            fontWeight: 'bold',
            marginLeft: '5px' 
          }}>
            {statusAtual}
          </span>
        </div>
      </div>

      {/* Botão de Ação (Só aparece se estiver pendente) */}
      {statusAtual === 'Pendente' && (
        <button 
          onClick={aprovarMembro}
          style={{ 
            padding: '8px 12px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Aprovar
        </button>
      )}
    </div>
  );
};

export default CardMembro;