import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export interface Promo {
  id: string
  title: string
  slug: string
  description: string
  short_description: string
  discount_text: string
  original_price: number
  promo_price: number
  image_url: string
  start_date: string
  end_date: string
  terms_conditions: string
  is_featured: boolean
  sort_order: number
  status: string
  seo_title: string
  seo_description: string
  created_at: string
}

export function usePromos() {
  const promos = ref<Promo[]>([])
  const loading = ref(true)

  async function loadPromos() {
    loading.value = true
    const { data } = await supabase
      .from('promos')
      .select('*')
      .eq('status', 'published')
      .order('sort_order')
    promos.value = data || []
    loading.value = false
  }

  return { promos, loading, loadPromos }
}
