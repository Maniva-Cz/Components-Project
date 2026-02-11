import React, { useEffect, useMemo, useState } from 'react';
import WidgetFinanceiro from '../componentes/WidgetFinanceiro/widgetFinanceiro';
import MuralAvisos from '../componentes/MuralAvisos/muralAvisos';

import { listarAvisos } from '../api/mural';
import type { Postagem } from '../api/mural';

import { listarLancamentos, criarLancamento, removerLancamento } from '../api/financeiro';
import type { Lancamento, TipoLancamento } from '../api/financeiro';

import { calcularResumoFinanceiro } from '../utils/financeiro';

export const Inicial: React.FC = () => {
  const [avisos, setAvisos] = useState<Postagem[]>([]);
  const [loadingMural, setLoadingMural] = useState(true);

  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [loadingFin, setLoadingFin] = useState(true);

  const [tipo, setTipo] = useState<TipoLancamento>('ENTRADA');
  const [valor, setValor] = useState<string>('0');
  const [descricao, setDescricao] = useState<string>('');

  const [erroMural, setErroMural] = useState<string | null>(null);

  useEffect(() => {
    setLoadingMural(true);

    listarAvisos()
      .then((data) => {
        setAvisos(data);
        setErroMural(null);
      })
      .catch(() => {
        setAvisos([]);
        setErroMural("Falha ao carregar avisos.");
      })
      .finally(() => {
        setLoadingMural(false);
      });
  }, []);

  async function carregarFinanceiro() {
    setLoadingFin(true);
    try {
      const data = await listarLancamentos();
      setLancamentos(data);
    } finally {
      setLoadingFin(false);
    }
  }

  useEffect(() => {
    carregarFinanceiro();
  }, []);

  const resumo = useMemo(() => {
    return calcularResumoFinanceiro(lancamentos, "Atual");
  }, [lancamentos]);

  async function onAdicionarLancamento(e: React.FormEvent) {
    e.preventDefault();
    const v = Number(valor);
    if (!descricao.trim() || Number.isNaN(v) || v <= 0) return;

    const novo = await criarLancamento({
      tipo,
      valor: v,
      descricao: descricao.trim(),
      data: new Date().toISOString().slice(0, 10)
    });

    setLancamentos((prev) => [...prev, novo]);
    setDescricao('');
    setValor('0');
    setTipo('ENTRADA');
  }

  async function onRemoverLancamento(id: number) {
    await removerLancamento(id);
    setLancamentos((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        {loadingFin ? (
          <p>Carregando financeiro...</p>
        ) : (
          <div>
            <WidgetFinanceiro dados={resumo} />

            <form onSubmit={onAdicionarLancamento} style={{ marginTop: 12, display: 'grid', gap: 8, width: 300 }}>
              <select
                data-testid="fin-tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoLancamento)}
              >
                <option value="ENTRADA">Entrada</option>
                <option value="DESPESA">Despesa</option>
              </select>

              <input
                data-testid="fin-valor"
                type="number"
                min="0"
                step="0.01"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Valor"
              />

              <input
                data-testid="fin-descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição"
              />

              <button data-testid="fin-adicionar" type="submit">Adicionar lançamento</button>
            </form>

            <div data-testid="fin-lista" style={{ marginTop: 10 }}>
              {lancamentos.map((l) => (
                <div key={l.id} data-testid={`fin-item-${l.id}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span>{l.tipo}: {l.descricao} ({l.valor})</span>
                  <button data-testid={`fin-remover-${l.id}`} onClick={() => onRemoverLancamento(l.id)}>
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ flex: 1, minWidth: '300px' }}>
        {loadingMural ? (
          <p>Carregando avisos...</p>
        ) : erroMural ? (
          <p data-testid="mural-erro">{erroMural}</p>
        ) : (
          <MuralAvisos postagens={avisos} />
        )}
      </div>

    </div>
  );
};
