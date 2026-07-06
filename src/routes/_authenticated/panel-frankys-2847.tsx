import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  bloquesQueryOptions,
  horarioQueryOptions,
  cartaQueryOptions,
  type Bloque,
  type HorarioRow,
  type MenuCategoria,
  type MenuItem,
} from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ImageIcon, Pencil, Plus, Trash2 } from "lucide-react";

type Group = {
  key: string;
  title: string;
  seccion: string;
  order: string[]; // preferred id ordering (rest appended)
};

const GROUPS: Group[] = [
  {
    key: "hero",
    title: "Portada (hero)",
    seccion: "hero",
    order: [
      "hero_imagen",
      "hero_badge",
      "hero_titulo_1",
      "hero_titulo_2",
      "hero_valoracion_estrellas",
      "hero_valoracion_texto",
      "hero_cta_primario",
      "hero_cta_secundario",
    ],
  },
  {
    key: "resenas",
    title: "Reseñas",
    seccion: "resenas",
    order: [
      "resenas_kicker",
      "resenas_titulo_1",
      "resenas_titulo_2",
      "resenas_nota",
      "resenas_numero",
      "resenas_texto_tarjeta",
      "resenas_cta",
    ],
  },
  {
    key: "como",
    title: "Cómo lo hacemos",
    seccion: "como_lo_hacemos",
    order: [
      "como_imagen_fondo",
      "como_kicker",
      "como_titulo_1",
      "como_titulo_2",
      "como_titulo_3",
      "como_tarjeta_1_titulo",
      "como_tarjeta_1_texto",
      "como_tarjeta_2_titulo",
      "como_tarjeta_2_texto",
      "como_tarjeta_3_titulo",
      "como_tarjeta_3_texto",
    ],
  },
  {
    key: "historia",
    title: "Nuestra historia",
    seccion: "historia",
    order: [
      "historia_imagen",
      "historia_kicker",
      "historia_titulo_1",
      "historia_titulo_2",
      "historia_parrafo_1",
      "historia_parrafo_2",
      "historia_frase_final",
    ],
  },
  {
    key: "cta",
    title: "¿Buscas calidad?",
    seccion: "cta",
    order: ["cta_titulo", "cta_texto", "cta_boton_primario", "cta_boton_secundario"],
  },
  {
    key: "ubicacion",
    title: "Ubicación",
    seccion: "ubicacion",
    order: [
      "ubicacion_kicker",
      "ubicacion_titulo_1",
      "ubicacion_titulo_2",
      "ubicacion_direccion_1",
      "ubicacion_direccion_2",
      "ubicacion_telefono",
      "ubicacion_horario_titulo",
      "ubicacion_horario_nota",
    ],
  },
  {
    key: "footer",
    title: "Footer",
    seccion: "footer",
    order: ["footer_tagline", "footer_direccion_1", "footer_direccion_2", "footer_telefono"],
  },
];

