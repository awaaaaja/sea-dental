export interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  author: string
  readTime: string
  image: string
}

export const articleCategories = [
  { key: 'all', label: 'Semua' },
  { key: 'Teknologi', label: 'Teknologi' },
  { key: 'Perawatan', label: 'Perawatan' },
  { key: 'Kesehatan', label: 'Kesehatan' },
]

export const articles: Article[] = [
  {
    slug: 'pentingnya-digital-smile-design',
    title: 'Pentingnya Digital Smile Design dalam Estetika Gigi',
    excerpt: 'Bagaimana teknologi digital membantu merancang senyum impian Anda dengan presisi tinggi.',
    content: `<p>Digital Smile Design (DSD) adalah pendekatan revolusioner dalam kedokteran gigi estetik yang memungkinkan dokter dan pasien untuk merancang senyum impian secara digital sebelum perawatan dimulai.</p>

<h2>Apa itu Digital Smile Design?</h2>
<p>DSD menggunakan teknologi fotografi dan video digital untuk menganalisis senyum pasien. Dengan perangkat lunak khusus, dokter dapat membuat simulasi hasil akhir perawatan sehingga pasien dapat melihat hasilnya sebelum memulai treatment.</p>

<h2>Keunggulan DSD</h2>
<ul>
<li><strong>Presisi Tinggi:</strong> Setiap detail senyum direncanakan dengan akurat</li>
<li><strong>Hasil Prediktif:</strong> Pasien dapat melihat hasil akhir sebelum treatment</li>
<li><strong>Komunikasi Lebih Baik:</strong> Dokter dan pasien memiliki pemahaman yang sama tentang hasil yang diinginkan</li>
<li><strong>Estetika Optimal:</strong> Senyum dirancang sesuai proporsi wajah pasien</li>
</ul>

<h2>Proses Digital Smile Design</h2>
<p>Proses DSD dimulai dengan pengambilan foto dan video digital wajah pasien. Dokter kemudian menganalisis proporsi senyum, garis gusi, dan simetri wajah. Hasil analisis digunakan untuk membuat rencana perawatan yang personal dan optimal.</p>

<p>Di SEA Dental Aesthetics, kami menggunakan teknologi DSD untuk memastikan setiap pasien mendapatkan senyum yang sesuai dengan keinginan dan kebutuhan mereka.</p>`,
    category: 'Teknologi',
    date: '12 Okt 2024',
    author: 'drg. Andre Anggara',
    readTime: '5 min',
    image: '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_1.jpeg/screen.png',
  },
  {
    slug: 'tips-merawat-veneer-gigi',
    title: 'Tips Merawat Veneer Gigi agar Tetap Sempurna',
    excerpt: 'Panduan lengkap menjaga ketahanan dan kilau veneer gigi Anda agar tetap sempurna.',
    content: `<p>Veneer gigi adalah solusi estetik populer untuk mendapatkan senyum sempurna. Berikut tips merawat veneer agar tetap awet dan berkilau.</p>

<h2>Apa itu Veneer Gigi?</h2>
<p>Veneer adalah lapisan tipis dari bahan keramik atau komposit yang ditempelkan pada permukaan gigi depan. Veneer membantu memperbaiki bentuk, warna, dan tampilan gigi secara keseluruhan.</p>

<h2>Tips Perawatan Veneer</h2>
<ol>
<li><strong>Menyikat Gigi secara Teratur:</strong> Sikat gigi minimal 2 kali sehari dengan pasta gigi yang tidak abrasif</li>
<li><strong>Hindari Gigit Keras:</strong> Jangan menggigit benda keras seperti es batu atau membuka kemasan dengan gigi</li>
<li><strong>Pakai Mouthguard:</strong> Gunakan pelindung gigi saat olahraga atau jika Anda memiliki kebiasaan menggertakkan gigi</li>
<li><strong> Rutin ke Dokter Gigi:</strong> Kontrol ke dokter gigi minimal 6 bulan sekali untuk pengecekan veneer</li>
<li><strong>Hindari Makanan Pewarna:</strong> Kurangi konsumsi kopi, teh, atau makanan yang dapat menyebabkan noda</li>
</ol>

<h2>Yang Perlu Diperhatikan</h2>
<p>Veneer bukan solusi permanen selamanya. Dengan perawatan yang baik, veneer dapat bertahan 10-15 tahun. Namun, perawatan yang buruk dapat memperpendek usia veneer Anda.</p>

<p>Di SEA Dental Aesthetics, kami menggunakan veneer berkualitas tinggi dan memberikan panduan perawatan lengkap kepada setiap pasien.</p>`,
    category: 'Perawatan',
    date: '08 Okt 2024',
    author: 'drg. Citra Annesha Pratiwi',
    readTime: '4 min',
    image: '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_5.jpeg/screen.png',
  },
  {
    slug: 'gigi-sensitif-penyebab-dan-solusi',
    title: 'Gigi Sensitif: Penyebab dan Solusi yang Efektif',
    excerpt: 'Memahami akar masalah gigi sensitif dan bagaimana penanganan estetik dapat membantu.',
    content: `<p>Gigi sensitif adalah masalah umum yang dialami banyak orang. Memahami penyebabnya adalah langkah pertama untuk menemukan solusi yang tepat.</p>

<h2>Penyebab Gigi Sensitif</h2>
<ul>
<li><strong>Enamel Tipis:</strong> Lapisan enamel gigi yang menipis dapat meng暴露 dentin yang sensitif</li>
<li><strong>Gusi Turun:</strong> Gusi yang turun dapat meng暴露 akar gigi yang sensitif</li>
<li><strong>Gigi Retak:</strong> Retakan pada gigi dapat menjadi jalur masuk untuk rangsangan</li>
<li><strong>Karies:</strong> Lubang gigi yang belum ditangani dapat menyebabkan sensitivitas</li>
</ul>

<h2>Solusi untuk Gigi Sensitif</h2>
<p>Penanganan gigi sensitif tergantung pada penyebabnya. Beberapa solusi yang umum digunakan:</p>
<ul>
<li>Pasta gigi khusus gigi sensitif</li>
<li>Fluoride treatment untuk memperkuat enamel</li>
<li>Bonding atau veneer untuk menutupi area sensitif</li>
<li>Treatment gusi jika masalah terjadi pada gusi</li>
</ul>

<h2>Pencegahan</h2>
<p>Mencegah lebih baik daripada mengobati. Gunakan sikat gigi berbulu lembut, hindari makanan terlalu panas atau dingin, dan rutin kontrol ke dokter gigi.</p>

<p>Di SEA Dental Aesthetics, dokter kami akan membantu mengidentifikasi penyebab gigi sensitif Anda dan memberikan treatment yang tepat.</p>`,
    category: 'Kesehatan',
    date: '05 Okt 2024',
    author: 'drg. Andre Anggara',
    readTime: '4 min',
    image: '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_8.jpeg/screen.png',
  },
  {
    slug: 'manfaat-dental-implant',
    title: 'Manfaat Dental Implant untuk Kesehatan Gigi',
    excerpt: 'Mengenal dental implant sebagai solusi modern pengganti gigi yang hilang.',
    content: `<p>Dental implant adalah solusi permanen untuk menggant gigi yang hilang. Implant terbuat dari titanium yang ditanamkan ke dalam tulang rahang.</p>

<h2>Apa itu Dental Implant?</h2>
<p>Dental implant adalah akar gigi buatan yang terbuat dari titanium. Implant ini ditanamkan ke dalam tulang rahang dan berfungsi sebagai penyangga untuk gigi palsu atau mahkota gigi.</p>

<h2>Keunggulan Dental Implant</h2>
<ul>
<li><strong>Permanen:</strong> Tidak perlu dilepas seperti gigi palsu</li>
<li><strong>Natural:</strong> Tampilan dan fungsi seperti gigi asli</li>
<li><strong>Tahan Lama:</strong> Dengan perawatan baik, implant dapat bertahan seumur hidup</li>
<li><strong>Menjaga Tulang Rahang:</strong> Mencegah penurunan tulang rahang akibat kehilangan gigi</li>
</ul>

<h2>Proses Pemasangan</h2>
<p>Proses pemasangan implant melibatkan beberapa tahap: pemasangan implant ke tulang rahang, healing period, dan pemasangan mahkota gigi di atas implant. Seluruh proses memakan waktu beberapa bulan untuk hasil optimal.</p>

<p>Di SEA Dental Aesthetics, kami memiliki dokter implantologist berpengalaman yang siap membantu Anda mendapatkan senyum sempurna dengan dental implant.</p>`,
    category: 'Perawatan',
    date: '01 Okt 2024',
    author: 'drg. Andre Anggara',
    readTime: '5 min',
    image: '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_3.jpeg/screen.png',
  },
  {
    slug: 'pentingnya-pembersihan-karang-gigi',
    title: 'Pentingnya Pembersihan Karang Gigi secara Rutin',
    excerpt: 'Karang gigi dapat menyebabkan masalah kesehatan serius jika tidak dibersihkan.',
    content: `<p>Karang gigi atau dental calculus adalah endapan keras yang terbentuk dari plak gigi yang mengeras. Pembersihan karang gigi secara rutin sangat penting untuk kesehatan mulut.</p>

<h2>Bahaya Karang Gigi</h2>
<ul>
<li><strong>Radang Gusi:</strong> Karang gigi menjadi tempat bakteri berkembang biak</li>
<li><strong>Bau Mulut:</strong> Bakteri pada karang gigi menyebabkan bau mulut tidak sedap</li>
<li><strong>Gigi Berlubang:</strong> Karang gigi mempercepat proses pembusukan gigi</li>
<li><strong>Penyakit Gusi:</strong> Dalam jangka panjang dapat menyebabkan periodontitis</li>
</ul>

<h2>Kapan Harus Membersihkan Karang Gigi?</h2>
<p>Disarankan untuk membersihkan karang gigi setiap 6 bulan sekali. Namun, frekuensi ini dapat bervariasi tergantung kondisi kesehatan mulut masing-masing.</p>

<h2>Proses Pembersihan</h2>
<p>Pembersihan karang gigi dilakukan oleh dokter gigi menggunakan alat khusus. Proses ini biasanya cepat dan nyaman. Setelah pembersihan, gigi akan terasa lebih bersih dan segar.</p>

<p>Di SEA Dental Aesthetics, kami menyediakan layanan pembersihan karang gigi dengan teknologi modern dan dokter berpengalaman.</p>`,
    category: 'Kesehatan',
    date: '28 Sep 2024',
    author: 'drg. Citra Annesha Pratiwi',
    readTime: '3 min',
    image: '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_10.jpeg/screen.png',
  },
  {
    slug: 'orthodonti-modern-tanpa-kawat',
    title: 'Orthodonti Modern: Solusi Tanpa Kawat Gigi',
    excerpt: 'Mengenal aligner transparan sebagai alternatif modern kawat gigi tradisional.',
    content: `<p>Orthodonti modern menawarkan solusi alternatif selain kawat gigi tradisional. Aligner transparan menjadi pilihan populer bagi mereka yang ingin merapikan gigi tanpa terlihat memakai kawat.</p>

<h2>Apa itu Aligner Transparan?</h2>
<p>Aligner transparan adalah pelat gigi bening yang dapat dilepas-pasang. Aligner ini dirancang khusus untuk pergerakan gigi secara bertahap ke posisi yang diinginkan.</p>

<h2>Keunggulan Aligner</h2>
<ul>
<li><strong>Tidak Terlihat:</strong> Transparan sehingga tidak mengganggu penampilan</li>
<li><strong>Dapat Dilepas:</strong> Bisa dilepas saat makan atau menyikat gigi</li>
<li><strong>Nyaman:</strong> Tidak ada kawat yang mengganggu mulut</li>
<li><strong>Perawatan Lebih Mudah:</strong> Lebih mudah menjaga kebersihan mulut</li>
</ul>

<h2>Siapa yang Cocok?</h2>
<p>Aligner transparan cocok untuk kasus orthodonti ringan hingga sedang. Dokter gigi akan mengevaluasi kondisi Anda untuk menentukan apakah aligner adalah pilihan yang tepat.</p>

<p>Di SEA Dental Aesthetics, kami menyediakan layanan orthodonti dengan aligner transparan berkualitas tinggi.</p>`,
    category: 'Teknologi',
    date: '25 Sep 2024',
    author: 'drg. Andre Anggara',
    readTime: '4 min',
    image: '/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_12.jpeg/screen.png',
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug)
  if (!current) return articles.slice(0, limit)
  return articles
    .filter(a => a.slug !== slug && a.category === current.category)
    .slice(0, limit)
}
