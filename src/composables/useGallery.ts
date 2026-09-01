import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export interface GalleryItem {
  id: string
  title: string
  image_url: string
  category: string | null
  description: string | null
  sort_order: number
  is_featured: boolean
  status: string
}

export function useGallery() {
  const items = ref<GalleryItem[]>([])
  const loading = ref(true)

  async function loadGallery() {
    loading.value = true
    const { data } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('status', 'published')
      .order('sort_order')
    items.value = data || []
    loading.value = false
  }

  return { items, loading, loadGallery }
}
