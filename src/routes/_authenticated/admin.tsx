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

export const Route = createFileRoute("/_authenticated/admin")({
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
    navigate({ to: "/auth", replace: true });
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
              <SectionForm key={g.key} group={g} bloques={bloques} />
            ))}
            <HorarioForm horario={horario} />
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