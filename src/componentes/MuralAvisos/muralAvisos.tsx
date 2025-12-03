import React from 'react';
import type { Postagem } from './mural.mock';

interface MuralAvisosProps {
  postagens: Postagem[];
}

const MuralAvisos: React.FC<MuralAvisosProps> = ({ postagens }) => {
  
  // Função auxiliar para escolher a cor da etiqueta baseada no tipo
  const getCorTipo = (tipo: string) => {
    switch(tipo) {
      case 'Oferta': return '#5effb6ff'; 
      case 'Ajuda': return '#f9b6b6ff';  
      default: return '#9bd7f8ff';       
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '500px' }}>
      <h2 style={{ borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>
        Mural da Comunidade
      </h2>
      
      {postagens.length === 0 ? (
        <p>Nenhum aviso no momento.</p>
      ) : (
        postagens.map((post) => (
          <div key={post.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '15px', 
            marginBottom: '15px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontWeight: 'bold', color: '#555' }}>{post.autor}</span>
              <span style={{ fontSize: '0.85rem', color: '#999' }}>{post.data}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
              <span style={{ 
                backgroundColor: getCorTipo(post.tipo), 
                padding: '2px 8px', 
                borderRadius: '4px', 
                fontSize: '0.75rem',
                border: '1px solid #ccc'
              }}>
                {post.tipo.toUpperCase()}
              </span>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{post.titulo}</h3>
            </div>

            <p style={{ color: '#333', lineHeight: '1.4' }}>{post.mensagem}</p>
            
            <button style={{ 
              background: 'none', 
              border: 'none', 
              color: '#4CAF50', 
              cursor: 'pointer', 
              padding: 0, 
              marginTop: '10px',
              fontSize: '0.9rem',
              textDecoration: 'underline'
            }}>
              Responder
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MuralAvisos;