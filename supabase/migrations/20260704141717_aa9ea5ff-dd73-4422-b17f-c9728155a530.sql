
CREATE TABLE public.contenido_bloques (
  id TEXT PRIMARY KEY,
  tipo TEXT NOT NULL CHECK (tipo IN ('texto','imagen')),
  valor TEXT NOT NULL DEFAULT '',
  etiqueta TEXT NOT NULL,
  seccion TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.contenido_bloques TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contenido_bloques TO authenticated;
GRANT ALL ON public.contenido_bloques TO service_role;
ALTER TABLE public.contenido_bloques ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read contenido_bloques" ON public.contenido_bloques FOR SELECT USING (true);

CREATE TABLE public.horario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dia TEXT NOT NULL,
  horario_texto TEXT NOT NULL,
  orden INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.horario TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.horario TO authenticated;
GRANT ALL ON public.horario TO service_role;
ALTER TABLE public.horario ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read horario" ON public.horario FOR SELECT USING (true);

CREATE TABLE public.menu_categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  orden INTEGER NOT NULL,
  nota TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.menu_categorias TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.menu_categorias TO authenticated;
GRANT ALL ON public.menu_categorias TO service_role;
ALTER TABLE public.menu_categorias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read menu_categorias" ON public.menu_categorias FOR SELECT USING (true);

CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  categoria_id UUID NOT NULL REFERENCES public.menu_categorias(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  precio NUMERIC(10,2),
  descripcion TEXT NOT NULL DEFAULT '',
  imagen_url TEXT DEFAULT '',
  etiqueta TEXT,
  orden INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.menu_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.menu_items TO authenticated;
GRANT ALL ON public.menu_items TO service_role;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read menu_items" ON public.menu_items FOR SELECT USING (true);
CREATE INDEX idx_menu_items_categoria ON public.menu_items(categoria_id, orden);
