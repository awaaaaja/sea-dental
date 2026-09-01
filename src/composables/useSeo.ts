export interface SeoMeta {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  structuredData?: Record<string, any>
}

const SITE_NAME = 'SEA Dental Aesthetics'
const BASE_URL = 'https://seadentalaesthetics.id'
const DEFAULT_IMAGE = '/og-image.jpg'

function setMeta(tag: string, attr: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${tag}"]`) as HTMLMetaElement
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, tag)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setStructuredData(data: Record<string, any> | undefined) {
  const existing = document.querySelector('script[type="application/ld+json"]')
  if (existing) existing.remove()
  if (data) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }
}

export function useSeo(meta: SeoMeta) {
  const fullTitle = meta.title ? `${meta.title} | ${SITE_NAME}` : SITE_NAME
  const description = meta.description || 'SEA Dental Aesthetics - Klinik gigi estetik premium di Padang. Dental implants, smile design, dan perawatan gigi modern.'
  const image = meta.image?.startsWith('http') ? meta.image : `${BASE_URL}${meta.image || DEFAULT_IMAGE}`
  const url = meta.url ? `${BASE_URL}${meta.url}` : BASE_URL

  document.title = fullTitle
  setMeta('description', 'name', description)
  setMeta('og:title', 'property', fullTitle)
  setMeta('og:description', 'property', description)
  setMeta('og:image', 'property', image)
  setMeta('og:url', 'property', url)
  setMeta('og:type', 'property', meta.type || 'website')
  setMeta('og:site_name', 'property', SITE_NAME)
  setMeta('twitter:card', 'name', 'summary_large_image')
  setMeta('twitter:title', 'name', fullTitle)
  setMeta('twitter:description', 'name', description)
  setMeta('twitter:image', 'name', image)
  setStructuredData(meta.structuredData)
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'SEA Dental Aesthetics',
  image: `${BASE_URL}/og-image.jpg`,
  url: BASE_URL,
  telephone: '+6281366329279',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. DR. Sutomo No. 4, Simpang Haru',
    addressLocality: 'Padang',
    addressRegion: 'Sumatera Barat',
    postalCode: '25127',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -0.9471,
    longitude: 100.3626,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '10:00',
      closes: '20:00',
    },
  ],
  priceRange: '$$',
  sameAs: [
    'https://www.instagram.com/seadental',
  ],
}
