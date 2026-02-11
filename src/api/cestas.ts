import { http } from "./http";

export type Cesta = {
  id: number;
  nome: string;
  data: string; // YYYY-MM-DD
};

export async function listarCestas() {
  const { data } = await http.get<Cesta[]>("/cestas");
  return data;
}

export async function criarCesta(cesta: Omit<Cesta, "id">) {
  const { data } = await http.post<Cesta>("/cestas", cesta);
  return data;
}
