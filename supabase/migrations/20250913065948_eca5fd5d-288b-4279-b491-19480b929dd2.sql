-- Make increment_post_views runnable by anon/authenticated and bypass RLS via SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.increment_post_views(post_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.posts 
  SET views = views + 1 
  WHERE slug = post_slug;
END;
$$;

-- Ensure anon and authenticated can execute the function
GRANT EXECUTE ON FUNCTION public.increment_post_views(text) TO anon, authenticated;