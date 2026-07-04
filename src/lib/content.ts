import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Bloque = {
  id: string;
  tipo: "texto" | "imagen";
  valor: string;
  etiqueta: string;
  seccion: string;
};

export type HorarioRow = {
  id: string;
  dia: string;
  horario_texto: string;
  orden: number;
};

export type MenuItem = {
  id: string;
  categoria_id: string;
  nombre: string;
  precio: number | null;
  descripcion: string;
  imagen_url: string | null;
  etiqueta: string | null;
  orden: number;
};

export type MenuCategoria = {
  id: string;
  nombre: string;
  orden: number;
  nota: string | null;
  items: MenuItem[];
};

export const bloquesQueryOptions = queryOptions({
  queryKey: ["contenido_bloques"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("contenido_bloques")
      .select("id, tipo, valor, etiqueta, seccion");
    if (error) throw error;
    const map = new Map<string, Bloque>();
    for (const row of (data ?? []) as Bloque[]) map.set(row.id, row);
    return map;
  },
});

export const horarioQueryOptions = queryOptions({
  queryKey: ["horario"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("horario")
      .select("id, dia, horario_texto, orden")
      .order("orden", { ascending: true });
    if (error) throw error;
    return (data ?? []) as HorarioRow[];
  },
});

export const cartaQueryOptions = queryOptions({
  queryKey: ["carta"],
  queryFn: async () => {
    const [catsRes, itemsRes] = await Promise.all([
      supabase.from("menu_categorias").select("id, nombre, orden, nota").order("orden"),
      supabase
        .from("menu_items")
        .select("id, categoria_id, nombre, precio, descripcion, imagen_url, etiqueta, orden")
        .order("orden"),
    ]);
    if (catsRes.error) throw catsRes.error;
    if (itemsRes.error) throw itemsRes.error;
    const cats = (catsRes.data ?? []) as Omit<MenuCategoria, "items">[];
    const items = (itemsRes.data ?? []) as MenuItem[];
    return cats.map((c) => ({
      ...c,
      items: items.filter((i) => i.categoria_id === c.id),
    })) as MenuCategoria[];
  },
});

export function t(bloques: Map<string, Bloque>, id: string, fallback = ""): string {
  return bloques.get(id)?.valor ?? fallback;
}