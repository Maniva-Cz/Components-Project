import React from 'react';
import CardMembro from '../componentes/CardMembro/cardMembro';
import { membroMock } from '../componentes/CardMembro/membros.mock'; // Certifique-se que o mock existe e está exportado assim

export const Membros: React.FC = () => {
  return (
    <div>
      <h2>Membros da Cooperativa</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {membroMock.map((membro) => (
          <CardMembro key={membro.id} dados={membro} />
        ))}
      </div>
    </div>
  );
};