export interface FinanceiroData {
  mesReferencia: string;
  totalArrecadado: number;
  totalCustos: number;
  saldo: number;
}

export const financeiroMock: FinanceiroData = {
  mesReferencia: "Novembro/2025",
  totalArrecadado: 5000.00,
  totalCustos: 3200.50,
  saldo: 1799.50
};