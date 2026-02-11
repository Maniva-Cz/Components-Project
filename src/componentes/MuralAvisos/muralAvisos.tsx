import React from 'react';
import type { Postagem } from './mural.mock';

interface MuralAvisosProps {
  postagens: Postagem[];
}

const MuralAvisos: React.FC<MuralAvisosProps> = ({ postagens }) => {
  const getBadgeStyle = (tipo: string): React.CSSProperties => {
    switch (tipo) {
      case 'Oferta':
        return { background: '#ecfdf5', borderColor: '#a7f3d0', color: '#065f46' };
      case 'Ajuda':
        return { background: '#fef2f2', borderColor: '#fecaca', color: '#991b1b' };
      default:
        return { background: '#eff6ff', borderColor: '#bfdbfe', color: '#1d4ed8' };
    }
  };

  return (
    <div data-testid="mural" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 55%, #f5f3ff 100%)',
          border: '1px solid #e5e7eb',
          borderRadius: 18,
          padding: 16,
          marginBottom: 14
        }}
      >
        <h2 style={{ margin: 0, color: '#111827' }}>Mural da Comunidade</h2>
        <p style={{ margin: '8px 0 0', color: '#374151' }}>
          Avisos, ofertas e pedidos de ajuda.
        </p>
      </div>

      {postagens.length === 0 ? (
        <div
          style={{
            border: '1px dashed #d1d5db',
            borderRadius: 16,
            padding: 16,
            background: '#fff',
            color: '#6b7280'
          }}
        >
          Nenhum aviso no momento.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {postagens.map((post) => (
            <div
              key={post.id}
              data-testid="mural-post"
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: 16,
                padding: 14,
                backgroundColor: '#fff',
                boxShadow: '0 8px 18px rgba(0,0,0,0.06)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                <span style={{ fontWeight: 900, color: '#111827' }}>{post.autor}</span>
                <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{post.data}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 900,
                    border: '1px solid',
                    ...getBadgeStyle(post.tipo)
                  }}
                >
                  {post.tipo.toUpperCase()}
                </span>

                <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#111827' }}>{post.titulo}</h3>
              </div>

              <p style={{ color: '#374151', lineHeight: 1.5, marginTop: 8 }}>{post.mensagem}</p>

              <button
                style={{
                  marginTop: 8,
                  padding: '8px 10px',
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  background: '#f9fafb',
                  color: '#111827',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                Responder
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MuralAvisos;
