import React, { useState } from 'react';
import type { RegistroProducao } from './producao.mock';

interface TabelaProducaoProps {
  dadosIniciais: RegistroProducao[];
}

const TabelaProducao: React.FC<TabelaProducaoProps> = ({ dadosIniciais }) => {
  const [registros, setRegistros] = useState<RegistroProducao[]>(dadosIniciais);
  const [novoProduto, setNovoProduto] = useState('');

  // Simula adicionar um item na lista
  const adicionarRegistro = () => {
    if (!novoProduto) return;
    const novoItem: RegistroProducao = {
      id: Date.now(), // gera id único falso
      produto: novoProduto,
      quantidade: "1 un", // valor fixo só pra teste
      dataColheita: new Date().toLocaleDateString()
    };
    setRegistros([...registros, novoItem]);
    setNovoProduto('');
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3 style={{ color: '#2c3e50' }}>Registro de Colheita Diária</h3>
      
      {/* Pequeno formulário de adição */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Nome do produto (ex: Batata)" 
          value={novoProduto}
          onChange={(e) => setNovoProduto(e.target.value)}
          style={{ padding: '8px', flex: 1 }}
        />
        <button 
          onClick={adicionarRegistro}
          style={{ padding: '8px 16px', backgroundColor: '#27ae60', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          + Adicionar
        </button>
      </div>

      {/* Tabela de Visualização */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Produto</th>
            <th style={{ padding: '10px' }}>Qtd</th>
            <th style={{ padding: '10px' }}>Data</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{item.produto}</td>
              <td style={{ padding: '10px' }}>{item.quantidade}</td>
              <td style={{ padding: '10px', color: '#777' }}>{item.dataColheita}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaProducao;