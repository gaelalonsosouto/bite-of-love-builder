INSERT INTO public.contenido_bloques (id, tipo, valor, etiqueta, seccion)
VALUES
  ('hero_titulo_1', 'texto', 'Franky''s Burger — Smash burgers', 'Título H1', 'hero'),
  ('hero_titulo_2', 'texto', 'en A Coruña', 'Subtítulo H1', 'hero')
ON CONFLICT (id) DO UPDATE
  SET valor = EXCLUDED.valor,
      etiqueta = EXCLUDED.etiqueta,
      updated_at = now();
