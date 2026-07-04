
-- Allow authenticated users to update contenido_bloques and horario
CREATE POLICY "authenticated update contenido_bloques" ON public.contenido_bloques FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated insert contenido_bloques" ON public.contenido_bloques FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "authenticated update horario" ON public.horario FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

GRANT UPDATE, INSERT ON public.contenido_bloques TO authenticated;
GRANT UPDATE ON public.horario TO authenticated;
