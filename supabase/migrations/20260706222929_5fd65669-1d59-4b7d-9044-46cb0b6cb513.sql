ALTER TABLE public.menu_items ADD COLUMN etiquetas text[] NOT NULL DEFAULT '{}';
UPDATE public.menu_items SET etiquetas = CASE WHEN etiqueta IS NULL OR etiqueta = '' THEN '{}'::text[] ELSE ARRAY[etiqueta] END;
ALTER TABLE public.menu_items DROP COLUMN etiqueta;