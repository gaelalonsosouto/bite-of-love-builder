
CREATE POLICY "public read contenido bucket" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'contenido');
CREATE POLICY "authenticated upload contenido" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'contenido');
CREATE POLICY "authenticated update contenido" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'contenido');
CREATE POLICY "authenticated delete contenido" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'contenido');
