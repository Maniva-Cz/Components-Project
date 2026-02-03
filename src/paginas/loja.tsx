import React from 'react';
import CardCesta from '../componentes/CardCesta/cardCesta';

export const Loja: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
      <h2>Loja de Insumos</h2>
      <p style={{ marginBottom: '15px' }}>Adicione itens à sua cesta.</p>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <CardCesta id={101} nome="Farinha de Mandioca (1kg)" preco={15.00} />
        <CardCesta id={102} nome="Feijão Verde (1kg)" preco={12.50} />
        <CardCesta id={103} nome="Doce de Leite Artesanal" preco={22.00} />
      </div>
    </div>
  );
};