export const Route = createFileRoute("/_authenticated/panel-frankys-2847")({
  ssr: false,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(bloquesQueryOptions);
    context.queryClient.ensureQueryData(horarioQueryOptions);
    context.queryClient.ensureQueryData(cartaQueryOptions);
  },
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const { data: bloques } = useSuspenseQuery(bloquesQueryOptions);
  const { data: horario } = useSuspenseQuery(horarioQueryOptions);
  const { data: carta } = useSuspenseQuery(cartaQueryOptions);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/manage", replace: true });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-center" />
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-20">
        <div className="container-x flex items-center justify-between py-4">
          <div>
            <h1 className="font-display text-2xl">Panel admin</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Contenido editable</p>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              className="inline-flex items-center rounded-md border border-input px-3 py-2 text-sm hover:bg-accent"
            >
              Ver web
            </a>
            <Button variant="secondary" onClick={handleSignOut}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container-x py-10">
        <Tabs defaultValue="inicio">
          <TabsList className="mb-8">
            <TabsTrigger value="inicio">Inicio</TabsTrigger>
            <TabsTrigger value="carta">Carta</TabsTrigger>
          </TabsList>
          <TabsContent value="inicio" className="space-y-10">
            {GROUPS.map((g) => (
              <div key={g.key} className="space-y-10">
                <SectionForm group={g} bloques={bloques} />
                {g.key === "ubicacion" ? <HorarioForm horario={horario} /> : null}
              </div>
            ))}
          </TabsContent>
          <TabsContent value="carta">
            <CartaAdmin categorias={carta} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function useOrderedBloques(group: Group, bloques: Map<string, Bloque>): Bloque[] {
  return useMemo(() => {
    const all = Array.from(bloques.values()).filter((b) => b.seccion === group.seccion);
    const map = new Map(all.map((b) => [b.id, b]));
    const ordered: Bloque[] = [];
    for (const id of group.order) {
      const b = map.get(id);
      if (b) {
        ordered.push(b);
        map.delete(id);
      }
    }
    for (const b of map.values()) ordered.push(b);
    return ordered;
  }, [group, bloques]);
}

function SectionForm({
  group,
  bloques,
}: {
  group: Group;
  bloques: Map<string, Bloque>;
}) {
  const items = useOrderedBloques(group, bloques);
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(items.map((i) => [i.id, i.valor])),
  );
  const [saving, setSaving] = useState(false);

  function setValue(id: string, v: string) {
    setValues((prev) => ({ ...prev, [id]: v }));
  }

  async function uploadImage(id: string, file: File) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${id}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("contenido")
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (upErr) {
      toast.error(`No se pudo subir la imagen: ${upErr.message}`);
      return;
    }
    const { data } = supabase.storage.from("contenido").getPublicUrl(path);
    setValue(id, data.publicUrl);
    toast.success("Imagen subida. Recuerda guardar los cambios.");
  }

  async function onSave() {
    setSaving(true);
    const changed = items.filter((i) => values[i.id] !== i.valor);
    if (changed.length === 0) {
      setSaving(false);
      toast.info("Sin cambios.");
      return;
    }
    for (const b of changed) {
      const { error } = await supabase
        .from("contenido_bloques")
        .update({ valor: values[b.id] })
        .eq("id", b.id);
      if (error) {
        toast.error(`Error al guardar ${b.id}: ${error.message}`);
        setSaving(false);
        return;
      }
    }
    await qc.invalidateQueries({ queryKey: ["contenido_bloques"] });
    setSaving(false);
    toast.success("Cambios guardados correctamente.");
  }

  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="font-display text-xl mb-1">{group.title}</h2>
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">
        {items.length} campo{items.length === 1 ? "" : "s"}
      </p>

      <div className="grid gap-5">
        {items.map((b) =>
          b.tipo === "imagen" ? (
            <ImageField
              key={b.id}
              bloque={b}
              value={values[b.id] ?? ""}
              onChange={(v) => setValue(b.id, v)}
              onUpload={(file) => uploadImage(b.id, file)}
            />
          ) : (
            <TextField
              key={b.id}
              bloque={b}
              value={values[b.id] ?? ""}
              onChange={(v) => setValue(b.id, v)}
            />
          ),
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={onSave} disabled={saving}>
          {saving ? "Guardando…" : "Guardar cambios"}
        </Button>
      </div>
    </section>
  );
}

