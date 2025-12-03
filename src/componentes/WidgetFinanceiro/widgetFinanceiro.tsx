import React from 'react';
import type { FinanceiroData } from './financeiro.mock';

interface WidgetFinanceiroProps {
  dados: FinanceiroData;
}

const WidgetFinanceiro: React.FC<WidgetFinanceiroProps> = ({ dados }) => {
  const isPositivo = dados.saldo >= 0;

  // Formata número para moeda Real
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '10px', 
      padding: '20px', 
      width: '300px', 
      fontFamily: 'Arial',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ marginTop: 0, color: '#444' }}>Financeiro da Comunidade</h3>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>Mês: {dados.mesReferencia}</p>
      
      <div style={{ display: 'grid', gap: '10px', marginTop: '15px' }}>
        
        {/* Linha Receitas */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Arrecadado:</span>
          <span style={{ color: '#27ae60', fontWeight: 'bold' }}>
            {formatarMoeda(dados.totalArrecadado)}
          </span>
        </div>

        {/* Linha Despesas */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Custos Operacionais:</span>
          <span style={{ color: '#c0392b', fontWeight: 'bold' }}>
            {formatarMoeda(dados.totalCustos)}
          </span>
        </div>

        <hr style={{ width: '100%', margin: '5px 0' }} />

        {/* Linha Saldo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
          <strong>Saldo Final:</strong>
          <strong style={{ color: isPositivo ? '#27ae60' : '#c0392b' }}>
            {formatarMoeda(dados.saldo)}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default WidgetFinanceiro;