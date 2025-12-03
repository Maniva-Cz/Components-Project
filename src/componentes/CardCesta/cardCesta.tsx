import React from 'react';
import type { CestaData } from './cesta.mock'; // Importam a tipagem

// As propriedades desse componente exigem um objeto "dados"
interface CardCestaProps {
  dados: CestaData;
}

const CardCesta: React.FC<CardCestaProps> = ({ dados }) => {
  // Se não tiver dados, evita erro
  if (!dados) return <div>Carregando...</div>;

  // Define cor do status dinamicamente
  const corStatus = dados.status === 'Entregue' ? '#91eda6ff' : '#f3db8fff';

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '20px', 
      borderRadius: '8px', 
      maxWidth: '300px', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Cesta da Semana</h3>
        <span style={{ 
          backgroundColor: corStatus, 
          padding: '4px 10px', 
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          {dados.status}
        </span>
      </div>

      <p style={{ color: '#555', marginBottom: '15px' }}>
        Entrega prevista: <strong>{dados.dataEntrega}</strong>
      </p>

      <hr style={{ border: '0', borderTop: '1px solid #eee' }} />

      {/* Lista */}
      <h4 style={{ marginBottom: '5px' }}>Itens:</h4>
      <ul style={{ paddingLeft: '20px', color: '#333' }}>
        {dados.itens.map((item) => (
          <li key={item.id} style={{ marginBottom: '4px' }}>
            {item.nome} - <span style={{ color: '#777', fontSize: '0.9em' }}>{item.quantidade}</span>
          </li>
        ))}
      </ul>

      <button style={{ 
        width: '100%', 
        padding: '10px', 
        marginTop: '15px', 
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}>
        Ver Detalhes
      </button>
    </div>
  );
};

export default CardCesta;