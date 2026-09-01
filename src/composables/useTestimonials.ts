import { ref } from 'vue'
import { supabase } from '@/utils/supabase'

export interface Testimonial {
  id: string
  patient_name: string
  content: string
  rating: number
  avatar_url: string | null
  status: string
}

export function useTestimonials() {
  const testimonials = ref<Testimonial[]>([])
  const loading = ref(true)

  async function loadTestimonials() {
    loading.value = true
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    testimonials.value = data || []
    loading.value = false
  }

  return { testimonials, loading, loadTestimonials }
}
