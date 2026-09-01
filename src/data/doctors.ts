export interface Doctor {
  slug: string
  name: string
  title: string
  bio: string
  fullBio: string
  instagram: string
  igUrl: string
  photo: string
  specialties: string[]
}

export const doctors: Doctor[] = [
  {
    slug: 'drg-andre-anggara',
    name: 'drg. Andre Anggara',
    title: 'Aesthetic Dentist & Implantologist',
    bio: 'Kesehatan gigi dan mulut merupakan hal yang sangat penting. Oleh karena itu, menjaga dan merawat gigi sejak dini perlu dilakukan.',
    fullBio: 'drg. Andre Anggara adalah seorang dokter gigi estetik dan implantologist yang berpengalaman di SEA Dental Aesthetics. Beliau berkomitmen untuk memberikan pelayanan terbaik dalam bidang estetik kedokteran gigi, dengan fokus pada hasil perawatan yang natural dan presisi. Dengan keahlian dalam bidang implan gigi dan estetika, beliau membantu pasien mendapatkan senyum impian mereka.',
    instagram: '@dakumiss',
    igUrl: 'https://www.instagram.com/dakumiss/',
    photo: '/references/image_from_https_seadentalaesthetics.id_assets_img_doctors_andre_1.png/screen.png',
    specialties: ['Dental Implants', 'Aesthetic Dentistry', 'Crown & Bridge', 'Smile Design'],
  },
  {
    slug: 'drg-citra-annesha-pratiwi',
    name: 'drg. Citra Annesha Pratiwi',
    title: 'Dentist',
    bio: 'Dalam menghadapi berbagai permasalahan gigi dan mulut dibutuhkan pengalaman, keterampilan dan rasa ingin selalu belajar.',
    fullBio: 'drg. Citra Annesha Pratiwi adalah dokter gigi yang berdedikasi di SEA Dental Aesthetics. Beliau memiliki semangat tinggi dalam menangani berbagai permasalahan gigi dan mulut dengan pendekatan yang holistik dan berpusat pada pasien. Dengan terus mengasah keterampilan dan pengetahuan, beliau memberikan perawatan gigi yang berkualitas tinggi kepada setiap pasien.',
    instagram: '@chitraannesha',
    igUrl: 'https://www.instagram.com/chitraannesha/',
    photo: '/references/image_from_https_seadentalaesthetics.id_assets_img_doctors_citra_2.png/screen.png',
    specialties: ['General Dentistry', 'Conservative Dentistry', 'Periodontics', 'Preventive Care'],
  },
]

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find(d => d.slug === slug)
}
