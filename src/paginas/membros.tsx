import React, { useEffect, useState } from 'react';
import CardMembro from '../componentes/CardMembro/cardMembro';
import { listarMembros, criarMembro, removerMembro } from '../api/membros';
import type { Membro, TipoMembro, StatusMembro } from '../api/membros';

export const Membros: React.FC = () => {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState<TipoMembro>('Agricultor');
  const [status, setStatus] = useState<StatusMembro>('Pendente');
  const [fotoUrl, setFotoUrl] = useState('/perfil.jpg');

  async function carregar() {
    setLoading(true);
    try {
      const data = await listarMembros();
      setMembros(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function onAdicionar(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return;

    const novo = await criarMembro({
      nome: nome.trim(),
      tipo,
      status,
      fotoUrl
    });

    setMembros((prev) => [...prev, novo]);
    setNome('');
  }

  async function onRemover(id: number) {
    await removerMembro(id);
    setMembros((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <h2>Membros da Cooperativa</h2>

      <form onSubmit={onAdicionar} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
        <input
          data-testid="nome-membro"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          aria-label="nome-membro"
        />

        <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoMembro)} aria-label="tipo-membro">
          <option value="Agricultor">Agricultor</option>
          <option value="Co-agricultor">Co-agricultor</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value as StatusMembro)} aria-label="status-membro">
          <option value="Pendente">Pendente</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>

        <input
          value={fotoUrl}
          onChange={(e) => setFotoUrl(e.target.value)}
          placeholder="Foto URL"
          aria-label="foto-membro"
        />

        <button data-testid="btn-adicionar" type="submit">Adicionar</button>
        <button type="button" onClick={carregar}>Recarregar</button>
      </form>

      {loading ? (
        <p>Carregando membros...</p>
      ) : (
        <div data-testid="lista-membros" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {membros.map((membro) => (
            <div key={membro.id} data-testid={`membro-${membro.id}`} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <CardMembro dados={membro} />
              <button data-testid={`remover-${membro.id}`} onClick={() => onRemover(membro.id)}>Remover</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};