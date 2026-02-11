import { http } from "./http";

export type TipoMembro = "Agricultor" | "Co-agricultor";
export type StatusMembro = "Pendente" | "Ativo";

export type Membro = {
  id: number;
  nome: string;
  tipo: TipoMembro;
  status: StatusMembro;
  fotoUrl?: string;
};

export async function listarMembros() {
  const { data } = await http.get<Membro[]>("/membros");
  return data;
}

export async function criarMembro(membro: Omit<Membro, "id">) {
  const { data } = await http.post<Membro>("/membros", membro);
  return data;
}

export async function removerMembro(id: number) {
  await http.delete(`/membros/${id}`);
}