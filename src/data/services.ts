export interface Service {
  slug: string
  name: string
  icon: string
  shortDesc: string
  fullDesc: string
  benefits: string[]
  treatments: string[]
}

export const services: Service[] = [
  {
    slug: 'konservasi',
    name: 'Konservasi',
    icon: 'healing',
    shortDesc: 'Spesialisasi ilmu kedokteran gigi yang berfokus pada tindakan mempertahankan dan menjaga gigi baik secara fungsi maupun estetika.',
    fullDesc: 'Konservasi gigi adalah cabang kedokteran gigi yang berfokus pada pemeliharaan dan perawatan struktur gigi yang rusak atau terkena penyakit. Tujuannya adalah mempertahankan gigi asli sebanyak mungkin, baik secara fungsi maupun estetika, menggunakan teknik dan bahan tambalan modern.',
    benefits: [
      'Mempertahankan gigi asli lebih lama',
      'Hasil estetika menyerupai gigi asli',
      'Menggunakan bahan tambalan modern dan berkualitas',
      'Prosedur minim invasif',
      'Biaya lebih terjangkau dibanding pencabutan',
    ],
    treatments: [
      'Tambalan gigi estetik (composite resin)',
      'Root canal treatment (perawatan saluran akar)',
      'Overlay dan onlay gigi',
      'Veneer gigi (laminate)',
      'Bleaching / pemutihan gigi',
    ],
  },
  {
    slug: 'prosthodonti',
    name: 'Prosthodonti',
    icon: 'dentistry',
    shortDesc: 'Spesialisasi ilmu kedokteran gigi yang berfokus pada penggantian gigi yang hilang atau patah.',
    fullDesc: 'Prosthodonti adalah cabang kedokteran gigi yang khusus menangani pemulihan bentuk, fungsi, estetika, dan kenyamanan mulut serta gigi yang hilang atau rusak melalui pemasangan gigi tiruan.',
    benefits: [
      'Mengembalikan fungsi mengunyah',
      'Memperbaiki penampilan senyum',
      'Mencegah pergeseran gigi tetangga',
      'Mendukung kesehatan mulut jangka panjang',
      'Beragam pilihan sesuai kebutuhan',
    ],
    treatments: [
      'Gigi tiruan lepasan (partial & complete denture)',
      'Jembatan gigi (fixed bridge)',
      'Crown gigi (mahkota gigi)',
      'Implan gigi (titanium implant)',
      'Overdenture (gigi tiruan pada implan)',
    ],
  },
  {
    slug: 'orthodonti',
    name: 'Orthodonti',
    icon: 'straighten',
    shortDesc: 'Spesialisasi ilmu kedokteran gigi yang berfokus pada perawatan susunan gigi dalam lengkung rahang.',
    fullDesc: 'Orthodonti adalah cabang kedokteran gigi yang bergerak dan merapikan susunan gigi dalam lengkung rahang dengan tujuan memperbaiki penampilan dan fungsi gigi. Perawatan ini membantu mengatasi masalah seperti gigi berjejal, gingsul, dan masalah oklusi lainnya.',
    benefits: [
      'Memperbaiki susunan gigi yang tidak rapi',
      'Meningkatkan kepercayaan diri',
      'Memperbaiki fungsi kunyah dan bicara',
      'Mencegah masalah TMJ (sendi rahang)',
      'Hasil jangka panjang yang stabil',
    ],
    treatments: [
      'Kawat gigi metal (behel konvensional)',
      'Kawat gigi keramik (behel transparan)',
      'Invisalign (aligner transparan)',
      'Retainer (pasca perawatan)',
      'Headgear & alat bantu ortodonti',
    ],
  },
  {
    slug: 'periodonti',
    name: 'Periodonti',
    icon: 'healing',
    shortDesc: 'Spesialisasi ilmu kedokteran gigi yang berfokus pada perawatan jaringan pendukung gigi.',
    fullDesc: 'Periodonti adalah cabang kedokteran gigi yang berfokus pada diagnosis, pencegahan, dan perawatan penyakit jaringan periodonsial — jaringan yang mendukung dan menahan gigi, termasuk gusi, tulang rahang, dan ligamen periodontal.',
    benefits: [
      'Mencegah kehilangan gigi akibat penyakit gusi',
      'Menjaga kesehatan gusi jangka panjang',
      'Menghilangkan plak dan karang gigi',
      'Mengatasi bau mulut',
      'Mencegah peradangan gusi kronis',
    ],
    treatments: [
      'Scaling dan root planing (deep cleaning)',
      'Perawatan penyakit gusi (gingivitis & periodontitis)',
      'Pembersihan karang gigi profesional',
      'Perawatan pasca implan gigi',
      'Surgery periodontal (bedah gusi)',
    ],
  },
  {
    slug: 'paedodonti',
    name: 'Paedodonti',
    icon: 'child_care',
    shortDesc: 'Spesialisasi ilmu kedokteran gigi yang berfokus pada tindakan perawatan gigi dan mulut anak.',
    fullDesc: 'Paedodonti (kedokteran gigi anak) adalah cabang kedokteran gigi yang berfokus pada perawatan gigi dan mulut pada anak-anak dari bayi hingga remaja. Perawatan ini dirancang untuk menjaga kesehatan gigi susu dan gigi permanen anak.',
    benefits: [
      'Mencegah kerusakan gigi sejak dini',
      'Membiasakan anak rutin ke dokter gigi',
      'Menjaga kesehatan gigi susu hingga gigi permanen tumbuh',
      'Edukasi pola makan sehat untuk anak',
      'Mencegah trauma gigi pada anak',
    ],
    treatments: [
      'Perawatan gigi susu anak',
      'Penambalan gigi susu',
      'Fluoride treatment untuk anak',
      'Sealant gigi (pelindung gigi permanen)',
      'Perawatan trauma gigi anak',
    ],
  },
  {
    slug: 'oral-surgery',
    name: 'Oral Surgery',
    icon: 'content_cut',
    shortDesc: 'Spesialisasi ilmu kedokteran gigi yang berfokus pada tindakan bedah untuk memperbaiki kondisi kesehatan gigi dan mulut.',
    fullDesc: 'Oral Surgery (bedah mulut) adalah cabang kedokteran gigi yang berfokus pada tindakan bedah untuk memperbaiki, memulihkan, atau mengobati kondisi kesehatan gigi dan mulut yang memerlukan intervensi bedah, termasuk pencabutan gigi, pemasangan implan, dan koreksi rahang.',
    benefits: [
      'Menyelesaikan masalah gigi yang kompleks',
      'Pencabutan gigi dengan minimal rasa sakit',
      'Pemasangan implan untuk gigi permanen',
      'Koreksi masalah rahang',
      'Prosedur bedah aman dan modern',
    ],
    treatments: [
      'Pencabutan gigi (termasuk impaksi)',
      'Pemasangan implan gigi',
      'Bedah kista dan tumor mulut',
      'Koreksi rahang (orthognathic surgery)',
      'Frenectomy (bedah lipatan mulut)',
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug)
}
