import type { Lancamento } from "../api/financeiro";
import type { FinanceiroData } from "../componentes/WidgetFinanceiro/financeiro.mock";

export function calcularResumoFinanceiro(lancamentos: Lancamento[], mesReferencia = "Atual"): FinanceiroData {
  const totalArrecadado = lancamentos
    .filter(l => l.tipo === "ENTRADA")
    .reduce((acc, l) => acc + l.valor, 0);

  const totalCustos = lancamentos
    .filter(l => l.tipo === "DESPESA")
    .reduce((acc, l) => acc + l.valor, 0);

  return {
    mesReferencia,
    totalArrecadado,
    totalCustos,
    saldo: totalArrecadado - totalCustos
  };
}
