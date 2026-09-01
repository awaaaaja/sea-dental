-- Sea Dental Seed Data
-- Real data from references/Design.md

-- ============================================================
-- SERVICE CATEGORIES
-- ============================================================

INSERT INTO service_categories (id, name, slug, description, sort_order) VALUES
  ('cat-cons-001', 'Konservasi', 'konservasi', 'Mempertahankan dan menjaga gigi', 1),
  ('cat-pros-002', 'Prosthodonti', 'prosthodonti', 'Penggantian gigi hilang atau patah', 2),
  ('cat-orth-003', 'Orthodonti', 'orthodonti', 'Perawatan susunan gigi', 3),
  ('cat-peri-004', 'Periodonti', 'periodonti', 'Perawatan jaringan pendukung gigi', 4),
  ('cat-paed-005', 'Paedodonti', 'paedodonti', 'Perawatan gigi dan mulut anak', 5),
  ('cat-oral-006', 'Oral Surgery', 'oral-surgery', 'Bedah untuk memperbaiki kondisi kesehatan gigi dan mulut', 6);

-- ============================================================
-- SERVICES
-- ============================================================

INSERT INTO services (id, category_id, name, slug, short_description, full_description, icon, is_featured, sort_order, status) VALUES
  ('svc-001', 'cat-cons-001', 'Konservasi', 'konservasi', 'Spesialisasi ilmu kedokteran gigi yang berfokus pada tindakan mempertahankan dan menjaga gigi baik secara fungsi maupun estetika.', 'Spesialisasi ilmu kedokteran gigi yang berfokus pada tindakan mempertahankan dan menjaga gigi baik secara fungsi maupun estetika. Meliputi penambalan gigi berlubang, perawatan saluran akar, dan pemulihan gigi yang rusak.', 'healing', true, 1, 'published'),
  ('svc-002', 'cat-pros-002', 'Prosthodonti', 'prosthodonti', 'Spesialisasi ilmu kedokteran gigi yang berfokus pada penggantian gigi yang hilang atau patah.', 'Spesialisasi ilmu kedokteran gigi yang berfokus pada penggantian gigi yang hilang atau patah. Meliputi gigi tiruan, crown, bridge, dan implan gigi.', 'dentistry', true, 2, 'published'),
  ('svc-003', 'cat-orth-003', 'Orthodonti', 'orthodonti', 'Spesialisasi ilmu kedokteran gigi yang berfokus pada perawatan susunan gigi dalam lengkung rahang.', 'Spesialisasi ilmu kedokteran gigi yang berfokus pada perawatan susunan gigi dalam lengkung rahang. Meliputi kawat gigi konvensional dan clear aligner.', 'straighten', true, 3, 'published'),
  ('svc-004', 'cat-peri-004', 'Periodonti', 'periodonti', 'Spesialisasi ilmu kedokteran gigi yang berfokus pada perawatan jaringan pendukung gigi.', 'Spesialisasi ilmu kedokteran gigi yang berfokus pada perawatan jaringan pendukung gigi. Meliputi perawatan gusi, pembersihan karang gigi, dan operasi gusi.', 'gum', false, 4, 'published'),
  ('svc-005', 'cat-paed-005', 'Paedodonti', 'paedodonti', 'Spesialisasi ilmu kedokteran gigi yang berfokus pada tindakan perawatan gigi dan mulut anak.', 'Spesialisasi ilmu kedokteran gigi yang berfokus pada tindakan perawatan gigi dan mulut anak. Meliputi pencegahan, perawatan, dan edukasi kesehatan gigi anak.', 'child_care', false, 5, 'published'),
  ('svc-006', 'cat-oral-006', 'Oral Surgery', 'oral-surgery', 'Spesialisasi ilmu kedokteran gigi yang berfokus pada tindakan bedah untuk memperbaiki kondisi kesehatan gigi dan mulut.', 'Spesialisasi ilmu kedokteran gigi yang berfokus pada tindakan bedah untuk memperbaiki kondisi kesehatan gigi dan mulut. Meliputi pencabutan gigi, operasi gigi bungsu, dan pemasangan implan.', 'surgery', true, 6, 'published');

-- ============================================================
-- DOCTORS
-- ============================================================

INSERT INTO doctors (id, name, slug, photo_url, professional_title, specialization, bio, instagram_url, is_featured, sort_order, status) VALUES
  ('doc-001', 'drg. Andre Anggara', 'drg-andre-anggara', '/images/doctors/andre.png', 'Aesthetic Dentist & Implantologist', 'Konservasi, Prosthodonti, Implan', 'Kesehatan gigi dan mulut merupakan hal yang sangat penting. Oleh karena itu, menjaga dan merawat gigi sejak dini perlu dilakukan.', 'https://www.instagram.com/dakumiss/', true, 1, 'published'),
  ('doc-002', 'drg. Citra Annesha Pratiwi', 'drg-citra-annesha-pratiwi', '/images/doctors/citra.png', 'Dentist', 'Konservasi, Orthodonti', 'Dalam menghadapi berbagai permasalahan gigi dan mulut dibutuhkan pengalaman, keterampilan dan rasa ingin selalu belajar.', 'https://www.instagram.com/chitraannesha/', true, 2, 'published');

-- ============================================================
-- ARTICLE CATEGORIES
-- ============================================================

INSERT INTO article_categories (id, name, slug, description) VALUES
  ('acat-001', 'Teknologi', 'teknologi', 'Artikel tentang teknologi kedokteran gigi terkini'),
  ('acat-002', 'Perawatan', 'perawatan', 'Artikel tentang perawatan gigi dan mulut'),
  ('acat-003', 'Kesehatan', 'kesehatan', 'Artikel tentang kesehatan gigi dan mulut');

-- ============================================================
-- LOCATIONS
-- ============================================================

INSERT INTO locations (id, name, slug, address, phone, whatsapp, operating_hours, google_maps_url, latitude, longitude, description, sort_order, status) VALUES
  ('loc-001', 'Simpang Haru', 'simpang-haru', 'Jl. DR. Sutomo No. 4, Simpang Haru, Padang, Sumatera Barat', '+6281366329279', '+6281266971089', 'Senin-Sabtu 11.00-21.00 WIB', 'https://goo.gl/maps/LkT48FJyr2uuESkP8', -0.9471, 100.4172, 'Depan SMA Kartika 1-5', 1, 'published'),
  ('loc-002', 'Baru', 'baru', 'Jl. Khatib Sulaiman, Padang, Sumatera Barat', '+6281366329279', '+6281266971089', 'Senin-Minggu 10.00-20.00 WIB', NULL, -0.9495, 100.4118, 'Cabang Baru', 2, 'published');

-- ============================================================
-- FAQS
-- ============================================================

INSERT INTO faqs (id, question, answer, sort_order, status) VALUES
  ('faq-001', 'Bagaimana cara menjaga kebersihan gigi dan mulut?', 'Menjaga kebersihan rongga mulut dapat dilakukan dengan berbagai cara: a. Menyikat gigi dengan baik 2x sehari pada pagi dan malam. b. Berkumur menggunakan obat kumur. c. Rutin membersihkan karang gigi (6 bulan sekali). d. Kontrol ke dokter gigi minimal 6 bulan sekali.', 1, 'published'),
  ('faq-002', 'Kapan saja waktu yang tepat untuk menyikat gigi?', 'Waktu yang dianjurkan untuk menyikat gigi ialah pada pagi hari setelah sarapan dan malam sebelum tidur.', 2, 'published'),
  ('faq-003', 'Bagaimana cara menghindari bau mulut?', 'Bau mulut dapat dihindari dengan berbagai cara: a. Menyikat gigi dengan baik 2 kali sehari pagi dan malam. b. Rutin mengganti sikat gigi maksimal 2 bulan sekali. c. Berkumur menggunakan obat kumur. d. Rutin membersihkan karang gigi (6 bulan sekali). e. Banyak mengkonsumsi air putih. f. Mengkonsumsi makanan sehat seperti buah dan sayur. g. Hindari merokok.', 3, 'published'),
  ('faq-004', 'Kapan sebaiknya pembersihan karang gigi dilakukan?', 'Membersihkan karang gigi idealnya dilakukan minimal 6 bulan sekali (2 kali dalam setahun), tetapi pada kasus tertentu, jika pembentukan karang didalam rongga mulut berlangsung cepat, dianjurkan untuk melakukan pembersihan karang gigi minimal 3 bulan sekali.', 4, 'published'),
  ('faq-005', 'Apa saja yang harus diperhatikan setelah melakukan pencabutan gigi?', 'Setelah melakukan pencabutan gigi, pasien dianjurkan untuk: 1. Menggigit tampon lebih kurang 30-45 menit. 2. Hindari bermain lidah pada daerah pasca pencabutan. 3. Hindari mengkonsumsi minuman atau makanan panas. 4. Dianjurkan untuk mengkonsumsi makanan dan minuman dingin. 5. Hindari merokok. 6. Minum obat pereda nyeri jika dibutuhkan.', 5, 'published');