function TextField({
  bloque,
  value,
  onChange,
}: {
  bloque: Bloque;
  value: string;
  onChange: (v: string) => void;
}) {
  const isLong = value.length > 80 || bloque.id.includes("parrafo") || bloque.id.includes("texto");
  return (
    <div>
      <Label htmlFor={bloque.id} className="text-sm">
        {bloque.etiqueta}
      </Label>
      <p className="text-[10px] text-muted-foreground/70 mb-1 font-mono">{bloque.id}</p>
      {isLong ? (
        <Textarea
          id={bloque.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      ) : (
        <Input id={bloque.id} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function ImageField({
  bloque,
  value,
  onChange,
  onUpload,
}: {
  bloque: Bloque;
  value: string;
  onChange: (v: string) => void;
  onUpload: (file: File) => void | Promise<void>;
}) {
  const [uploading, setUploading] = useState(false);
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    await onUpload(file);
    setUploading(false);
    e.target.value = "";
  }
  return (
    <div>
      <Label htmlFor={bloque.id} className="text-sm">
        {bloque.etiqueta}
      </Label>
      <p className="text-[10px] text-muted-foreground/70 mb-2 font-mono">{bloque.id}</p>
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 rounded-md border border-border bg-muted overflow-hidden flex items-center justify-center shrink-0">
          {value ? (
            <img src={value} alt={bloque.etiqueta} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] text-muted-foreground">Sin imagen</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Input
            id={bloque.id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL de la imagen"
          />
          <label className="inline-flex items-center gap-2 text-sm">
            <span className="inline-flex items-center rounded-md border border-input px-3 py-2 hover:bg-accent cursor-pointer">
              {uploading ? "Subiendo…" : "Subir nueva foto"}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
              disabled={uploading}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function HorarioForm({ horario }: { horario: HorarioRow[] }) {
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(horario.map((h) => [h.id, h.horario_texto])),
  );
  const [saving, setSaving] = useState(false);

  async function onSave() {
    setSaving(true);
    const changed = horario.filter((h) => values[h.id] !== h.horario_texto);
    if (changed.length === 0) {
      setSaving(false);
      toast.info("Sin cambios.");
      return;
    }
    for (const h of changed) {
      const { error } = await supabase
        .from("horario")
        .update({ horario_texto: values[h.id] })
        .eq("id", h.id);
      if (error) {
        toast.error(`Error al guardar ${h.dia}: ${error.message}`);
        setSaving(false);
        return;
      }
    }
    await qc.invalidateQueries({ queryKey: ["horario"] });
    setSaving(false);
    toast.success("Horario guardado correctamente.");
  }

  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="font-display text-xl mb-1">Horario</h2>
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">
        Un día por fila · escribe "Cerrado" si no hay horario
      </p>
      <div className="grid gap-3">
        {horario.map((h) => (
          <div key={h.id} className="grid grid-cols-[120px_1fr_auto] items-center gap-3">
            <Label htmlFor={`h-${h.id}`} className="text-sm font-semibold">
              {h.dia}
            </Label>
            <Input
              id={`h-${h.id}`}
              value={values[h.id] ?? ""}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [h.id]: e.target.value }))
              }
              placeholder="Ej: 13:30–16:00 · 20:00–00:00 o Cerrado"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                setValues((prev) => ({ ...prev, [h.id]: "Cerrado" }))
              }
            >
              Cerrado
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={onSave} disabled={saving}>
          {saving ? "Guardando…" : "Guardar cambios"}
        </Button>
      </div>
    </section>
  );
}
// ─── Carta admin ──────────────────────────────────────────────────────────

type ItemDraft = {
  nombre: string;
  precio: string; // string in form, parse on save
  descripcion: string;
  etiqueta: string;
  imagen_url: string;
};

const EMPTY_DRAFT: ItemDraft = {
  nombre: "",
  precio: "",
  descripcion: "",
  etiqueta: "",
  imagen_url: "",
};

function CartaAdmin({ categorias }: { categorias: MenuCategoria[] }) {
  const first = categorias[0]?.id ?? "";
  const qc = useQueryClient();
  const [creatingCat, setCreatingCat] = useState(false);
  const [editingCat, setEditingCat] = useState<MenuCategoria | null>(null);
  const [deletingCat, setDeletingCat] = useState<MenuCategoria | null>(null);

  async function refetch() {
    await qc.invalidateQueries({ queryKey: ["carta"] });
  }

  async function handleDeleteCat() {
    if (!deletingCat) return;
    const { error } = await supabase
      .from("menu_categorias")
      .delete()
      .eq("id", deletingCat.id);
    if (error) {
      toast.error(`Error al eliminar categoría: ${error.message}`);
      return;
    }
    toast.success("Categoría eliminada.");
    setDeletingCat(null);
    await refetch();
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-xl mb-1">Carta</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            Gestiona las categorías y los productos de la carta
          </p>
        </div>
        <Button onClick={() => setCreatingCat(true)} variant="outline">
          <Plus className="mr-1" /> Nueva categoría
        </Button>
      </div>
      <Tabs defaultValue={first} orientation="vertical" className="flex flex-col md:flex-row gap-6">
        <TabsList className="md:flex-col md:h-auto md:items-stretch md:bg-muted/40 md:p-2 flex-wrap">
          {categorias.map((c) => (
            <TabsTrigger
              key={c.id}
              value={c.id}
              className="md:justify-start md:w-full data-[state=active]:bg-background"
            >
              {c.nombre}
              <span className="ml-2 text-[10px] text-muted-foreground">{c.items.length}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex-1 min-w-0">
          {categorias.map((c) => (
            <TabsContent key={c.id} value={c.id} className="mt-0">
              <CategoriaPanel
                categoria={c}
                onEditCategoria={() => setEditingCat(c)}
                onDeleteCategoria={() => setDeletingCat(c)}
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>

      {(creatingCat || editingCat) && (
        <CategoriaDialog
          open
          categoria={editingCat}
          nextOrden={
            categorias.length ? Math.max(...categorias.map((c) => c.orden)) + 1 : 0
          }
          onClose={() => {
            setCreatingCat(false);
            setEditingCat(null);
          }}
          onSaved={async () => {
            setCreatingCat(false);
            setEditingCat(null);
            await refetch();
          }}
        />
      )}

      <AlertDialog open={!!deletingCat} onOpenChange={(o) => !o && setDeletingCat(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar categoría "{deletingCat?.nombre}"?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminarán también <b>{deletingCat?.items.length ?? 0}</b> producto(s) de
              esta categoría. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCat}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar categoría
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function CategoriaPanel({
  categoria,
  onEditCategoria,
  onDeleteCategoria,
}: {
  categoria: MenuCategoria;
  onEditCategoria: () => void;
  onDeleteCategoria: () => void;
}) {
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<MenuItem | null>(null);
  const qc = useQueryClient();

  async function refetch() {
    await qc.invalidateQueries({ queryKey: ["carta"] });
  }

  async function handleDelete() {
    if (!deleting) return;
    const { error } = await supabase.from("menu_items").delete().eq("id", deleting.id);
    if (error) {
      toast.error(`Error al eliminar: ${error.message}`);
      return;
    }
    toast.success("Producto eliminado.");
    setDeleting(null);
    await refetch();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-2xl">{categoria.nombre}</h3>
          {categoria.nota && (
            <p className="text-xs text-muted-foreground italic">{categoria.nota}</p>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={onEditCategoria}>
            <Pencil /> Editar categoría
          </Button>
          <Button variant="destructive" size="sm" onClick={onDeleteCategoria}>
            <Trash2 /> Eliminar categoría
          </Button>
          <Button onClick={() => setCreating(true)}>
            <Plus className="mr-1" /> Añadir producto
          </Button>
        </div>
      </div>

      {categoria.items.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center border border-dashed border-border rounded-md">
          No hay productos en esta categoría todavía.
        </p>
      ) : (
        <ul className="grid gap-3">
          {categoria.items.map((it) => (
            <li
              key={it.id}
              className="flex items-center gap-4 rounded-md border border-border bg-background p-3"
            >
              <div className="w-16 h-16 rounded-md border border-border bg-muted overflow-hidden flex items-center justify-center shrink-0">
                {it.imagen_url ? (
                  <img
                    src={it.imagen_url}
                    alt={it.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="text-muted-foreground" size={20} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-semibold truncate">{it.nombre}</span>
                  <span className="text-tomato font-display">
                    {it.precio != null ? `${it.precio.toFixed(2)} €` : "—"}
                  </span>
                  {it.etiqueta && (
                    <span className="text-[10px] uppercase tracking-widest bg-tomato/20 text-tomato border border-tomato/40 px-2 py-0.5 rounded-full">
                      {it.etiqueta}
                    </span>
                  )}
                </div>
                {it.descripcion && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {it.descripcion}
                  </p>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => setEditing(it)}>
                  <Pencil /> Editar
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setDeleting(it)}>
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {(editing || creating) && (
        <ItemDialog
          open
          categoriaId={categoria.id}
          categoriaNombre={categoria.nombre}
          item={editing}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSaved={async () => {
            setEditing(null);
            setCreating(false);
            await refetch();
          }}
          nextOrden={
            categoria.items.length
              ? Math.max(...categoria.items.map((i) => i.orden)) + 1
              : 0
          }
        />
      )}

      <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar "{deleting?.nombre}"?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto desaparecerá de la carta pública.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ItemDialog({
  open,
  categoriaId,
  categoriaNombre,
  item,
  nextOrden,
  onClose,
  onSaved,
}: {
  open: boolean;
  categoriaId: string;
  categoriaNombre: string;
  item: MenuItem | null;
  nextOrden: number;
  onClose: () => void;
  onSaved: () => void | Promise<void>;
}) {
  const [draft, setDraft] = useState<ItemDraft>(() =>
    item
      ? {
          nombre: item.nombre,
          precio: item.precio != null ? String(item.precio) : "",
          descripcion: item.descripcion ?? "",
          etiqueta: item.etiqueta ?? "",
          imagen_url: item.imagen_url ?? "",
        }
      : EMPTY_DRAFT,
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function set<K extends keyof ItemDraft>(k: K, v: ItemDraft[K]) {
    setDraft((prev) => ({ ...prev, [k]: v }));
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `menu/${categoriaId}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("contenido")
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (upErr) {
      toast.error(`No se pudo subir la imagen: ${upErr.message}`);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("contenido").getPublicUrl(path);
    set("imagen_url", data.publicUrl);
    setUploading(false);
    e.target.value = "";
  }

  async function onSave() {
    if (!draft.nombre.trim()) {
      toast.error("El nombre es obligatorio.");
      return;
    }
    const precioNum = draft.precio.trim() === "" ? null : Number(draft.precio.replace(",", "."));
    if (precioNum != null && Number.isNaN(precioNum)) {
      toast.error("El precio no es válido.");
      return;
    }
    setSaving(true);
    const payload = {
      categoria_id: categoriaId,
      nombre: draft.nombre.trim(),
      precio: precioNum,
      descripcion: draft.descripcion,
      etiqueta: draft.etiqueta.trim() || null,
      imagen_url: draft.imagen_url || null,
    };
    if (item) {
      const { error } = await supabase.from("menu_items").update(payload).eq("id", item.id);
      if (error) {
        toast.error(`Error al guardar: ${error.message}`);
        setSaving(false);
        return;
      }
      toast.success("Producto actualizado.");
    } else {
      const { error } = await supabase
        .from("menu_items")
        .insert({ ...payload, orden: nextOrden });
      if (error) {
        toast.error(`Error al crear: ${error.message}`);
        setSaving(false);
        return;
      }
      toast.success("Producto creado.");
    }
    setSaving(false);
    await onSaved();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {item ? "Editar producto" : "Nuevo producto"} ·{" "}
            <span className="text-muted-foreground font-normal">{categoriaNombre}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div>
            <Label className="text-sm">Foto</Label>
            <div className="flex items-start gap-3 mt-1">
              <div className="w-24 h-24 rounded-md border border-border bg-muted overflow-hidden flex items-center justify-center shrink-0">
                {draft.imagen_url ? (
                  <img src={draft.imagen_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  value={draft.imagen_url}
                  onChange={(e) => set("imagen_url", e.target.value)}
                  placeholder="URL de la foto (opcional)"
                />
                <label className="inline-flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center rounded-md border border-input px-3 py-2 hover:bg-accent cursor-pointer">
                    {uploading ? "Subiendo…" : draft.imagen_url ? "Cambiar foto" : "Subir foto"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFile}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="nombre" className="text-sm">Nombre</Label>
            <Input
              id="nombre"
              value={draft.nombre}
              onChange={(e) => set("nombre", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="precio" className="text-sm">Precio (€)</Label>
            <Input
              id="precio"
              inputMode="decimal"
              placeholder="Ej: 9.50"
              value={draft.precio}
              onChange={(e) => set("precio", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="descripcion" className="text-sm">Descripción</Label>
            <Textarea
              id="descripcion"
              rows={3}
              value={draft.descripcion}
              onChange={(e) => set("descripcion", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="etiqueta" className="text-sm">Etiqueta (opcional)</Label>
            <Input
              id="etiqueta"
              value={draft.etiqueta}
              placeholder="Ej: Picante · La de la casa · 18+ · AGOTADO"
              onChange={(e) => set("etiqueta", e.target.value)}
            />
            <p className="text-[10px] text-muted-foreground mt-1">
              Pon <b>AGOTADO</b> para tachar el producto en la carta y marcarlo como no disponible.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={onSave} disabled={saving || uploading}>
            {saving ? "Guardando…" : item ? "Guardar cambios" : "Crear producto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CategoriaDialog({
  open,
  categoria,
  nextOrden,
  onClose,
  onSaved,
}: {
  open: boolean;
  categoria: MenuCategoria | null;
  nextOrden: number;
  onClose: () => void;
  onSaved: () => void | Promise<void>;
}) {
  const [nombre, setNombre] = useState(categoria?.nombre ?? "");
  const [nota, setNota] = useState(categoria?.nota ?? "");
  const [saving, setSaving] = useState(false);

  async function onSave() {
    if (!nombre.trim()) {
      toast.error("El nombre es obligatorio.");
      return;
    }
    setSaving(true);
    const payload = { nombre: nombre.trim(), nota: nota.trim() || null };
    if (categoria) {
      const { error } = await supabase
        .from("menu_categorias")
        .update(payload)
        .eq("id", categoria.id);
      if (error) {
        toast.error(`Error al guardar: ${error.message}`);
        setSaving(false);
        return;
      }
      toast.success("Categoría actualizada.");
    } else {
      const { error } = await supabase
        .from("menu_categorias")
        .insert({ ...payload, orden: nextOrden });
      if (error) {
        toast.error(`Error al crear: ${error.message}`);
        setSaving(false);
        return;
      }
      toast.success("Categoría creada.");
    }
    setSaving(false);
    await onSaved();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{categoria ? "Editar categoría" : "Nueva categoría"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="cat-nombre" className="text-sm">Nombre</Label>
            <Input
              id="cat-nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Postres"
            />
          </div>
          <div>
            <Label htmlFor="cat-nota" className="text-sm">Nota (opcional)</Label>
            <Input
              id="cat-nota"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Texto pequeño bajo el título"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={onSave} disabled={saving}>
            {saving ? "Guardando…" : categoria ? "Guardar cambios" : "Crear categoría"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
