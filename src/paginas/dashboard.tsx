import React, { useEffect, useMemo, useState } from "react";
import { listarMembros } from "../api/membros";
import { listarProducao } from "../api/producao";
import { listarLancamentos } from "../api/financeiro";
import { listarCestas } from "../api/cestas";
import { calcularResumoFinanceiro } from "../utils/financeiro";

import type { Membro } from "../api/membros";
import type { RegistroProducao } from "../api/producao";
import type { Lancamento } from "../api/financeiro";
import type { Cesta } from "../api/cestas";

export const Dashboard: React.FC = () => {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [producao, setProducao] = useState<RegistroProducao[]>([]);
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [cestas, setCestas] = useState<Cesta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([listarMembros(), listarProducao(), listarLancamentos(), listarCestas()])
      .then(([m, p, l, c]) => {
        setMembros(m);
        setProducao(p);
        setLancamentos(l);
        setCestas(c);
      })
      .finally(() => setLoading(false));
  }, []);

  const resumoFinanceiro = useMemo(() => calcularResumoFinanceiro(lancamentos, "Atual"), [lancamentos]);

  // “total de produção” simples: quantidade de registros (não soma kg/un)
  const totalRegistrosProducao = producao.length;

  if (loading) return <p>Carregando dashboard...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <div data-testid="dash-card-membros" style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, width: 220 }}>
          <strong>Membros</strong>
          <div data-testid="dash-membros">{membros.length}</div>
        </div>

        <div data-testid="dash-card-producao" style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, width: 220 }}>
          <strong>Registros de Produção</strong>
          <div data-testid="dash-producao">{totalRegistrosProducao}</div>
        </div>

        <div data-testid="dash-card-cestas" style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, width: 220 }}>
          <strong>Cestas</strong>
          <div data-testid="dash-cestas">{cestas.length}</div>
        </div>

        <div data-testid="dash-card-financeiro" style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, width: 260 }}>
          <strong>Financeiro</strong>
          <div>Arrecadado: <span data-testid="dash-arrecadado">{resumoFinanceiro.totalArrecadado}</span></div>
          <div>Custos: <span data-testid="dash-custos">{resumoFinanceiro.totalCustos}</span></div>
          <div>Saldo: <span data-testid="dash-saldo">{resumoFinanceiro.saldo}</span></div>
        </div>
      </div>
    </div>
  );
};
