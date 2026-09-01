-- Sea Dental Seed Data
-- Run after migrations to populate initial data

-- ============================================================
-- SERVICE CATEGORIES
-- ============================================================

INSERT INTO service_categories (name, slug, description, sort_order) VALUES
  ('Konservasi Gigi', 'konservasi', 'Perawatan untuk menjaga kesehatan gigi dan mulut', 1),
  ('Prosthodonti', 'prosthodonti', 'Perawatan gigi palsu dan restorasi', 2),
  ('Orthodonti', 'orthodonti', 'Perawatan kesejajaran gigi dan rahang', 3),
  ('Periodonti', 'periodonti', 'Perawatan penyakit gusi', 4),
  ('Paedodonti', 'paedodonti', 'Perawatan gigi anak', 5),
  ('Bedah Mulut', 'oral-surgery', 'Prosedur bedah pada rongga mulut', 6)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SERVICES
-- ============================================================

INSERT INTO services (name, slug, short_description, full_description, icon, is_featured, sort_order, status) VALUES
  ('Konservasi Gigi', 'konservasi-gigi', 'Perawatan untuk menjaga kesehatan gigi dan mencegah kerusakan lebih lanjut.', 'Konservasi gigi adalah cabang kedokteran gigi yang berfokus pada pencegahan dan pengobatan kerusakan gigi. Perawatan ini meliputi penambalan gigi berlubang, fluoride treatment, dan pit and fissure sealant. Tujuannya adalah mempertahankan gigi alami selama mungkin.', 'healing', true, 1, 'published'),
  ('Prosthodonti', 'prosthodonti-gigi', 'Pemasangan gigi palsu, crown, dan bridge untuk mengembalikan fungsi dan estetika.', 'Prosthodonti adalah bidang kedokteran gigi yang berfokus pada restorasi dan penggantian gigi yang hilang atau rusak. Layanan kami meliputi gigi palsu lepasan, gigi palsu tetap (crown & bridge), dan implant gigi.', 'dentistry', true, 2, 'published'),
  ('Orthodonti', 'orthodonti-gigi', 'Perapian gigi dengan behel atau aligner transparan untuk senyum sempurna.', 'Orthodonti adalah perawatan untuk memperbaiki posisi gigi yang tidak rata atau rahang yang tidak sejajar. Kami menyediakan behel gigi konvensional dan aligner transparan untuk hasil yang optimal.', 'straighten', true, 3, 'published'),
  ('Periodonti', 'periodonti-gigi', 'Perawatan penyakit gusi untuk menjaga kesehatan jaringan penyangga gigi.', 'Periodonti berfokus pada diagnosis dan pengobatan penyakit yang menyerang jaringan penyangga gigi, termasuk gusi, tulang rahang, dan ligamen periodontal. Perawatan meliputi deep cleaning, scaling, dan root planing.', 'healing', true, 4, 'published'),
  ('Paedodonti', 'paedodonti-gigi', 'Perawatan gigi khusus anak dengan pendekatan yang menyenangkan.', 'Paedodonti atau kedokteran gigi anak adalah cabang kedokteran gigi yang berfokus pada perawatan gigi anak-anak. Kami memastikan anak-anak merasa nyaman dan senang selama perawatan.', 'child_care', true, 5, 'published'),
  ('Bedah Mulut', 'bedah-mulut', 'Prosedur bedah profesional untuk berbagai kondisi rongga mulut.', 'Bedah mulut meliputi pencabutan gigi, operasi gigi bungsu, frenectomy, dan prosedur bedah lainnya pada rongga mulut. Dilakukan oleh dokter berpengalaman dengan peralatan modern.', 'content_cut', true, 6, 'published')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- DOCTORS
-- ============================================================

INSERT INTO doctors (name, slug, photo_url, professional_title, specialization, bio, instagram_url, is_featured, sort_order, status) VALUES
  ('drg. Andre Anggara', 'drg-andre-anggara', '/references/image_from_https_seadentalaesthetics.id_assets_img_doctors_andre_1.png/screen.png', 'Aesthetic Dentist & Implantologist', 'Dental Implants, Aesthetic Dentistry', 'Kesehatan gigi dan mulut merupakan hal yang sangat penting. Oleh karena itu, menjaga dan merawat gigi sejak dini perlu dilakukan.', 'https://www.instagram.com/dakumiss/', true, 1, 'published'),
  ('drg. Citra Annesha Pratiwi', 'drg-citra-annesha-pratiwi', '/references/image_from_https_seadentalaesthetics.id_assets_img_doctors_citra_2.png/screen.png', 'Dentist', 'General Dentistry, Conservative Dentistry', 'Dalam menghadapi berbagai permasalahan gigi dan mulut dibutuhkan pengalaman, keterampilan dan rasa ingin selalu belajar.', 'https://www.instagram.com/chitraannesha/', true, 2, 'published')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- ARTICLE CATEGORIES
-- ============================================================

INSERT INTO article_categories (name, slug, description) VALUES
  ('Teknologi', 'teknologi', 'Artikel tentang teknologi kedokteran gigi terbaru'),
  ('Perawatan', 'perawatan', 'Tips dan panduan perawatan gigi'),
  ('Kesehatan', 'kesehatan', 'Informasi kesehatan gigi dan mulut')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- ARTICLES
-- ============================================================

INSERT INTO articles (title, slug, excerpt, content, cover_image, category_id, status, published_at) VALUES
  ('Pentingnya Digital Smile Design', 'pentingnya-digital-smile-design', 'Bagaimana teknologi digital membantu merancang senyum impian Anda dengan presisi tinggi.', '<p>Digital Smile Design (DSD) adalah pendekatan revolusioner dalam kedokteran gigi estetik.</p>', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_1.jpeg/screen.png', (SELECT id FROM article_categories WHERE slug = 'teknologi'), 'published', NOW()),
  ('Tips Merawat Veneer Gigi', 'tips-merawat-veneer-gigi', 'Panduan lengkap menjaga ketahanan dan kilau veneer gigi Anda.', '<p>Veneer gigi adalah solusi estetik populer untuk mendapatkan senyum sempurna.</p>', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_5.jpeg/screen.png', (SELECT id FROM article_categories WHERE slug = 'perawatan'), 'published', NOW()),
  ('Gigi Sensitif: Penyebab dan Solusi', 'gigi-sensitif-penyebab-dan-solusi', 'Memahami akar masalah gigi sensitif dan bagaimana penanganannya.', '<p>Gigi sensitif adalah masalah umum yang dialami banyak orang.</p>', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_8.jpeg/screen.png', (SELECT id FROM article_categories WHERE slug = 'kesehatan'), 'published', NOW())
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- LOCATIONS
-- ============================================================

INSERT INTO locations (name, slug, address, phone, whatsapp, operating_hours, google_maps_url, description, sort_order, status) VALUES
  ('Simpang Haru', 'simpang-haru', 'Jl. DR. Sutomo No. 4, Simpang Haru, Padang, Sumatera Barat', '+6281366329279', 'https://api.whatsapp.com/send/?phone=6281266971089', 'Senin-Sabtu 11.00-21.00 WIB', 'https://goo.gl/maps/LkT48FJyr2uuESkP8', 'Klinik utama SEA Dental Aesthetics dengan fasilitas lengkap.', 1, 'published'),
  ('Baru', 'baru', 'Jl. Khatib Sulaiman, Padang, Sumatera Barat', '+6281366329279', 'https://api.whatsapp.com/send/?phone=6281266971089', 'Senin-Minggu 10.00-20.00 WIB', '#', 'Cabang kedua kami dengan akses mudah.', 2, 'published')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- FAQS
-- ============================================================

INSERT INTO faqs (question, answer, category, sort_order, status) VALUES
  ('Bagaimana cara menjaga kebersihan gigi dan mulut?', 'Menjaga kebersihan rongga mulut dapat dilakukan dengan: menyikat gigi 2x sehari, berkumur menggunakan obat kumur, rutin membersihkan karang gigi (6 bulan sekali).', 'Perawatan', 1, 'published'),
  ('Kapan saja waktu yang tepat untuk menyikat gigi?', 'Waktu yang dianjurkan untuk menyikat gigi ialah pada pagi hari setelah sarapan dan malam sebelum tidur.', 'Perawatan', 2, 'published'),
  ('Bagaimana cara menghindari bau mulut?', 'Bau mulut dapat dihindari dengan: menyikat gigi 2 kali sehari, rutin mengganti sikat gigi, berkumur menggunakan obat kumur.', 'Kesehatan', 3, 'published'),
  ('Apakah menerima BPJS Kesehatan?', 'Untuk saat ini, SEA Dental Aesthetics belum menerima BPJS Kesehatan.', 'Umum', 4, 'published'),
  ('Bagaimana cara membuat janji temu?', 'Anda dapat membuat janji temu melalui website kami atau langsung menghubungi via WhatsApp.', 'Umum', 5, 'published'),
  ('Apakah perawatan gigi di sini sakit?', 'Dokter dan tim kami akan memastikan Anda merasa nyaman selama perawatan.', 'Perawatan', 6, 'published'),
  ('Berapa lama proses pemasangan behel gigi?', 'Durasi bervariasi tergantung kondisi gigi. Rata-rata 1-2 tahun.', 'Perawatan', 7, 'published'),
  ('Apakah bisa konsultasi secara online?', 'Ya, kami menyediakan konsultasi online melalui WhatsApp atau video call.', 'Umum', 8, 'published')
ON CONFLICT DO NOTHING;

-- ============================================================
-- TESTIMONIALS
-- ============================================================

INSERT INTO testimonials (patient_name, patient_title, content, rating, is_featured, sort_order, status) VALUES
  ('Silvi Triana Helmi', 'Mahasiswa', 'Pelayanan disini sangat baik, dilayani oleh dokter yang baik, ramah. Kualitas hasil perawatan bagus. Sangat recommended.', 5, true, 1, 'published'),
  ('Sri Mutmainah', 'Pasien Estetik', 'Pelayanan memuaskan, tempat juga bersih dan wangi pokoknya terbaik.', 5, true, 2, 'published'),
  ('Lala', 'Pasien Scaling', 'Seneng banget perawatan disinii, dokter nya the best dan ramah-ramah juga, pelayanannya superr best bangett.', 5, true, 3, 'published')
ON CONFLICT DO NOTHING;

-- ============================================================
-- GALLERY ITEMS
-- ============================================================

INSERT INTO gallery_items (title, image_url, category, sort_order, status) VALUES
  ('Galeri 1', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_1.jpeg/screen.png', 'klinik', 1, 'published'),
  ('Galeri 2', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_2.jpeg/screen.png', 'klinik', 2, 'published'),
  ('Galeri 3', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_3.jpeg/screen.png', 'perawatan', 3, 'published'),
  ('Galeri 4', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_4.jpeg/screen.png', 'perawatan', 4, 'published'),
  ('Galeri 5', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_5.jpeg/screen.png', 'hasil', 5, 'published'),
  ('Galeri 6', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_6.jpeg/screen.png', 'hasil', 6, 'published'),
  ('Galeri 7', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_7.jpeg/screen.png', 'klinik', 7, 'published'),
  ('Galeri 8', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_8.jpeg/screen.png', 'perawatan', 8, 'published'),
  ('Galeri 9', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_9.jpeg/screen.png', 'hasil', 9, 'published'),
  ('Galeri 10', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_10.jpeg/screen.png', 'klinik', 10, 'published'),
  ('Galeri 11', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_11.jpeg/screen.png', 'perawatan', 11, 'published'),
  ('Galeri 12', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_12.jpeg/screen.png', 'hasil', 12, 'published'),
  ('Galeri 13', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_13.jpeg/screen.png', 'klinik', 13, 'published'),
  ('Galeri 15', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_15.jpeg/screen.png', 'perawatan', 14, 'published'),
  ('Galeri 16', '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_16.jpeg/screen.png', 'hasil', 15, 'published')
ON CONFLICT DO NOTHING;

-- ============================================================
-- SITE SETTINGS
-- ============================================================

INSERT INTO site_settings (key, value) VALUES
  ('clinic_name', '"SEA Dental Aesthetics"'),
  ('clinic_phone', '"+6281366329279"'),
  ('clinic_whatsapp', '"+6281266971089"'),
  ('clinic_email', '"seadentalaesthetics@gmail.com"'),
  ('clinic_address', '"Jl. DR. Sutomo No. 4, Simpang Haru, Padang, Sumatera Barat"'),
  ('operating_hours', '"Senin-Sabtu 11.00-21.00 WIB"'),
  ('booking_url', '"https://booking.seadentalaesthetics.id/booking/register"'),
  ('instagram_url', '"https://www.instagram.com/seadentalaesthetics_/"'),
  ('google_analytics_id', '"G-TNZMMM7JFT"'),
  ('google_ads_id', '"AW-17374334711"')
ON CONFLICT (key) DO NOTHING;
