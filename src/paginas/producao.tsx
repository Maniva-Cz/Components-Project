import React, { useEffect, useState } from 'react';
import TabelaProducao from '../componentes/TabelaProducao/tabelaProducao';
import { listarProducao, criarRegistro, removerRegistro } from '../api/producao';
import type { RegistroProducao } from '../api/producao';

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

  async function onAdicionar(produto: string) {
    const novo = await criarRegistro({
      produto,
      quantidade: "1 un",
      dataColheita: new Date().toLocaleDateString()
    });

    setRegistros((prev) => [...prev, novo]);
  }

  async function onRemover(id: number) {
    await removerRegistro(id);
    setRegistros((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div>
      <h2>Controle de Produção</h2>
      {loading ? (
        <p>Carregando produção...</p>
      ) : (
        <TabelaProducao registros={registros} onAdicionar={onAdicionar} onRemover={onRemover} />
      )}
    </div>
  );
};
