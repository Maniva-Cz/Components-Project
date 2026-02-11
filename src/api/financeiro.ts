import { http } from "./http";

export type TipoLancamento = "ENTRADA" | "DESPESA";

export type Lancamento = {
  id: number;
  tipo: TipoLancamento;
  valor: number;
  data: string; // YYYY-MM-DD
  descricao: string;
};

export async function listarLancamentos() {
  const { data } = await http.get<Lancamento[]>("/lancamentos");
  return data;
}

export async function criarLancamento(l: Omit<Lancamento, "id">) {
  const { data } = await http.post<Lancamento>("/lancamentos", l);
  return data;
}

export async function removerLancamento(id: number) {
  await http.delete(`/lancamentos/${id}`);
}
