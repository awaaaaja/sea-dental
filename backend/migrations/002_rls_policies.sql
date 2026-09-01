-- Sea Dental RLS Policies
-- Aligns with PRD.md Section 32

-- ============================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PUBLIC CONTENT: anon can SELECT published records
-- ============================================================

CREATE POLICY "Public read services" ON services
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read service_categories" ON service_categories
  FOR SELECT USING (true);

CREATE POLICY "Public read doctors" ON doctors
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read article_categories" ON article_categories
  FOR SELECT USING (true);

CREATE POLICY "Public read articles" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read gallery_items" ON gallery_items
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read locations" ON locations
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read faqs" ON faqs
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read testimonials" ON testimonials
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read site_settings" ON site_settings
  FOR SELECT USING (true);

-- ============================================================
-- ANONYMOUS: can INSERT bookings and inquiries (contact form)
-- ============================================================

CREATE POLICY "Anon insert bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anon insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- ============================================================
-- ADMIN: authenticated users with role can CRUD
-- ============================================================

-- Profiles: users read own, super_admin reads all
CREATE POLICY "Users read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Super admin read all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Super admin update profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Services: admin CRUD
CREATE POLICY "Admin insert services" ON services
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin update services" ON services
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin delete services" ON services
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Doctors: admin CRUD
CREATE POLICY "Admin insert doctors" ON doctors
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin update doctors" ON doctors
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin delete doctors" ON doctors
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Articles: admin CRUD
CREATE POLICY "Admin insert articles" ON articles
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin update articles" ON articles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin delete articles" ON articles
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Gallery: admin CRUD
CREATE POLICY "Admin insert gallery_items" ON gallery_items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin update gallery_items" ON gallery_items
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin delete gallery_items" ON gallery_items
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Locations: admin CRUD
CREATE POLICY "Admin insert locations" ON locations
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin update locations" ON locations
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin delete locations" ON locations
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- FAQs: admin CRUD
CREATE POLICY "Admin insert faqs" ON faqs
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin update faqs" ON faqs
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin delete faqs" ON faqs
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Testimonials: admin CRUD
CREATE POLICY "Admin insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin update testimonials" ON testimonials
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin delete testimonials" ON testimonials
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Bookings: admin read/update
CREATE POLICY "Admin read bookings" ON bookings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor', 'staff'))
  );

CREATE POLICY "Admin update bookings" ON bookings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor', 'staff'))
  );

-- Inquiries: admin read/update
CREATE POLICY "Admin read inquiries" ON inquiries
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor', 'staff'))
  );

CREATE POLICY "Admin update inquiries" ON inquiries
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor', 'staff'))
  );

-- Site settings: admin CRUD
CREATE POLICY "Admin insert site_settings" ON site_settings
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Admin update site_settings" ON site_settings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Admin delete site_settings" ON site_settings
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Media assets: admin CRUD
CREATE POLICY "Admin insert media_assets" ON media_assets
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin read media_assets" ON media_assets
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor'))
  );

CREATE POLICY "Admin delete media_assets" ON media_assets
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Audit logs: admin read, system insert
CREATE POLICY "Admin read audit_logs" ON audit_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "System insert audit_logs" ON audit_logs
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'editor', 'staff'))
  );
