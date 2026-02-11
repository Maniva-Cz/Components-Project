import { http } from "./http";

export type RegistroProducao = {
  id: number;
  produto: string;
  quantidade: string;
  dataColheita: string;
};

export async function listarProducao() {
  const { data } = await http.get<RegistroProducao[]>("/producao");
  return data;
}

export async function criarRegistro(registro: Omit<RegistroProducao, "id">) {
  const { data } = await http.post<RegistroProducao>("/producao", registro);
  return data;
}

export async function removerRegistro(id: number) {
  await http.delete(`/producao/${id}`);
}
