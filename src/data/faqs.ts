export interface Faq {
  question: string
  answer: string
  category?: string
}

export const faqs: Faq[] = [
  {
    question: 'Bagaimana cara menjaga kebersihan gigi dan mulut?',
    answer: 'Menjaga kebersihan rongga mulut dapat dilakukan dengan: menyikat gigi 2x sehari, berkumur menggunakan obat kumur, rutin membersihkan karang gigi (6 bulan sekali), kontrol ke dokter gigi minimal 6 bulan sekali.',
    category: 'Perawatan',
  },
  {
    question: 'Kapan saja waktu yang tepat untuk menyikat gigi?',
    answer: 'Waktu yang dianjurkan untuk menyikat gigi ialah pada pagi hari setelah sarapan dan malam sebelum tidur.',
    category: 'Perawatan',
  },
  {
    question: 'Bagaimana cara menghindari bau mulut?',
    answer: 'Bau mulut dapat dihindari dengan: menyikat gigi 2 kali sehari, rutin mengganti sikat gigi maksimal 2 bulan sekali, berkumur menggunakan obat kumur, rutin membersihkan karang gigi, banyak mengkonsumsi air putih, mengkonsumsi makanan sehat, hindari merokok.',
    category: 'Kesehatan',
  },
  {
    question: 'Apakah menerima BPJS Kesehatan?',
    answer: 'Untuk saat ini, SEA Dental Aesthetics belum menerima BPJS Kesehatan. Namun, kami menyediakan berbagai metode pembayaran yang fleksibel untuk kenyamanan pasien.',
    category: 'Umum',
  },
  {
    question: 'Bagaimana cara membuat janji temu?',
    answer: 'Anda dapat membuat janji temu melalui website kami di menu Reservasi, atau langsung menghubungi kami via WhatsApp di +62 812-6697-1089. Tim kami akan membantu menjadwalkan waktu yang tepat untuk Anda.',
    category: 'Umum',
  },
  {
    question: 'Apakah perawatan gigi di sini sakit?',
    answer: 'Dokter dan tim kami akan memastikan Anda merasa nyaman selama perawatan. Kami menggunakan teknik anestesi modern dan peralatan terbaru untuk meminimalkan rasa tidak nyaman.',
    category: 'Perawatan',
  },
  {
    question: 'Berapa lama proses pemasangan behel gigi?',
    answer: 'Durasi pemasangan behel gigi bervariasi tergantung kondisi gigi masing-masing pasien. Rata-rata memakan waktu 1-2 tahun untuk hasil optimal. Dokter akan memberikan estimasi yang lebih akurat setelah konsultasi awal.',
    category: 'Perawatan',
  },
  {
    question: 'Apakah bisa konsultasi secara online?',
    answer: 'Ya, kami menyediakan konsultasi online melalui WhatsApp atau video call. Namun, untuk diagnosis yang akurat dan treatment, kami sarankan untuk datang langsung ke klinik.',
    category: 'Umum',
  },
]
