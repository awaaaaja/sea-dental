import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export interface Location {
  id: string
  name: string
  slug: string
  address: string
  phone: string
  whatsapp: string
  operating_hours: string
  google_maps_url: string
  latitude: number
  longitude: number
  description: string
  sort_order: number
  status: string
}

export function useLocations() {
  const locations = ref<Location[]>([])
  const loading = ref(true)

  async function loadLocations() {
    loading.value = true
    const { data } = await supabase
      .from('locations')
      .select('*')
      .eq('status', 'published')
      .order('sort_order')
    locations.value = data || []
    loading.value = false
  }

  return { locations, loading, loadLocations }
}
