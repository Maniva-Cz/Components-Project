import { http } from "./http";

export type TipoPostagem = "Oferta" | "Ajuda" | "Geral";

export type Postagem = {
  id: number;
  titulo: string;
  mensagem: string;
  data: string;
  autor: string;
  tipo: TipoPostagem;
};

export async function listarAvisos() {
  const { data } = await http.get<Postagem[]>("/mural");
  return data;
}
