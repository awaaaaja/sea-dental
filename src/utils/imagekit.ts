// ImageKit URL builder for optimized images
// Endpoint: https://ik.imagekit.io/sea_dental

/**
 * Build an ImageKit URL with transformations
 * @param url - Original image URL or path
 * @param transformations - ImageKit transformation params
 */
export function ik(url: string, transformations?: string): string {
  if (!url) return ''
  // If it's already an ImageKit URL, just append transforms
  if (url.includes('ik.imagekit.io')) {
    return transformations ? `${url}?tr=${transformations}` : url
  }
  // For external URLs, use ImageKit's URL endpoint for transformation
  // Fallback: just return the URL with query params
  if (transformations) {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}tr=${transformations}`
  }
  return url
}

/**
 * Common transformations
 */
export const img = {
  /** Hero background: 1920px wide, auto format, quality 80 */
  hero: (url: string) => ik(url, 'w-1920,h-800,fo-auto,q-80'),
  /** Hero background mobile: 800px wide */
  heroMobile: (url: string) => ik(url, 'w-800,h-600,fo-auto,q-80'),
  /** Card image: 600px wide */
  card: (url: string) => ik(url, 'w-600,h-400,fo-auto,q-80'),
  /** Thumbnail: 200px */
  thumb: (url: string) => ik(url, 'w-200,h-200,fo-auto,q-80'),
  /** OG image: 1200x630 */
  og: (url: string) => ik(url, 'w-1200,h-630,fo-auto,q-80'),
}
