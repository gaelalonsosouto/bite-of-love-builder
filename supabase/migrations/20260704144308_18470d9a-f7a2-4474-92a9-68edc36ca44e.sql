
GRANT INSERT, UPDATE, DELETE ON public.menu_items TO authenticated;

CREATE POLICY "authenticated insert menu_items" ON public.menu_items
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "authenticated update menu_items" ON public.menu_items
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "authenticated delete menu_items" ON public.menu_items
  FOR DELETE TO authenticated USING (true);
