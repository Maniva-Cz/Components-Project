import React from 'react';
import type { FinanceiroData } from './financeiro.mock';

interface WidgetFinanceiroProps {
  dados: FinanceiroData;
}

const WidgetFinanceiro: React.FC<WidgetFinanceiroProps> = ({ dados }) => {
  const isPositivo = dados.saldo >= 0;

  const formatarMoeda = (valor: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 16,
        padding: 16,
        width: 320,
        fontFamily: 'Arial',
        background: '#fff',
        boxShadow: '0 8px 18px rgba(0,0,0,0.06)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <div>
          <h3 style={{ margin: 0, color: '#111827' }}>Financeiro da Comunidade</h3>
          <p style={{ margin: '6px 0 0', fontSize: '0.9rem', color: '#6b7280' }}>
            Mês: {dados.mesReferencia}
          </p>
        </div>

        <span
          style={{
            padding: '6px 10px',
            borderRadius: 999,
            border: '1px solid #e5e7eb',
            background: '#f9fafb',
            fontSize: 12,
            fontWeight: 800,
            color: isPositivo ? '#065f46' : '#991b1b'
          }}
        >
          {isPositivo ? '✅ Saldo positivo' : '⚠️ Saldo negativo'}
        </span>
      </div>

      <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 10,
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            background: '#f9fafb'
          }}
        >
          <span style={{ color: '#6b7280', fontWeight: 700 }}>Arrecadado</span>
          <span style={{ color: '#065f46', fontWeight: 900 }}>{formatarMoeda(dados.totalArrecadado)}</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 10,
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            background: '#f9fafb'
          }}
        >
          <span style={{ color: '#6b7280', fontWeight: 700 }}>Custos operacionais</span>
          <span style={{ color: '#991b1b', fontWeight: 900 }}>{formatarMoeda(dados.totalCustos)}</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 12,
            borderRadius: 14,
            border: '1px solid #e5e7eb',
            background: isPositivo ? '#ecfdf5' : '#fef2f2'
          }}
        >
          <strong style={{ color: '#111827' }}>Saldo final</strong>
          <strong style={{ color: isPositivo ? '#065f46' : '#991b1b' }}>
            {formatarMoeda(dados.saldo)}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default WidgetFinanceiro;