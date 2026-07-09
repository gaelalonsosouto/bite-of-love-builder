-- Replace "any authenticated user can write" policies with an admin allowlist,
-- so that only emails listed in public.admins can edit content/menu/schedule
-- or upload to the 'contenido' storage bucket. Public read access is unchanged.

CREATE TABLE public.admins (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
-- No policies on purpose: only the service_role / SQL editor can read or
-- write this table directly. Authenticated clients only ever reach it
-- through the SECURITY DEFINER function below.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admins WHERE email = auth.jwt() ->> 'email'
  );
$$;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

INSERT INTO public.admins (email) VALUES ('grupojag.contacto@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- contenido_bloques
DROP POLICY IF EXISTS "authenticated update contenido_bloques" ON public.contenido_bloques;
DROP POLICY IF EXISTS "authenticated insert contenido_bloques" ON public.contenido_bloques;
CREATE POLICY "admin update contenido_bloques" ON public.contenido_bloques
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "admin insert contenido_bloques" ON public.contenido_bloques
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());

-- horario
DROP POLICY IF EXISTS "authenticated update horario" ON public.horario;
CREATE POLICY "admin update horario" ON public.horario
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- menu_categorias
DROP POLICY IF EXISTS "authenticated insert menu_categorias" ON public.menu_categorias;
DROP POLICY IF EXISTS "authenticated update menu_categorias" ON public.menu_categorias;
DROP POLICY IF EXISTS "authenticated delete menu_categorias" ON public.menu_categorias;
CREATE POLICY "admin insert menu_categorias" ON public.menu_categorias
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "admin update menu_categorias" ON public.menu_categorias
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "admin delete menu_categorias" ON public.menu_categorias
  FOR DELETE TO authenticated USING (public.is_admin());

-- menu_items
DROP POLICY IF EXISTS "authenticated insert menu_items" ON public.menu_items;
DROP POLICY IF EXISTS "authenticated update menu_items" ON public.menu_items;
DROP POLICY IF EXISTS "authenticated delete menu_items" ON public.menu_items;
CREATE POLICY "admin insert menu_items" ON public.menu_items
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "admin update menu_items" ON public.menu_items
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "admin delete menu_items" ON public.menu_items
  FOR DELETE TO authenticated USING (public.is_admin());

-- storage.objects ('contenido' bucket)
DROP POLICY IF EXISTS "authenticated upload contenido" ON storage.objects;
DROP POLICY IF EXISTS "authenticated update contenido" ON storage.objects;
DROP POLICY IF EXISTS "authenticated delete contenido" ON storage.objects;
CREATE POLICY "admin upload contenido" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'contenido' AND public.is_admin());
CREATE POLICY "admin update contenido" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'contenido' AND public.is_admin());
CREATE POLICY "admin delete contenido" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'contenido' AND public.is_admin());

NOTIFY pgrst, 'reload schema';
