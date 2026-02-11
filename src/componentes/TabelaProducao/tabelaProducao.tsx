import React, { useMemo, useState } from 'react';
import type { RegistroProducao } from '../../api/producao';

type Unidade = 'kg' | 'un' | 'L';

interface TabelaProducaoProps {
  registros: RegistroProducao[];
  onAdicionar: (produto: string, quantidade: number, unidade: Unidade) => Promise<void> | void;
  onRemover: (id: number) => Promise<void> | void;
}

const TabelaProducao: React.FC<TabelaProducaoProps> = ({ registros = [], onAdicionar, onRemover }) => {
  const [novoProduto, setNovoProduto] = useState('');
  const [qtd, setQtd] = useState<number>(1);
  const [unidade, setUnidade] = useState<Unidade>('kg');

  const total = useMemo(() => registros.length, [registros]);

  const adicionarRegistro = async () => {
    const nome = novoProduto.trim();
    if (!nome) return;
    if (!qtd || qtd <= 0) return;

    await onAdicionar(nome, qtd, unidade);
    setNovoProduto('');
    setQtd(1);
    setUnidade('kg');
  };

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 16,
        padding: 16,
        boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
        fontFamily: 'Arial'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
          alignItems: 'flex-start',
          marginBottom: 14
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: '#111827' }}>Registro de Colheita</h3>
          <p style={{ margin: '6px 0 0', color: '#6b7280' }}>
            Cadastre a produção diária com unidade padronizada (ex: 2 kg).
          </p>
        </div>

        <span
          style={{
            padding: '6px 10px',
            borderRadius: 999,
            border: '1px solid #e5e7eb',
            background: '#f9fafb',
            color: '#374151',
            fontSize: 12,
            fontWeight: 800
          }}
        >
          Total: {total}
        </span>
      </div>

      {/* Form */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 140px 120px 160px',
          gap: 10,
          alignItems: 'center',
          marginBottom: 16
        }}
      >
        <input
          data-testid="producao-produto"
          type="text"
          placeholder="Nome do produto (ex: Batata)"
          value={novoProduto}
          onChange={(e) => setNovoProduto(e.target.value)}
          style={{
            padding: '10px 12px',
            borderRadius: 12,
            border: '1px solid #d1d5db',
            outline: 'none'
          }}
        />

        <input
          data-testid="producao-quantidade"
          type="number"
          min={0.01}
          step={0.01}
          value={qtd}
          onChange={(e) => setQtd(Number(e.target.value))}
          placeholder="Qtd"
          style={{
            padding: '10px 12px',
            borderRadius: 12,
            border: '1px solid #d1d5db',
            outline: 'none'
          }}
        />

        <select
          data-testid="producao-unidade"
          value={unidade}
          onChange={(e) => setUnidade(e.target.value as Unidade)}
          style={{
            padding: '10px 12px',
            borderRadius: 12,
            border: '1px solid #d1d5db',
            background: '#fff',
            outline: 'none',
            fontWeight: 700
          }}
        >
          <option value="kg">kg</option>
          <option value="un">un</option>
          <option value="L">L</option>
        </select>

        <button
          data-testid="producao-adicionar"
          onClick={adicionarRegistro}
          style={{
            padding: '10px 12px',
            borderRadius: 12,
            border: '1px solid #bbf7d0',
            background: '#22c55e',
            color: '#fff',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 10px 16px rgba(34,197,94,0.22)'
          }}
        >
          + Adicionar
        </button>
      </div>

      {/* Tabela */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
          <thead>
            <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
              <th style={{ padding: 12, color: '#374151', fontSize: 13 }}>Produto</th>
              <th style={{ padding: 12, color: '#374151', fontSize: 13 }}>Qtd</th>
              <th style={{ padding: 12, color: '#374151', fontSize: 13 }}>Data</th>
              <th style={{ padding: 12, color: '#374151', fontSize: 13 }}>Ações</th>
            </tr>
          </thead>

          <tbody data-testid="producao-tabela">
            {registros.map((item) => (
              <tr
                key={item.id}
                data-testid={`producao-linha-${item.id}`}
                style={{ borderBottom: '1px solid #eef2f7' }}
              >
                <td style={{ padding: 12, fontWeight: 800, color: '#111827' }}>{item.produto}</td>
                <td style={{ padding: 12, color: '#111827' }}>{item.quantidade}</td>
                <td style={{ padding: 12, color: '#6b7280' }}>{item.dataColheita}</td>
                <td style={{ padding: 12 }}>
                  <button
                    data-testid={`producao-remover-${item.id}`}
                    onClick={() => onRemover(item.id)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 10,
                      border: '1px solid #fecaca',
                      background: '#fee2e2',
                      color: '#991b1b',
                      fontWeight: 900,
                      cursor: 'pointer'
                    }}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}

            {registros.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 12, color: '#6b7280' }}>
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaProducao;