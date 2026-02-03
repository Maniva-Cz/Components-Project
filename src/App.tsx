import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from './store';
import WidgetFinanceiro from './componentes/WidgetFinanceiro/widgetFinanceiro';
import TabelaProducao from './componentes/TabelaProducao/tabelaProducao';
import MuralAvisos from './componentes/MuralAvisos/muralAvisos';
import CardCesta from './componentes/CardCesta/cardCesta';


import { financeiroMock } from './componentes/WidgetFinanceiro/financeiro.mock';
import { producaoMock } from './componentes/TabelaProducao/producao.mock';
import { muralMock } from './componentes/MuralAvisos/mural.mock';

const App: React.FC = () => {
  // Acessa o estado global da cesta (configurado no store)
  const itensCesta = useSelector((state: RootState) => state.cesta);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* CABEÇALHO */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '2px solid #eee',
        marginBottom: '20px',
        paddingBottom: '10px'
      }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>Maniva - Gestão</h1>
        
        {/* Contador do Redux */}
        <div style={{ 
          backgroundColor: '#e0f7fa', 
          padding: '10px 20px', 
          borderRadius: '20px',
          color: '#006064',
          fontWeight: 'bold'
        }}>
          🛒 Cesta: {itensCesta.length} itens
        </div>
      </header>

      <main>
        {/* SEÇÃO 1: RESUMOS (Financeiro e Mural) */}
        <section style={{ 
          display: 'flex', 
          gap: '30px', 
          flexWrap: 'wrap', 
          marginBottom: '40px',
          alignItems: 'flex-start' 
        }}>
          
          <div>
            <WidgetFinanceiro dados={financeiroMock} />
          </div>

          <div style={{ flex: 1, minWidth: '300px' }}>
            <MuralAvisos postagens={muralMock} />
          </div>
        
        </section>

        {/* SEÇÃO 2: PRODUÇÃO */}
        <section style={{ marginBottom: '40px' }}>
          <TabelaProducao dadosIniciais={producaoMock} />
        </section>

        {/* SEÇÃO 3: LOJA (Teste do Redux) */}
        <section style={{ 
          backgroundColor: '#f9f9f9', 
          padding: '20px', 
          borderRadius: '10px' 
        }}>
          <h2 style={{ marginTop: 0 }}>Disponível para Cesta (Redux Test)</h2>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
            Adicione itens aqui e veja o contador no topo mudar.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {/* IDs manuais para testar a adição/remoção */}
            <CardCesta id={101} nome="Farinha de Mandioca (1kg)" preco={15.00} />
            <CardCesta id={102} nome="Feijão Verde (1kg)" preco={12.50} />
            <CardCesta id={103} nome="Doce de Leite Artesanal" preco={22.00} />
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;