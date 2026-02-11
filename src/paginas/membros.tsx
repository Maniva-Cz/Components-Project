import React, { useEffect, useState } from 'react';
import CardMembro from '../componentes/CardMembro/cardMembro';
import { listarMembros, criarMembro, removerMembro } from '../api/membros';
import type { Membro } from '../api/membros';

export const Membros: React.FC = () => {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState<'Agricultor' | 'Co-agricultor'>('Co-agricultor');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarMembros()
      .then(setMembros)
      .finally(() => setLoading(false));
  }, []);

  async function adicionarMembro(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return;

    const novo = await criarMembro({
      nome: nome.trim(),
      tipo,
      status: 'Pendente',
      fotoUrl: '/perfil.jpg'
    });

    setMembros((prev) => [...prev, novo]);
    setNome('');
  }

  async function excluirMembro(id: number) {
    await removerMembro(id);
    setMembros((prev) => prev.filter((m) => m.id !== id));
  }

  if (loading) return <p>Carregando membros...</p>;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 10 }}>Membros da Cooperativa</h2>
      <p style={{ marginBottom: 20, color: '#666' }}>
        Cadastro e acompanhamento de membros da comunidade.
      </p>

      {/* FORMULÁRIO */}
      <form
        onSubmit={adicionarMembro}
        style={{
          background: '#fff',
          padding: 20,
          borderRadius: 12,
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          marginBottom: 30,
          display: 'flex',
          gap: 10,
          alignItems: 'center'
        }}
      >
        <input
          data-testid="nome-membro"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do novo membro"
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: 14
          }}
        />

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as 'Agricultor' | 'Co-agricultor')}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: 14,
            backgroundColor: '#fff'
          }}
        >
          <option value="Agricultor">Agricultor</option>
          <option value="Co-agricultor">Co-agricultor</option>
        </select>

        <button
          data-testid="btn-adicionar"
          type="submit"
          style={{
            backgroundColor: '#2ecc71',
            color: '#fff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: 8,
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          + Cadastrar
        </button>
      </form>

      {/* LISTA */}
      <div
        data-testid="lista-membros"
        style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}
      >
        {membros.map((membro) => (
            <div key={membro.id} data-testid={`membro-${membro.id}`} style={{ display: 'grid', gap: 8 }}>
              
            <CardMembro dados={membro} />

            <button
              data-testid={`remover-${membro.id}`}
              onClick={() => excluirMembro(membro.id)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                background: '#fff',
                cursor: 'pointer'
              }}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membros;
