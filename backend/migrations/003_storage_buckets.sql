-- Sea Dental Storage Buckets
-- PRD Section 33: 4 buckets

-- ============================================================
-- CREATE BUCKETS
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('public-assets', 'public-assets', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('doctor-images', 'doctor-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('gallery', 'gallery', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('article-images', 'article-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- PUBLIC-ASSETS POLICIES
-- ============================================================

CREATE POLICY "Public read public-assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'public-assets');

CREATE POLICY "Admin insert public-assets" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'public-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admin update public-assets" ON storage.objects
  FOR UPDATE USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete public-assets" ON storage.objects
  FOR DELETE USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');

-- ============================================================
-- DOCTOR-IMAGES POLICIES
-- ============================================================

CREATE POLICY "Public read doctor-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'doctor-images');

CREATE POLICY "Admin insert doctor-images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'doctor-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin update doctor-images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'doctor-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete doctor-images" ON storage.objects
  FOR DELETE USING (bucket_id = 'doctor-images' AND auth.role() = 'authenticated');

-- ============================================================
-- GALLERY POLICIES
-- ============================================================

CREATE POLICY "Public read gallery" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Admin insert gallery" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Admin update gallery" ON storage.objects
  FOR UPDATE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete gallery" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- ============================================================
-- ARTICLE-IMAGES POLICIES
-- ============================================================

CREATE POLICY "Public read article-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'article-images');

CREATE POLICY "Admin insert article-images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'article-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin update article-images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'article-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete article-images" ON storage.objects
  FOR DELETE USING (bucket_id = 'article-images' AND auth.role() = 'authenticated');