-- ============================================================
-- TESTIMONIALS
-- ============================================================

INSERT INTO testimonials (id, patient_name, patient_title, content, rating, is_featured, sort_order, status) VALUES
  ('tst-001', 'Silvi Triana Helmi', 'Mahasiswa', 'Pengalaman saya selama perawatan gigi di SEA Dental Aesthetics dari segi pelayanan disini sangat baik, dilayani oleh dokter yang baik, ramah selama perawatan. Kualitas dari hasil perawatan sampai pemasangan crown bagus. Sangat recommended perawatan gigi disini.', 5, true, 1, 'published'),
  ('tst-002', 'Sri Mutmainah', 'Pasien Estetik', 'Pelayanan memuaskan, tempat juga bersih dan wangi pokoknya terbaik.', 5, true, 2, 'published'),
  ('tst-003', 'Lala', 'Pasien Scaling', 'Seneng banget perawatan disinii, dokter nya the best dan ramah-ramah juga, pelayanannya superr best bangett.', 5, true, 3, 'published');

-- ============================================================
-- GALLERY ITEMS
-- ============================================================

INSERT INTO gallery_items (id, title, image_url, category, sort_order, status) VALUES
  ('gal-001', 'Galeri 1', '/images/gallery/galeri-1.jpeg', 'hasil perawatan', 1, 'published'),
  ('gal-002', 'Galeri 2', '/images/gallery/galeri-2.jpeg', 'hasil perawatan', 2, 'published'),
  ('gal-003', 'Galeri 3', '/images/gallery/galeri-3.jpeg', 'hasil perawatan', 3, 'published'),
  ('gal-004', 'Galeri 4', '/images/gallery/galeri-4.jpeg', 'hasil perawatan', 4, 'published'),
  ('gal-005', 'Galeri 5', '/images/gallery/galeri-5.jpeg', 'hasil perawatan', 5, 'published'),
  ('gal-006', 'Galeri 6', '/images/gallery/galeri-6.jpeg', 'hasil perawatan', 6, 'published'),
  ('gal-007', 'Galeri 7', '/images/gallery/galeri-7.jpeg', 'hasil perawatan', 7, 'published'),
  ('gal-008', 'Galeri 8', '/images/gallery/galeri-8.jpeg', 'hasil perawatan', 8, 'published'),
  ('gal-009', 'Galeri 9', '/images/gallery/galeri-9.jpeg', 'hasil perawatan', 9, 'published'),
  ('gal-010', 'Galeri 10', '/images/gallery/galeri-10.jpeg', 'hasil perawatan', 10, 'published'),
  ('gal-011', 'Galeri 11', '/images/gallery/galeri-11.jpeg', 'hasil perawatan', 11, 'published'),
  ('gal-012', 'Galeri 12', '/images/gallery/galeri-12.jpeg', 'hasil perawatan', 12, 'published'),
  ('gal-013', 'Galeri 13', '/images/gallery/galeri-13.jpeg', 'hasil perawatan', 13, 'published'),
  ('gal-014', 'Galeri 14', '/images/gallery/galeri-14.jpeg', 'hasil perawatan', 14, 'published'),
  ('gal-015', 'Galeri 15', '/images/gallery/galeri-15.jpeg', 'hasil perawatan', 15, 'published'),
  ('gal-016', 'Galeri 16', '/images/gallery/galeri-16.jpeg', 'hasil perawatan', 16, 'published');

-- ============================================================
-- SITE SETTINGS
-- ============================================================

INSERT INTO site_settings (key, value) VALUES
  ('clinic_name', '"SEA Dental Aesthetics"'),
  ('tagline', '"Klinik Gigi Estetik Padang"'),
  ('phone', '"+6281366329279"'),
  ('email', '"seadentalaesthetics@gmail.com"'),
  ('whatsapp', '"+6281266971089"'),
  ('instagram', '"@seadentalaesthetics_"'),
  ('address', '"Jl. DR. Sutomo No. 4, Simpang Haru, Padang, Sumatera Barat"'),
  ('business_hours', '"Senin-Sabtu 11.00-21.00 WIB"'),
  ('google_maps_url', '"https://goo.gl/maps/LkT48FJyr2uuESkP8"'),
  ('booking_url', '"https://booking.seadentalaesthetics.id/booking/register"'),
  ('ga4_id', '"G-TNZMMM7JFT"'),
  ('google_ads_id', '"AW-17374334711"');
