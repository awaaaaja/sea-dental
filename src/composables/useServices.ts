import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export interface Service {
  id: string
  name: string
  slug: string
  icon: string
  short_description: string
  full_description: string
  hero_image: string
  content_image: string
  mid_image: string
  symptoms: Array<{ icon: string; title: string; description: string }>
  process_steps: Array<{ step: number; title: string; description: string }>
  benefits: Array<{ icon: string; title: string; description: string }>
  is_featured: boolean
  sort_order: number
  status: string
  category_id: string | null
  seo_title: string
  seo_description: string
}

export function useServices() {
  const services = ref<Service[]>([])
  const loading = ref(true)

  async function loadServices() {
    loading.value = true
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('status', 'published')
      .order('sort_order')
    services.value = data || []
    loading.value = false
  }

  async function getServiceBySlug(slug: string) {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single()
    return data as Service | null
  }

  return { services, loading, loadServices, getServiceBySlug }
}
