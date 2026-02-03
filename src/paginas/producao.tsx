import React from 'react';
import TabelaProducao from '../componentes/TabelaProducao/tabelaProducao';
import { producaoMock } from '../componentes/TabelaProducao/producao.mock';

export const Producao: React.FC = () => {
  return (
    <div>
      <h2>Controle de Produção</h2>
      <TabelaProducao dadosIniciais={producaoMock} />
    </div>
  );
};