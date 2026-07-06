ALTER TABLE public.menu_items
  ADD COLUMN IF NOT EXISTS etiqueta text;

UPDATE public.menu_items
SET etiqueta = array_to_string(etiquetas, ', ')
WHERE (etiqueta IS NULL OR etiqueta = '')
  AND etiquetas IS NOT NULL
  AND array_length(etiquetas, 1) IS NOT NULL;

CREATE OR REPLACE FUNCTION public.sync_menu_item_tags()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.etiquetas IS NULL THEN
    NEW.etiquetas := '{}'::text[];
  END IF;

  IF NEW.etiqueta IS NOT NULL
    AND btrim(NEW.etiqueta) <> ''
    AND (
      TG_OP = 'INSERT'
      OR NEW.etiqueta IS DISTINCT FROM COALESCE(OLD.etiqueta, '')
    )
  THEN
    NEW.etiquetas := ARRAY(
      SELECT btrim(tag)
      FROM unnest(string_to_array(NEW.etiqueta, ',')) AS tag
      WHERE btrim(tag) <> ''
    );
  END IF;

  NEW.etiqueta := NULLIF(array_to_string(NEW.etiquetas, ', '), '');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS sync_menu_item_tags_before_write ON public.menu_items;
CREATE TRIGGER sync_menu_item_tags_before_write
BEFORE INSERT OR UPDATE ON public.menu_items
FOR EACH ROW
EXECUTE FUNCTION public.sync_menu_item_tags();

NOTIFY pgrst, 'reload schema';