import { http } from "./http";

export type CestaItem = {
  id: number;
  cestaId: number;
  produto: string;
  quantidade: number;
};

export async function listarItensDaCesta(cestaId: number) {
  const { data } = await http.get<CestaItem[]>(`/cestaItens?cestaId=${cestaId}`);
  return data;
}

export async function adicionarItemNaCesta(item: Omit<CestaItem, "id">) {
  const { data } = await http.post<CestaItem>("/cestaItens", item);
  return data;
}

export async function removerItemDaCesta(id: number) {
  await http.delete(`/cestaItens/${id}`);
}
