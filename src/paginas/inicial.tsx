import React from 'react';
import WidgetFinanceiro from '../componentes/WidgetFinanceiro/widgetFinanceiro';
import MuralAvisos from '../componentes/MuralAvisos/muralAvisos';
import { financeiroMock } from '../componentes/WidgetFinanceiro/financeiro.mock';
import { muralMock } from '../componentes/MuralAvisos/mural.mock';

export const Inicial: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <WidgetFinanceiro dados={financeiroMock} />
      </div>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <MuralAvisos postagens={muralMock} />
      </div>
    </div>
  );
};