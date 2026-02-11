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
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
      <h2>Loja / Cestas</h2>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
        <div style={{ minWidth: 320 }}>
          <h3>Cestas</h3>

          <form onSubmit={onCriarCesta} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input
              data-testid="cesta-nome"
              value={nomeCesta}
              onChange={(e) => setNomeCesta(e.target.value)}
              placeholder="Nome da cesta"
            />
            <button data-testid="cesta-criar" type="submit">Criar</button>
          </form>

          <div data-testid="lista-cestas" style={{ display: 'grid', gap: 6 }}>
            {cestas.map(c => (
              <button
                key={c.id}
                data-testid={`cesta-selecionar-${c.id}`}
                onClick={() => onSelecionarCesta(c.id)}
                style={{
                  textAlign: 'left',
                  padding: 8,
                  borderRadius: 6,
                  border: '1px solid #ddd',
                  background: c.id === cestaSelecionada ? '#e0f7fa' : '#fff',
                  cursor: 'pointer'
                }}
              >
                {c.nome} ({c.data})
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 320 }}>
          <h3>Itens da cesta</h3>
          {!cestaSelecionada ? (
            <p>Crie ou selecione uma cesta.</p>
          ) : (
            <div data-testid="lista-itens" style={{ display: 'grid', gap: 8 }}>
              {itens.map(i => (
                <div key={i.id} data-testid={`item-${i.id}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <span>{i.produto} (x{i.quantidade})</span>
                  <button data-testid={`item-remover-${i.id}`} onClick={() => onRemoverItem(i.id)}>Remover</button>
                </div>
              ))}
              {itens.length === 0 && <p>Nenhum item na cesta.</p>}
            </div>
          )}
        </div>
      </div>

      <h3>Produtos da produção</h3>
      <p>Adicionar itens vindos de Produção (RF04)</p>

      <div data-testid="lista-produtos" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {produtos.map(p => (
          <button
            key={p.id}
            data-testid={`produto-add-${p.id}`}
            onClick={() => onAdicionarProduto(p.produto)}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
          >
            {p.produto}
          </button>
        ))}
      </div>
    </div>
  );
};