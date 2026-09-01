export interface Location {
  name: string
  address: string
  phone: string
  whatsapp: string
  hours: string
  maps: string
  description: string
}

export const locations: Location[] = [
  {
    name: 'Simpang Haru',
    address: 'Jl. DR. Sutomo No. 4, Simpang Haru, Padang, Sumatera Barat',
    phone: '+6281366329279',
    whatsapp: 'https://api.whatsapp.com/send/?phone=6281266971089',
    hours: 'Senin-Sabtu 11.00-21.00 WIB',
    maps: 'https://goo.gl/maps/LkT48FJyr2uuESkP8',
    description: 'Klinik utama SEA Dental Aesthetics dengan fasilitas lengkap dan teknologi terbaru.',
  },
  {
    name: 'Baru',
    address: 'Jl. Khatib Sulaiman, Padang, Sumatera Barat',
    phone: '+6281366329279',
    whatsapp: 'https://api.whatsapp.com/send/?phone=6281266971089',
    hours: 'Senin-Minggu 10.00-20.00 WIB',
    maps: '#',
    description: 'Cabang kedua kami dengan akses mudah dan nyaman.',
  },
]
