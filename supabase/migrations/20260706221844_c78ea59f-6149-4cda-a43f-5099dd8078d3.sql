
GRANT INSERT, UPDATE, DELETE ON public.menu_categorias TO authenticated;

CREATE POLICY "authenticated insert menu_categorias" ON public.menu_categorias
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "authenticated update menu_categorias" ON public.menu_categorias
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated delete menu_categorias" ON public.menu_categorias
  FOR DELETE TO authenticated USING (true);

-- Ensure deleting a category removes its items
ALTER TABLE public.menu_items
  DROP CONSTRAINT IF EXISTS menu_items_categoria_id_fkey;
ALTER TABLE public.menu_items
  ADD CONSTRAINT menu_items_categoria_id_fkey
  FOREIGN KEY (categoria_id) REFERENCES public.menu_categorias(id) ON DELETE CASCADE;
