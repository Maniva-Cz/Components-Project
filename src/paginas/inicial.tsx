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
  const [erroMural, setErroMural] = useState<string | null>(null);

  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [loadingFin, setLoadingFin] = useState(true);

  const [tipo, setTipo] = useState<TipoLancamento>('ENTRADA');
  const [valor, setValor] = useState<string>('0');
  const [descricao, setDescricao] = useState<string>('');

  useEffect(() => {
    setLoadingMural(true);

    listarAvisos()
      .then((data) => {
        setAvisos(data);
        setErroMural(null);
      })
      .catch(() => {
        setAvisos([]);
        setErroMural('Falha ao carregar avisos.');
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
    return calcularResumoFinanceiro(lancamentos, 'Atual');
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
        <h2 style={{ margin: 0, color: '#111827' }}>Início</h2>
        <p style={{ margin: '8px 0 0', color: '#374151' }}>
          Resumo financeiro e mural de avisos da comunidade.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: 18,
          alignItems: 'start'
        }}
      >
        {/* Coluna Financeiro */}
        <div>
          {loadingFin ? (
            <p>Carregando financeiro...</p>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              <WidgetFinanceiro dados={resumo} />

              <div
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: 16,
                  padding: 14,
                  background: '#fff',
                  boxShadow: '0 8px 18px rgba(0,0,0,0.06)'
                }}
              >
                <h4 style={{ margin: 0, color: '#111827' }}>Lançamentos</h4>
                <p style={{ margin: '6px 0 12px', color: '#6b7280', fontSize: 13 }}>
                  Registre entradas e despesas do mês.
                </p>

                <form onSubmit={onAdicionarLancamento} style={{ display: 'grid', gap: 10 }}>
                  <select
                    data-testid="fin-tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as TipoLancamento)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 12,
                      border: '1px solid #d1d5db',
                      background: '#fff',
                      fontWeight: 700
                    }}
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
                    style={{
                      padding: '10px 12px',
                      borderRadius: 12,
                      border: '1px solid #d1d5db',
                      outline: 'none'
                    }}
                  />

                  <input
                    data-testid="fin-descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descrição"
                    style={{
                      padding: '10px 12px',
                      borderRadius: 12,
                      border: '1px solid #d1d5db',
                      outline: 'none'
                    }}
                  />

                  <button
                    data-testid="fin-adicionar"
                    type="submit"
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
                    Adicionar lançamento
                  </button>
                </form>

                <div data-testid="fin-lista" style={{ marginTop: 12, display: 'grid', gap: 8 }}>
                  {lancamentos.map((l) => (
                    <div
                      key={l.id}
                      data-testid={`fin-item-${l.id}`}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 8,
                        padding: 10,
                        borderRadius: 12,
                        border: '1px solid #e5e7eb',
                        background: '#f9fafb'
                      }}
                    >
                      <span style={{ fontWeight: 800, color: '#111827', fontSize: 13 }}>
                        {l.tipo}: {l.descricao}{' '}
                        <span style={{ color: '#6b7280', fontWeight: 700 }}>({l.valor})</span>
                      </span>

                      <button
                        data-testid={`fin-remover-${l.id}`}
                        onClick={() => onRemoverLancamento(l.id)}
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Coluna Mural */}
        <div style={{ minWidth: 300 }}>
          {loadingMural ? (
            <p>Carregando avisos...</p>
          ) : erroMural ? (
            <p data-testid="mural-erro">{erroMural}</p>
          ) : (
            <MuralAvisos postagens={avisos} />
          )}
        </div>
      </div>
    </div>
  );
};