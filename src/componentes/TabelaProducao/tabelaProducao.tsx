import React, { useState } from 'react';
import type { RegistroProducao } from '../../api/producao';

interface TabelaProducaoProps {
  registros: RegistroProducao[];
  onAdicionar: (produto: string) => Promise<void> | void;
  onRemover: (id: number) => Promise<void> | void;
}

const TabelaProducao: React.FC<TabelaProducaoProps> = ({ registros = [], onAdicionar, onRemover }) => {
  const [novoProduto, setNovoProduto] = useState('');

  const adicionarRegistro = async () => {
    if (!novoProduto.trim()) return;
    await onAdicionar(novoProduto.trim());
    setNovoProduto('');
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3 style={{ color: '#2c3e50' }}>Registro de Colheita Diária</h3>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          data-testid="producao-produto"
          type="text"
          placeholder="Nome do produto (ex: Batata)"
          value={novoProduto}
          onChange={(e) => setNovoProduto(e.target.value)}
          style={{ padding: '8px', flex: 1 }}
        />
        <button
          data-testid="producao-adicionar"
          onClick={adicionarRegistro}
          style={{ padding: '8px 16px', backgroundColor: '#27ae60', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          + Adicionar
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Produto</th>
            <th style={{ padding: '10px' }}>Qtd</th>
            <th style={{ padding: '10px' }}>Data</th>
            <th style={{ padding: '10px' }}>Ações</th>
          </tr>
        </thead>

        <tbody data-testid="producao-tabela">
          {registros.map((item) => (
            <tr key={item.id} data-testid={`producao-linha-${item.id}`} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{item.produto}</td>
              <td style={{ padding: '10px' }}>{item.quantidade}</td>
              <td style={{ padding: '10px', color: '#777' }}>{item.dataColheita}</td>
              <td style={{ padding: '10px' }}>
                <button
                  data-testid={`producao-remover-${item.id}`}
                  onClick={() => onRemover(item.id)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}

          {registros.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: '10px', color: '#777' }}>
                Nenhum registro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaProducao;
