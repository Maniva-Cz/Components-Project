import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { listarProducao } from '../api/producao';
import type { RegistroProducao } from '../api/producao';

import { listarCestas, criarCesta } from '../api/cestas';
import type { Cesta } from '../api/cestas';

import { listarItensDaCesta, adicionarItemNaCesta, removerItemDaCesta } from '../api/cestaItens';
import type { CestaItem } from '../api/cestaItens';

import { setItens, adicionarItem, removerItem } from '../store/cestaSlice';

export const Loja: React.FC = () => {
  const dispatch = useDispatch();

  const [produtos, setProdutos] = useState<RegistroProducao[]>([]);
  const [cestas, setCestas] = useState<Cesta[]>([]);
  const [cestaSelecionada, setCestaSelecionada] = useState<number | null>(null);

  const [itens, setItensLocal] = useState<CestaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [nomeCesta, setNomeCesta] = useState('');

  async function carregarTudo() {
    setLoading(true);
    try {
      const [p, c] = await Promise.all([listarProducao(), listarCestas()]);
      setProdutos(p);
      setCestas(c);

      const id = c[0]?.id ?? null;
      setCestaSelecionada(id);

      if (id) {
        const itensApi = await listarItensDaCesta(id);
        setItensLocal(itensApi);
        dispatch(setItens(itensApi.map(i => ({ id: i.id, nome: i.produto, quantidade: i.quantidade }))));
      } else {
        setItensLocal([]);
        dispatch(setItens([]));
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarTudo();
  }, []);

  async function carregarItens(cestaId: number) {
    const itensApi = await listarItensDaCesta(cestaId);
    setItensLocal(itensApi);
    dispatch(setItens(itensApi.map(i => ({ id: i.id, nome: i.produto, quantidade: i.quantidade }))));
  }

  async function onCriarCesta(e: React.FormEvent) {
    e.preventDefault();
    if (!nomeCesta.trim()) return;

    const nova = await criarCesta({
      nome: nomeCesta.trim(),
      data: new Date().toISOString().slice(0, 10)
    });

    setCestas(prev => [...prev, nova]);
    setNomeCesta('');
    setCestaSelecionada(nova.id);
    await carregarItens(nova.id);
  }

  async function onSelecionarCesta(id: number) {
    setCestaSelecionada(id);
    await carregarItens(id);
  }

  async function onAdicionarProduto(produto: string) {
    if (!cestaSelecionada) return;

    const novo = await adicionarItemNaCesta({
      cestaId: cestaSelecionada,
      produto,
      quantidade: 1
    });

    setItensLocal(prev => [...prev, novo]);
    dispatch(adicionarItem({ id: novo.id, nome: novo.produto, quantidade: novo.quantidade }));
  }

  async function onRemoverItem(id: number) {
    await removerItemDaCesta(id);
    setItensLocal(prev => prev.filter(i => i.id !== id));
    dispatch(removerItem(id));
  }

  if (loading) return <p>Carregando loja...</p>;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Cabeçalho */}
      <div
        style={{
          background: 'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 55%, #f5f3ff 100%)',
          border: '1px solid #e5e7eb',
          borderRadius: 18,
          padding: 18,
          marginBottom: 18
        }}
      >
        <h2 style={{ margin: 0, color: '#111827' }}>Loja / Cestas</h2>
        <p style={{ margin: '8px 0 0', color: '#374151' }}>
          Gerencie suas cestas e adicione itens vindos da produção.
        </p>
      </div>

      {/* Colunas: Cestas + Itens */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
        {/* CESTAS */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 16,
            padding: 16,
            boxShadow: '0 6px 18px rgba(0,0,0,0.05)'
          }}
        >
          <h3 style={{ marginTop: 0 }}>Cestas</h3>

          <form onSubmit={onCriarCesta} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input
              data-testid="cesta-nome"
              value={nomeCesta}
              onChange={(e) => setNomeCesta(e.target.value)}
              placeholder="Nome da cesta"
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid #d1d5db',
                outline: 'none'
              }}
            />
            <button
              data-testid="cesta-criar"
              type="submit"
              style={{
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid #bbf7d0',
                background: '#22c55e',
                color: '#fff',
                fontWeight: 900,
                cursor: 'pointer'
              }}
            >
              Criar
            </button>
          </form>

          <div data-testid="lista-cestas" style={{ display: 'grid', gap: 8 }}>
            {cestas.map(c => (
              <button
                key={c.id}
                data-testid={`cesta-selecionar-${c.id}`}
                onClick={() => onSelecionarCesta(c.id)}
                style={{
                  textAlign: 'left',
                  padding: 12,
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  background: c.id === cestaSelecionada ? '#e0f2fe' : '#fff',
                  cursor: 'pointer',
                  fontWeight: 800,
                  color: '#111827'
                }}
              >
                {c.nome}{' '}
                <span style={{ fontWeight: 600, color: '#6b7280' }}>
                  ({c.data})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ITENS */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 16,
            padding: 16,
            boxShadow: '0 6px 18px rgba(0,0,0,0.05)'
          }}
        >
          <h3 style={{ marginTop: 0 }}>Itens da cesta</h3>

          {!cestaSelecionada ? (
            <p>Crie ou selecione uma cesta.</p>
          ) : (
            <div data-testid="lista-itens" style={{ display: 'grid', gap: 10 }}>
              {itens.map(i => (
                <div
                  key={i.id}
                  data-testid={`item-${i.id}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    padding: 12
                  }}
                >
                  <span style={{ fontWeight: 800, color: '#111827' }}>
                    {i.produto}{' '}
                    <span style={{ color: '#6b7280', fontWeight: 700 }}>
                      (x{i.quantidade})
                    </span>
                  </span>

                  <button
                    data-testid={`item-remover-${i.id}`}
                    onClick={() => onRemoverItem(i.id)}
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

              {itens.length === 0 && <p>Nenhum item na cesta.</p>}
            </div>
          )}
        </div>
      </div>

      {/* PRODUTOS */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 16,
          padding: 16,
          boxShadow: '0 6px 18px rgba(0,0,0,0.05)'
        }}
      >
        <h3 style={{ marginTop: 0 }}>Produtos da produção</h3>
        <p style={{ marginTop: 6, color: '#6b7280' }}>
          Adicionar itens vindos de Produção (RF04)
        </p>

        <div data-testid="lista-produtos" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {produtos.map(p => (
            <button
              key={p.id}
              data-testid={`produto-add-${p.id}`}
              onClick={() => onAdicionarProduto(p.produto)}
              style={{
                padding: 12,
                borderRadius: 14,
                border: '1px solid #e5e7eb',
                background: '#fff',
                cursor: 'pointer',
                fontWeight: 900,
                color: '#111827',
                boxShadow: '0 6px 14px rgba(0,0,0,0.04)'
              }}
            >
              {p.produto}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
