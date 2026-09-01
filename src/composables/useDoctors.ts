import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export interface Doctor {
  id: string
  name: string
  slug: string
  photo_url: string
  content_image: string
  professional_title: string
  specialization: string
  bio: string
  instagram_url: string
  education: Array<{ degree: string; institution: string; year: string }>
  experience: Array<{ role: string; institution: string; period: string }>
  awards: Array<{ title: string; year: string }>
  is_featured: boolean
  sort_order: number
  status: string
  seo_title: string
  seo_description: string
}

export function useDoctors() {
  const doctors = ref<Doctor[]>([])
  const loading = ref(true)

  async function loadDoctors() {
    loading.value = true
    const { data } = await supabase
      .from('doctors')
      .select('*')
      .eq('status', 'published')
      .order('sort_order')
    doctors.value = data || []
    loading.value = false
  }

  async function getDoctorBySlug(slug: string) {
    const { data } = await supabase
      .from('doctors')
      .select('*')
      .eq('slug', slug)
      .single()
    return data as Doctor | null
  }

  return { doctors, loading, loadDoctors, getDoctorBySlug }
}
