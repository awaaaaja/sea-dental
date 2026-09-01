export interface GalleryImage {
  id: number
  src: string
  alt: string
  category?: string
}

const imageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16]

export const galleryImages: GalleryImage[] = imageNumbers.map((n, i) => ({
  id: n,
  src: `/references/image_from_https_seadentalaesthetics.id_assets_img_gallery_galeri_${n}.jpeg/screen.png`,
  alt: `Galeri SEA Dental Aesthetics ${i + 1}`,
}))

export const galleryCategories = [
  { key: 'all', label: 'Semua' },
  { key: 'klinik', label: 'Klinik' },
  { key: 'perawatan', label: 'Perawatan' },
  { key: 'hasil', label: 'Hasil' },
]
