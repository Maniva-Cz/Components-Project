import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from './store';

// Importando as páginas criadas
import { Inicial } from './paginas/inicial';
import { Producao } from './paginas/producao';
import { Loja } from './paginas/loja';
import { Membros } from './paginas/membros';
import { Dashboard } from './paginas/dashboard';


const App: React.FC = () => {
  const itensCesta = useSelector((state: RootState) => state.cesta);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Cabeçalho com Navegação */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '2px solid #eee',
        marginBottom: '20px',
        paddingBottom: '10px'
      }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>Maniva</h1>
        
        {/* Menu de Navegação */} 
        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>Início</Link>
          <Link to="/producao" style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>Produção</Link>
          <Link to="/loja" style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>Loja</Link>
          <Link to="/membros" style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>Membros</Link>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>Dashboard</Link>
        </nav>

        {/* Contador do Redux */}
        <div style={{ 
          backgroundColor: '#e0f7fa', 
          padding: '10px 20px', 
          borderRadius: '20px',
          color: '#006064',
          fontWeight: 'bold'
        }}>
          🛒 Cesta: {itensCesta.length}
        </div>
      </header>

      {/* ÁREA DE CONTEÚDO QUE MUDA CONFORME A ROTA */}
      <main>
        <Routes>
          <Route path="/" element={<Inicial />} />
          <Route path="/producao" element={<Producao />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/membros" element={<Membros />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      
    </div>
  );
};

export default App;