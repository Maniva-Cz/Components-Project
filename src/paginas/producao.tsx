import React, { useEffect, useState } from 'react';
import TabelaProducao from '../componentes/TabelaProducao/tabelaProducao';
import { listarProducao, criarRegistro, removerRegistro } from '../api/producao';
import type { RegistroProducao } from '../api/producao';

type Unidade = 'kg' | 'un' | 'L';

export const Producao: React.FC = () => {
  const [registros, setRegistros] = useState<RegistroProducao[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    setLoading(true);
    try {
      const data = await listarProducao();
      setRegistros(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function onAdicionar(produto: string, quantidade: number, unidade: Unidade) {
    const qtdFormatada = `${quantidade} ${unidade}`;

    const novo = await criarRegistro({
      produto,
      quantidade: qtdFormatada,
      dataColheita: new Date().toLocaleDateString()
    });

    setRegistros((prev) => [...prev, novo]);
  }

  async function onRemover(id: number) {
    await removerRegistro(id);
    setRegistros((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 55%, #f5f3ff 100%)',
          border: '1px solid #e5e7eb',
          borderRadius: 18,
          padding: 18,
          marginBottom: 18
        }}
      >
        <h2 style={{ margin: 0, color: '#111827' }}>Controle de Produção</h2>
        <p style={{ margin: '8px 0 0', color: '#374151' }}>
          Cadastre e acompanhe colheitas diárias com unidade padronizada.
        </p>
      </div>

      {loading ? (
        <p>Carregando produção...</p>
      ) : (
        <TabelaProducao registros={registros} onAdicionar={onAdicionar} onRemover={onRemover} />
      )}
    </div>
  );
};